import React, { useEffect } from 'react';
import { getAllQuestionsActionDispatcher } from './dashboard.action';
import { useAppSelector } from 'src/Store';

const Dashboard: React.FC = () => {
    const {
        loading,
        data: questions,
        error,
    } = useAppSelector((store) => store.dashboardReducer);

    useEffect(() => {
        getAllQuestionsActionDispatcher();
    }, []);

    if (error) return <div>Can't Load</div>;

    if (loading) return <div>Loading...</div>;

    return (
        <div className="">
            <button
                onClick={() => {
                    getAllQuestionsActionDispatcher();
                }}
            >
                Click me
            </button>
            {questions.map((question, index) => {
                return (
                    <div
                        className={`pl-2 py-4 ${
                            index % 2 === 0 ? '' : 'bg-gray-300'
                        }`}
                    >
                        <h4 className="text-2xl">
                            {question.questionId}.{question.question}
                        </h4>
                        <h3 className="text-lg">{question.answer}</h3>
                    </div>
                );
            })}
        </div>
    );
};

export default Dashboard;
