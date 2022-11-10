import axios from "axios";
import { URL_USER_SVC, URL_HISTORY_SVC } from "./configs";

export const ensureLoggedIn = async (navigate) => {
    await axios.get(URL_USER_SVC + '/auth',
        { withCredentials: true, credentials: 'include' })
        .catch((err) => {
            console.log(err)
            navigate("/login")
        });
}

export const updateAttemptedQuestions = async (username, QuestionTitle, QuestionDifficulty) => {
    console.log('updateAttemptedQuestion fired');
    await axios.put(URL_HISTORY_SVC + '/' + username,
        { 'questionTitle': QuestionTitle, 'questionDifficulty': QuestionDifficulty })
        .then(response => {
            console.log('History update success for ' + QuestionTitle);
        })
        .catch((err) => {
            console.log(err)
        });
}