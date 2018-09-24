import axios from "axios";
import {chain, findKey, get} from 'lodash';
import {getLetterAfterIncrementing} from "../helpers";


export async function getRandomQuestionData(): Promise<IQuestionData> {
    const response = await axios.get('https://opentdb.com/api.php', {
        params: {
            amount: 1,
            category: 26,
            difficulty: 'easy',
        }
    });
    const result = get(response, ['data', 'results', 0]);
    const incorrect_answers = get(result, 'incorrect_answers', []);
    const correct_answer = get(result, 'correct_answer');

    const question = get(result, 'question');
    const options = chain(incorrect_answers)
        .concat(correct_answer)
        .shuffle()
        .mapKeys((value, key) => getLetterAfterIncrementing('a', +key))
        .value();
    const answer = findKey(options, v => v === correct_answer);

    return {question, answer, options}
}



interface IQuestionData {
    question: string;
    answer: string;
    options: {[key: string]: string};
}