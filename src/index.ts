import TelegramBot from "node-telegram-bot-api";
import OpenAI from "openai";
import { DEV_RESUME, RESUME_EXPLAIN, SYSTEM_MAIN_TASK } from "./global/prompt";

require('dotenv').config();
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
const openai = new OpenAI({
    apiKey: process.env.OPENAI_TOKEN
})


bot.on('message', async (msg) => {
    // const sender = msg.chat.first_name || "Anonymous";
    bot.sendChatAction(msg.chat.id, "typing")
    const chatComp = await openai.chat.completions.create({
        messages: [{ role: 'system', content: `${RESUME_EXPLAIN}` }, { role: 'user', content: msg.text }],
        model: 'gpt-3.5-turbo',
        temperature: 0.1
    });
    console.log({ msg: msg.text, chatComp, choices: chatComp.choices[0] })
    bot.sendMessage(msg.chat.id, chatComp.choices[0].message.content)
})

console.log("Project is running");