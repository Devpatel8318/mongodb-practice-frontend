import React, { useEffect, useState } from 'react';
import { getAllQuestionsActionDispatcher } from './dashboard.action';
import { useAppSelector } from 'src/Store';
import { API_STATUS } from 'src/utils/callApi';
import { Question } from 'src/Store/reducers/dashboard.reducer';

const Dashboard: React.FC = () => {
    // const [loading, setLoading] = useState<boolean>(false);
    // const [questions, setQuestions] = useState<Question[]>([]);

    const { loading, questions, error } = useAppSelector(
        (store) => store.dashboardReducer
    );

    useEffect(() => {
        getAllQuestionsActionDispatcher();
    }, []);

    // useEffect(() => {
    //     setLoading(isApiLoading);
    // }, [isApiLoading]);

    // useEffect(() => {
    //     if (status === API_STATUS.SUCCESS) {
    //         console.log('apiQuestions', questions);
    //         // setQuestions(apiQuestions);
    //     }
    // }, [status]);

    if (error) return <div>Can't Load</div>;

    if (loading) return <div>Loading...</div>;

    console.log({ questions });

    return (
        <div className="">
            <button
                onClick={() => {
                    getAllQuestionsActionDispatcher();
                }}
            >
                Click me
            </button>
            {questions &&
                questions.map((question, index) => {
                    return (
                        <div
                            className={`pl-2 py-4 ${
                                index % 2 === 0 ? '' : 'bg-gray-300'
                            }`}
                        >
                            <h4 className="text-2xl">
                                {question.questionId}. {''}
                                {question.question}
                            </h4>
                            <h3 className="text-lg">{question.answer}</h3>
                        </div>
                    );
                })}
        </div>
    );
};

export default Dashboard;
