const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  try {
    const code = req.body.code;

    if (!code) {
      return res.status(400).send("Prompt is required");
    }

    const response = await aiService(code);
    res.status(200).send(response);

  } catch (error) {
    console.error("AI ERROR:", error.message);
    res.status(500).send("AI review failed: " + error.message);
  }
};