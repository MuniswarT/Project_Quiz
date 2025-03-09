import { createContext, useState } from "react";

export const QuizContext = createContext();

const QuizProvider = ({ children }) => {
    const [quizData, setQuizData] = useState({
        category: null,
        limit: 5
    });

    return (
        <QuizContext.Provider value={{ quizData, setQuizData }}>
            {children}
        </QuizContext.Provider>
    );
};

export default QuizProvider;
