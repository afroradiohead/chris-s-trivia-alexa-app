import {RequestHandler} from 'ask-sdk';
import {map} from 'lodash';
import {getRandomQuestionData} from "../services/QuestionService";

export const LaunchIntent: RequestHandler = {
    canHandle: handlerInput => {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle: async(handlerInput) => {
        const questionData = await getRandomQuestionData();
        const answerOptionText = map(questionData.options, (answerText, answerLetter) => {
            return `${answerLetter}: ${answerText}?`
        }).join('\n');
        const questionNumber = 1;
        const questionText = questionData.question;

        handlerInput.attributesManager.setSessionAttributes({
            questionNumber: questionNumber,
            currentQuestionData: questionData
        });

        const speakText = `
            Starting Chris's Trivia... Please speak the letter for your answer!
            Question ${questionNumber}: ${questionText}.
            Is it: 
            ${answerOptionText}
        `;
        const cardText = `
            Question ${questionNumber}: ${questionText}.
            Is it: 
            ${answerOptionText}
        `;
        return handlerInput.responseBuilder
            .speak(speakText)
            .withSimpleCard(`Question ${questionNumber}`, cardText)
            .reprompt(speakText)
            .getResponse();
    }
};
