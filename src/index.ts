import TelegramBot from "node-telegram-bot-api";
import OpenAI from "openai";
import { PROMPT_BOT_CONTEXT, PROMPT_FULL_PROMPT, PROMPT_GREETING, PROMPT_NOT_UNDERSTAND, PROMPT_OUT_CONTEXT, TASK_CLASSIFICATION } from "./global/prompt";
import { ITaskClassifier } from "./global/type";
import { ChatCompletionBasic } from "./utils/ai";

require('dotenv').config();
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
export const openai = new OpenAI({
    apiKey: process.env.OPENAI_TOKEN
})


bot.on('message', async (msg) => {
    // const sender = msg.chat.first_name || "Anonymous";
    bot.sendChatAction(msg.chat.id, "typing")
    const taskClassifier = await ChatCompletionBasic(TASK_CLASSIFICATION, msg.text)
    const classifier: ITaskClassifier = JSON.parse(taskClassifier.choices[0].message.content) satisfies ITaskClassifier;
    console.log({ input: msg.text, classifier: classifier.classification })

    let finalChatCompletion: OpenAI.Chat.Completions.ChatCompletion;
    let finalResponse: string;

    switch (classifier.classification) {
        case 'greeting':
            finalChatCompletion = await ChatCompletionBasic(PROMPT_GREETING, msg.text)
            finalResponse = finalChatCompletion.choices[0].message.content;
            break;
        case 'ask_resume_info':
            finalChatCompletion = await ChatCompletionBasic(PROMPT_FULL_PROMPT, msg.text)
            finalResponse = finalChatCompletion.choices[0].message.content;
            break;
        case 'asking_out_of_context':
            finalChatCompletion = await ChatCompletionBasic(PROMPT_OUT_CONTEXT, msg.text)
            finalResponse = finalChatCompletion.choices[0].message.content;
            break;
        case 'asking_about_bot_context':
            finalChatCompletion = await ChatCompletionBasic(PROMPT_BOT_CONTEXT, msg.text)
            finalResponse = finalChatCompletion.choices[0].message.content;
            break;
        case 'unknown_queries':
            finalChatCompletion = await ChatCompletionBasic(PROMPT_NOT_UNDERSTAND, msg.text)
            finalResponse = finalChatCompletion.choices[0].message.content;
            break;
        default:
            finalResponse = "Sorry I'm unable to process your request right now."
            break;
    }

    // console.log({ msg: msg.text, chatComp, choices: chatComp.choices[0] })
    console.log({ usage: finalChatCompletion.usage, response: finalResponse })

    bot.sendMessage(msg.chat.id, finalResponse)
})

console.log("Project is running");