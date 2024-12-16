require("dotenv").config(); // 환경변수 로드 (process.env)

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

// Middleware 설정
app.use(cors());
app.use(bodyParser.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error("Error: OpenAI 키 값이 필요합니다.");
  process.exit(1);
}

// OpenAI API 요청
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "요청에 메시지가 없습니다." });
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const gptMessage = response.data.choices[0].message.content;
    res.json({ message: gptMessage });
  } catch (error) {
    console.error("openAI API Error:", error);
    res.status(500).json({ error: "Failed to fetch response from OpenAI" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT} 서버가 실행중입니다.`);
});

module.exports = app;