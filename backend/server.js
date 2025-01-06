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

app.post("/api/notion", async (req, res) => {
  const {
    pageId,
    limit = 100,
    chunkNumber = 0,
    cursor = { stack: [] },
  } = req.body;

  if (!pageId) {
    return res.status(400).json({ error: "pageId는 필수입니다." });
  }

  try {
    const response = await axios.post(
      "https://www.notion.so/api/v3/loadPageChunk",
      {
        pageId,
        limit,
        chunkNumber,
        cursor,
        verticalColumns: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Notion API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch data from Notion API" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT} 서버가 실행중입니다.`);
});

module.exports = app;
