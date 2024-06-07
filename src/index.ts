import TelegramBot from "node-telegram-bot-api";
import OpenAI from "openai";
import { PROMPT_BOT_CONTEXT, PROMPT_RESUME, PROMPT_GREETING, PROMPT_NOT_UNDERSTAND, PROMPT_OUT_CONTEXT, TASK_CLASSIFICATION, BotTaskClassification, PROMPT_ASKING_LANGUAGE, PROPMT_ASKING_ROMANCE } from "./global/prompt";
import { ITaskClassifier } from "./global/type";
import { ChatCompletionBasic } from "./utils/ai";
import { BotException, BotStaticResponse, getBotGreeting, getBotStaticResponse } from "./global/static-response";
import express from "express"

require('dotenv').config();
const app = express()

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
export const openai = new OpenAI({
    apiKey: process.env.OPENAI_TOKEN
})

bot.on('message', async (msg) => {
    bot.sendChatAction(msg.chat.id, "typing")
    if (msg.text == undefined) {
        bot.sendMessage(msg.chat.id, getBotStaticResponse(BotException.NoTextException))
        return;
    }
    try {
        const username = msg.chat.first_name + " " + msg.chat.last_name
        const taskClassifier = await ChatCompletionBasic(TASK_CLASSIFICATION, msg.text)
        const classifier: ITaskClassifier = JSON.parse(taskClassifier.choices[0].message.content) satisfies ITaskClassifier;
        console.log({ username, input: msg.text, classifier: classifier.classification })

        let finalChatCompletion: OpenAI.Chat.Completions.ChatCompletion;
        let finalResponse: string;
        bot.sendChatAction(msg.chat.id, "typing")
        switch (classifier.classification) {
            case BotTaskClassification.GREETING:
                // finalChatCompletion = await ChatCompletionBasic(PROMPT_GREETING, msg.text)
                // finalResponse = finalChatCompletion.choices[0].message.content;
                finalResponse = getBotGreeting();
                break;
            case BotTaskClassification.ASK_RESUME:
                finalChatCompletion = await ChatCompletionBasic(PROMPT_RESUME, msg.text)
                finalResponse = finalChatCompletion.choices[0].message.content;
                break;
            case BotTaskClassification.OUT_OF_CONTEXT:
                finalChatCompletion = await ChatCompletionBasic(PROMPT_OUT_CONTEXT, msg.text)
                finalResponse = finalChatCompletion.choices[0].message.content;
                break;
            case BotTaskClassification.BOT_CONTEXT:
                finalChatCompletion = await ChatCompletionBasic(PROMPT_BOT_CONTEXT, msg.text)
                finalResponse = finalChatCompletion.choices[0].message.content;
                break;
            case BotTaskClassification.ASK_LANGUAGE:
                finalChatCompletion = await ChatCompletionBasic(PROMPT_ASKING_LANGUAGE, msg.text)
                finalResponse = finalChatCompletion.choices[0].message.content;
                break;
            case BotTaskClassification.ASK_ROMANCE:
                finalChatCompletion = await ChatCompletionBasic(PROPMT_ASKING_ROMANCE, msg.text)
                finalResponse = finalChatCompletion.choices[0].message.content;
                break;
            case BotTaskClassification.UNKNOWN_QUERIES:
                finalChatCompletion = await ChatCompletionBasic(PROMPT_NOT_UNDERSTAND, msg.text)
                finalResponse = finalChatCompletion.choices[0].message.content;
                break;
            default:
                finalResponse = getBotStaticResponse(BotException.InternalTrouble);
                break;
        }

        // console.log({ usage: finalChatCompletion.usage || null, response: finalResponse })
        console.log({ response: finalResponse });
        bot.sendMessage(msg.chat.id, finalResponse);
    } catch (error) {
        console.error(error);
        bot.sendMessage(msg.chat.id, getBotStaticResponse(BotException.CatchException))
    }

})

app.get('/', (req, res) => {
    res.send("Hello Rika!")
})

app.listen(+process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})
