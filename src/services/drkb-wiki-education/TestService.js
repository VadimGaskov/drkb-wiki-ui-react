import {API_URLS} from "../../constants/ApiUrls";
import {apiRequest, configureUrlParams} from "../ApiService";
import {getCurrentUser} from "../AuthService";

export const getAllTest = async () => {
    return await apiRequest(`${API_URLS.TEST}/get-all-test`);
}

export const getTestById = async (testId) => {
    const params = configureUrlParams({idTest: testId});
    return await apiRequest(`${API_URLS.TEST}/get-by-id-test?${params}`);
}

export const getTestByArticle = async (articleId) => {
    const params = configureUrlParams({articleId: articleId});
    return await apiRequest(`${API_URLS.TEST}/get-all-test-by-article?${params}`);
}

export const completeTest = async (testId, answers) => {
    const user = getCurrentUser();

    const questionWithAnswers = [];
    /*for (let key in answers) {
        const pair = answers[key]; // объект вида { questionId: answerId }
        for (let questionId in pair) {
            const answerId = pair[questionId];
            questionWithAnswers.push({ questionId, answerId });
        }
    }*/

    /*const questionWithAnswers = Object.values(answers).map(obj => {
        const [questionId, answerId] = Object.entries(obj)[0];
        return { questionId, answerId };
    });*/

    answers.forEach((value, key) => {
        questionWithAnswers.push({questionId: key, answerId: value});
    })

    console.log(questionWithAnswers);

    const model = {
        testId: testId,
        userId: user.user.id,
        questionWithAnswers: questionWithAnswers
    }

    console.log(model);

    return await apiRequest(`${API_URLS.TEST}/complete-test`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(model)
    });
}