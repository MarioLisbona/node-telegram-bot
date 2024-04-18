require("dotenv").config();
const express = require("express");
const { Telegraf } = require("telegraf");

const BOT_TOKEN = process.env.BOT_TOKEN;
const PORT = process.env.PORT || 3000;

const app = express();

// Initialize Telegraf bot with long polling
const bot = new Telegraf(BOT_TOKEN, {
  telegram: {
    webhookReply: false,
  },
});

// bot.use(Telegraf.log());

// List to store received messages
const receivedMessages = [];

// Bot command handlers
bot.start((ctx) => ctx.reply("Hello, Welcome to the chat-bot test group!"));
bot.help((ctx) => ctx.reply("I'm a simple echo bot."));

// Bot message handler
// Listen for any text message using a regular expression matching anything
bot.hears(/.*/, (ctx) => {
  receivedMessages.push(ctx.message.text);
  console.log(
    "Message Received-------->",
    receivedMessages[receivedMessages.length - 1]
  );
});

// Start the bot with long polling
bot.launch({
  polling: {
    timeout: 3000, // Adjust polling timeout as needed
  },
});

// Express route to serve HTML file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// API route to send received messages
app.get("/api/messages", (req, res) => {
  res.json(receivedMessages);
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Express server is listening on port http://localhost:${PORT}`);
});
