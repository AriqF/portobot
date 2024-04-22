

export enum BotStaticResponse {
    StickerException = "I Sorry, For now I still unable to response your stickers as it is outside the context of the information available in Ariq's resume. Is there anything else I can assist you with regarding Ariq's professional background and achievements?",
    CatchException = "I Apologize, I'm unable to process your request right now. Please do reach me out again soon",
    NoTextException = "I apologize, but as a text-based AI assistant, I am unable to process your request. However, I am here to assist you with any questions you may have about Ariq's resume. Please feel free to ask me anything!",
    InternalTrouble = "I'm sorry, I just having an internal trouble. Can you repeat again?"
}

export enum BotException {
    StickerException = "StickerException",
    CatchException = "CatchException",
    NoTextException = "NoTextException",
    InternalTrouble = "InternalTrouble",
}

export const getBotStaticResponse = (e: BotException) => {
    const responses = BotStaticResponseList.find((res) => res.exception === e).responses;
    const rnd: number = Math.floor(Math.random() * responses.length)
    return responses[rnd]
}

export const getBotGreeting = () => {
    const rnd: number = Math.floor(Math.random() * BotGreetings.length)
    return BotGreetings[rnd]
}


const BotStaticResponseList = [
    {
        exception: BotException.StickerException,
        responses: [
            "I'm sorry, but I can't respond to stickers at the moment. My focus is on providing information about Ariq's professional background and achievements. Is there something else I can assist you with?",
            "For now, I'm unable to respond to stickers as they're outside the context of Ariq's resume. Can I help you with any other questions related to his professional experience?",
            "I'm currently unable to process stickers. If you have any questions about Ariq's professional background or achievements, feel free to ask!",
            "Stickers are outside the scope of what I can respond to about Ariq's resume. Is there something else you'd like to know?",
            "Unfortunately, I can't respond to stickers right now. I'm here to provide information about Ariq's professional qualifications. How can I assist you further?",
            "I'm unable to process stickers at this time, as my focus is on providing information about Ariq's professional background. Do you have any other questions I can help with?"
        ]
    },
    {
        exception: BotException.CatchException,
        responses: [
            "I apologize for the inconvenience. It seems I'm unable to process your request right now. Please try reaching out to me again soon.",
            "I'm sorry, there seems to be an issue with processing your request. Could you please try again later?",
            "Apologies, I'm currently unable to process your request. Please try again later or reach out to me with a different request.",
            "It seems I'm facing a temporary issue and can't process your request. Please try again in a while.",
            "I'm experiencing difficulties processing your request at the moment. Please try again later.",
            "I'm sorry for the inconvenience. It looks like I'm unable to process your request right now. Could you please try again later?"
        ]
    },
    {
        exception: BotException.NoTextException,
        responses: [
            "I'm sorry, as a text-based AI assistant, I can't process non-text requests. However, I'm here to help you with any questions you have about Ariq's resume. Feel free to ask me anything!",
            "Unfortunately, I can't process non-text requests. How can I assist you with information about Ariq's professional background?",
            "As a text-based assistant, I can't process non-text requests. Feel free to ask me anything about Ariq's resume!",
            "I'm unable to process non-text requests. Please let me know if you have any questions about Ariq's professional experience.",
            "I can't process non-text requests. If you need information about Ariq's resume, feel free to ask me!",
            "Non-text requests are outside my capabilities. How can I assist you with information about Ariq's professional background?"
        ]
    },
    {
        exception: BotException.InternalTrouble,
        responses: [
            "I apologize for the inconvenience. It seems I'm experiencing internal issues. Could you please repeat your request?",
            "I'm sorry, I seem to be experiencing internal trouble. Could you please try again in a moment?",
            "Apologies, it looks like I'm experiencing internal issues. Can you please repeat your request?",
            "I'm having internal trouble at the moment. Could you please try your request again shortly?",
            "I apologize for the inconvenience. It appears there's an internal issue. Can you please try your request again?",
            "I'm currently facing internal issues. Could you please try your request again later?"
        ]
    }
];

const BotGreetings = [
    "Hello! I'm Rika, Ariq's AI Personal assistant. My goal is to help you get to know Ariq's resume better. While Ariq continues to improve me for the best experience, I can currently respond to one question at a time. Feel free to ask about work experiences, skills, projects, summary, or any other resume-related data.",
    "Greetings! I'm Rika, Ariq's AI assistant. My purpose is to assist you in understanding Ariq's resume. While Ariq is still refining my capabilities, I can currently respond to one inquiry at a time. You can ask about work experiences, skills, projects, summary, or any other resume-related information.",
    "Hi there! I'm Rika, Ariq's AI assistant. My aim is to help you navigate Ariq's resume. While Ariq is working on enhancing my abilities, I can currently handle one question at a time. Feel free to ask about work experiences, skills, projects, summary, or any other resume-related details.",
    "Welcome! I'm Rika, Ariq's AI assistant. My role is to assist you in exploring Ariq's resume. While Ariq continues to improve my capabilities, I can currently address one query at a time. You can inquire about work experiences, skills, projects, summary, or any other resume-related information.",
    "Good day! I'm Rika, Ariq's AI assistant. I'm here to help you understand Ariq's resume. While Ariq is still enhancing my features, I can currently respond to one question at a time. Please feel free to ask about work experiences, skills, projects, summary, or any other resume-related topics.",
    "Greetings! I'm Rika, Ariq's AI assistant. My objective is to assist you in discovering Ariq's resume. While Ariq is working on improving my capabilities, I can currently handle one inquiry at a time. You can ask about work experiences, skills, projects, summary, or any other resume-related information."
];



