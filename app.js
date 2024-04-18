require("dotenv").config();
const express = require("express");
const { Telegraf } = require("telegraf");
const bodyParser = require("body-parser");

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

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
    "Message Received from Telegram-------->",
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

// Route to handle messages sent from the client
app.post("/api/messages-sent", (req, res) => {
  const message = req.body.message;
  receivedMessages.push(message);

  // Send the message to Telegram chat
  bot.telegram.sendMessage(CHAT_ID, message); // Replace YOUR_CHAT_ID with the chat ID you want to send the message to

  // Here you can process the message as needed, e.g., save it to a database
  console.log('"Message Received from Front end-------->"', message);
  res.sendStatus(200); // Send a success response
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Express server is listening on port http://localhost:${PORT}`);
});
