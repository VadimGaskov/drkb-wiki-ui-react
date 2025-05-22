import {API_URLS} from "../../constants/ApiUrls";
import {apiRequest, configureUrlParams} from "../ApiService";
import {getCurrentUser} from "../AuthService";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export const getAllTest = async () => {
    return await apiRequest(`${API_URLS.TEST}/get-all-test`);
}

export const getTestById = async (testId) => {
    const params = configureUrlParams({idTest: testId});
    return await apiRequest(`${API_URLS.TEST}/get-by-id-test?${params}`);
}

export const getFullTestById = async (testId) => {
    const params = configureUrlParams({idTest: testId});
    return await apiRequest(`${API_URLS.TEST}/get-by-id-full-test?${params}`);
}

export const getTestSummary = async (testId) => {
    const params = configureUrlParams({idTest: testId});
    return await apiRequest(`${API_URLS.TEST}/get-test-summary?${params}`);
}


export const getTestByArticle = async (articleId) => {
    const params = configureUrlParams({articleId: articleId});
    return await apiRequest(`${API_URLS.TEST}/get-all-test-by-article?${params}`);
}

export const updateTest = async (test) => {
    return await apiRequest(`${API_URLS.TEST}/update-test`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(test)
    }, false);
}

export const createTest = async (test) => {
    return await apiRequest(`${API_URLS.TEST}/create-test-with-question-and-answers`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(test)
    }, false);
}

export const completeTest = async (testId, answers) => {
    const user = jwtDecode();
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