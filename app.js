require("dotenv").config();
const express = require("express");
const { Telegraf } = require("telegraf");

const BOT_TOKEN = process.env.BOT_TOKEN;
const PORT = process.env.PORT || 3000;

const app = express();

// Initialize Telegraf bot
const bot = new Telegraf(BOT_TOKEN);

// List to store received messages
const receivedMessages = [];

// Middleware to use Telegraf with Express
app.use(bot.webhookCallback("/bot"));

// Bot command handlers
bot.start((ctx) => ctx.reply("Howdy, how are you doing?"));
bot.help((ctx) => ctx.reply("I'm a simple echo bot."));

// Bot message handler
bot.on("message", (ctx) => {
  receivedMessages.push(ctx.message.text);
  console.log(
    "Message Received-------->",
    receivedMessages[receivedMessages.length - 1]
  );
});

// Launch the bot
bot.launch();

// Express route to serve HTML file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// API route to send received messages
app.get("/messages", (req, res) => {
  res.json(receivedMessages);
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Express server is listening on port http://localhost:${PORT}`);
});
