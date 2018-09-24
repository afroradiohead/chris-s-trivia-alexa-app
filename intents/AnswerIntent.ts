import {RequestHandler} from "ask-sdk-core";
import {get} from 'lodash';

export const AnswerIntent: RequestHandler = {
    canHandle: handlerInput => {
        const {request} = handlerInput.requestEnvelope;
        return request.type === 'IntentRequest' && get(request, 'intent.name') === 'AnswerIntent';
    },
    handle: handlerInput => {
        const {questionNumber, currentQuestionData} = handlerInput.attributesManager.getSessionAttributes();
        const answerInput = get(handlerInput.requestEnvelope.request, 'intent.slots.answer.value');
        const currentAnswer = get(currentQuestionData, ['answer']);
        const currentAnswerText = get(currentQuestionData, ['options', currentAnswer]);

        if (answerInput === currentAnswer) {
            return handlerInput.responseBuilder
                .speak(`Correct! The answer is ${currentAnswer}. ${currentAnswerText}`)
                .withSimpleCard(`Correct`, `The answer is ${currentAnswer}! ${currentAnswerText}`)
                .getResponse();
        }

        return handlerInput.responseBuilder
            .speak(`Sorry, incorrect! The answer is ${currentAnswer}. ${currentAnswerText}`)
            .withSimpleCard(`Incorrect`, `The answer is ${currentAnswer}! ${currentAnswerText}`)
            .getResponse();
    }
};