import { ChatCompletion } from "openai/resources";
import { PROMPT_GREETING } from "../global/prompt";
import { openai } from "../index";


export const ChatCompletionBasic = async (systemPrompt: string, userQueries: string): Promise<ChatCompletion> => {
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userQueries }],
            model: 'gpt-3.5-turbo',
            max_tokens: 650,
            temperature: 0.1
        });
        console.log({ response: completion.choices[0].message.content, usage: completion.usage })
        return completion
    } catch (error) {
        console.error(error)
        Promise.reject(error)
    }
}