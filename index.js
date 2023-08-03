const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Configure OpenAI API
const openaiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(openaiConfig);

app.use(cors()); // Enable CORS
app.use(express.json());

// Store conversation history
const history = [];

// API endpoint to generate content
app.post("/generate", async (req, res) => {
  try {
    const { userMessage } = req.body;

    const messages = [];
    for (const [input_text, completion_text] of history) {
      messages.push({ role: "user", content: input_text });
      messages.push({ role: "assistant", content: completion_text });
    }
    messages.push({ role: "user", content: userMessage });

    // Make an API call to generate content using the OpenAI API
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    const assistantResponse = completion.data.choices[0].message.content;

    history.push([userMessage, assistantResponse]);

    res.json({ assistantResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while generating assistant response." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
