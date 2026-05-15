const { GoogleGenerativeAI } = require("@google/generative-ai");

if (!process.env.GOOGLE_GEMINI_KEY) {
  throw new Error("GOOGLE_GEMINI_KEY is missing");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `
You are an expert code reviewer.

Review the code for:
- syntax issues
- logical errors
- best practices
- readability

If code is correct:
✅ Good Code: No major issues detected.

If code has issues:
❌ Bad Code: mention error type and fix briefly.
`

async function generateContent(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}

module.exports = generateContent;