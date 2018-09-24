import {SkillBuilders} from 'ask-sdk';
import {AnswerIntent} from "./intents/AnswerIntent";
import {LaunchIntent} from "./intents/LaunchIntent";

export const alexa = SkillBuilders.custom()
    .addRequestHandlers(LaunchIntent, AnswerIntent)
    .lambda();
