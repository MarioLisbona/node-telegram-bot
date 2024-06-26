# Telegram Bot Chat

## Setup instructions

### Create a local clone of this repo

```bash
git clone git@github.com:MarioLisbona/node-telegram-bot.git
```

### Create environment variables

1. cd into the directory

```bash
cd node-telegram-bot
```

2. Change the filename `.env.sample` to `.env`

### Create a new Telegram Bot

1. **Open Telegram:** Open the Telegram app on your device or use the web version.
2. **Search for BotFather:** In the search bar, type "BotFather" and select the BotFather account from the search results. BotFather is the official bot provided by Telegram for creating and managing bots.
3. **Start BotFather:** Start a chat with BotFather by clicking on the "Start" button.
4. **Create a New Bot:** Once you're in the chat with BotFather, type the following command to create a new bot:

```bash
/newbot
```

5. **Choose a Name:** BotFather will ask you to choose a name for your bot. This name will be displayed in Telegram chats and contact lists.
6. **Choose a Username:** Next, BotFather will ask you to choose a username for your bot. This username must be unique and end with "bot" (e.g., MyNewBot_bot).
7. **Bot Creation:** After providing a name and username, BotFather will confirm the details you've entered and provide you with a token for your new bot. This token is necessary for authenticating requests to the Telegram Bot API.
8. **Save the Token:** Copy the token and use its value for the `.env` key-pair `BOT_TOKEN`

### Create a new Telegram chat and add the Bot

1. Create a new telegram chat and add the bot username
2. Open the chat and click the 3 dots in the top right corner and select `info`
3. Find the bot in the members list and click it
4. Click `Add to Group or Channel` and select the chat you want to use
5. Add the bot as Administrator

### Install dependencies

- Run the following command to install the dependencies

```bash
npm install
```

### Run the App

- Run the following command to start the server

```bash
npm start
```

The front end will load at [http://localhost:3000](http://localhost:3000)

### Obtain the chat ID

- This has to be done manually at the moment...trying to make this work programatically...
- send a message from group chat in the telegram app
- It will appear in the console along with a returnen object.
- You can now comment out `bot.use(Telegraf.log());` in `app.js`. The logging is no longer needed.
- The chat ID will be in the attribute `chat.id` save this to the `CHAT_ID` key-pair in the `.env` file
- restart the server

```bash
ctl + c
npm start
```

You should now be able to send chat messages from the desktop app, mobile app and front end chat box
