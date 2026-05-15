const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: `
You are an expert AI code reviewer.

1. If code is correct:
✅ Good Code: No major issues detected.

2. If code has issues:
❌ Bad Code: Explain the issue clearly.

3. Suggest fixes and improvements.
4. Support multiple programming languages.
`
});

async function generateContent(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}

module.exports = generateContent;