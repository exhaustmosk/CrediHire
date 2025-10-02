// backend/server.js
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs-extra";
import fetch from "node-fetch";
import path from "path";
import PDFDocument from "pdfkit";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

// ✅ Ensure __dirname works in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load .env from backend folder explicitly
dotenv.config({ path: path.resolve(__dirname, ".env") });

console.log("DEBUG PORT:", process.env.PORT);

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "1mb" }));

// Ensure resumes directory exists
const RESUMES_DIR = path.join(process.cwd(), "resumes");
fs.ensureDirSync(RESUMES_DIR);

// ----------------- Helper: Call Ollama (local mistral) -----------------
async function callOllamaCompose(form) {
  const prompt = `
You are an expert resume writer. Given the user's raw form data, transform it into a professional resume JSON with these keys:
{
  "name": string,
  "contact": string,
  "summary": string,
  "education": [ { "degree": string, "institution": string, "dates": string } ],
  "experience": [ { "title": string, "company": string, "dates": string, "bullets": [string] } ],
  "skills": [string],
  "achievements": [string]
}

Expand and improve the language using strong action verbs. 
Keep bullets concise and professional. 
If a field is missing, create a placeholder. 
Return ONLY valid JSON, nothing else.
And make it as long as possible and a format that is ATS friendly.

User input:
${JSON.stringify(form, null, 2)}
`;

  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "mistral",   // 👈 ensure this matches your installed Ollama model
      prompt,
      stream: false       // 👈 force single JSON output
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error("Ollama error: " + txt);
  }

  const data = await res.json();
  const reply = data?.response?.trim();
  if (!reply) throw new Error("Empty reply from Ollama");

  // Remove code fences if any
  const cleaned = reply.replace(/^```(?:json)?\n?/, "").replace(/```$/, "");

  try {
    return JSON.parse(cleaned);
  } catch (e) {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error("Ollama did not return parseable JSON:\n" + cleaned);
  }
}

// ----------------- Helper: Generate PDF -----------------
async function makePdfFromResume(resumeJson) {
  const id = uuidv4();
  const filename = `${id}.pdf`;
  const filepath = path.join(RESUMES_DIR, filename);

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const stream = fs.createWriteStream(filepath);
    doc.pipe(stream);

    // --- Basic PDF layout ---
    doc.fontSize(20).font("Helvetica-Bold").text(resumeJson.name || "Name");
    doc.moveDown();
    doc.fontSize(10).text(resumeJson.contact || "");
    doc.moveDown();

    if (resumeJson.summary) {
      doc.fontSize(12).font("Helvetica-Bold").text("Summary");
      doc.fontSize(10).font("Helvetica").text(resumeJson.summary);
      doc.moveDown();
    }

    if (Array.isArray(resumeJson.experience)) {
      doc.fontSize(12).font("Helvetica-Bold").text("Experience");
      resumeJson.experience.forEach((exp) => {
        doc.fontSize(10).font("Helvetica-Bold").text(`${exp.title} - ${exp.company}`);
        if (Array.isArray(exp.bullets)) {
          exp.bullets.forEach((b) => doc.text("• " + b, { indent: 10 }));
        }
        doc.moveDown();
      });
    }

    if (Array.isArray(resumeJson.education)) {
      doc.fontSize(12).font("Helvetica-Bold").text("Education");
      resumeJson.education.forEach((ed) =>
        doc.fontSize(10).text(`${ed.degree}, ${ed.institution} (${ed.dates})`)
      );
      doc.moveDown();
    }

    if (Array.isArray(resumeJson.skills)) {
      doc.fontSize(12).font("Helvetica-Bold").text("Skills");
      doc.fontSize(10).text(resumeJson.skills.join(", "));
      doc.moveDown();
    }

    if (Array.isArray(resumeJson.achievements)) {
      doc.fontSize(12).font("Helvetica-Bold").text("Achievements");
      resumeJson.achievements.forEach((a) => doc.text("• " + a));
      doc.moveDown();
    }

    doc.end();
    stream.on("finish", () => resolve({ filepath, filename }));
    stream.on("error", reject);
  });
}

// ----------------- API Endpoint -----------------
app.post("/api/generate-resume", async (req, res) => {
  try {
    const form = req.body;
    if (!form) return res.status(400).json({ error: "No form data" });

    console.log("🔹 Using Ollama (mistral) for resume generation...");
    const resumeJson = await callOllamaCompose(form);

    const { filename } = await makePdfFromResume(resumeJson);

    const host = req.get("host");
    const protocol = req.protocol;
    const pdfUrl = `${protocol}://${host}/resumes/${filename}`;

    return res.json({ pdfUrl, resumeJson });
  } catch (err) {
    console.error("❌ Error generating resume:", err);
    return res.status(500).json({ error: String(err) });
  }
});

// Serve resumes statically
app.use("/resumes", express.static(RESUMES_DIR));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Resume API running at http://localhost:${PORT}`);
});
