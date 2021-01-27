import React from "react";

import db from '../db.json';
import QuizBackground from "../src/components/QuizBackground";
import QuizLogo from "../src/components/QuizLogo";
import Widget from "../src/components/Widget";
import Button from "../src/components/Button";
import QuizContainer from "../src/components/QuizContainer";

function LoadingWidget() {
    return(
        <Widget>
            <Widget.Header>
                Carregando...
            </Widget.Header>
            <Widget.Content>
                [Desafio do Loading]
            </Widget.Content>
        </Widget>
    );
}

function QuestionWidget({question, totalQuestions, questionIndex, onSubmit}) {
    const questionId = `question_${questionIndex}`
    return (
        <Widget>
            <Widget.Header>
                <h3>
                    {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
                </h3>
            </Widget.Header>

            <img
                alt="Descrição"
                style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover'
                }}
                src={question.image}
            />

            <Widget.Content>
                <h2>
                    {question.title}
                </h2>
                <p>
                    {question.description}
                </p>

                <form onSubmit={(event) => {
                    event.preventDefault();
                    onSubmit();
                }}>
                    {question.alternatives.map((alternative, index) => {
                        const alternativeId = `alternativeId_${index}`;
                        return (
                            <Widget.Topic
                                as="label"
                                htmlFor={alternativeId}
                            >
                            <input
                                style={{display: 'none'}}
                                type="radio"
                                name={questionId}
                                id={alternativeId}
                            />
                                {alternative}
                            </Widget.Topic>
                        );
                    })}
                    <Button type='submit'>
                    Confirmar
                    </Button>
                </form>
            </Widget.Content>
        </Widget>
    );
}

const screenStates = {
    LOADING: 'loading',
    QUIZ: 'quiz',
    RESULT: 'result'
}

export default function QuizPage() {
    const [screenState, setScreenState] = React.useState(screenStates.LOADING);
    const [questionIndex, setQuestionIndex] = React.useState(0);
    const question = db.questions[questionIndex];
    const totalQuestions = db.questions.length;

    React.useEffect(() => {
        setTimeout(() => {
            setScreenState(screenStates.QUIZ);
        }, 1000)
    }, []);

    function handleSubmitQuiz() {
        const nextQuestion = questionIndex + 1;
        if (nextQuestion < totalQuestions) {
            setQuestionIndex(nextQuestion);
        } else {
            setScreenState(screenStates.RESULT);
        }
    }

    return (
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>
                <QuizLogo />
                {screenState === screenStates.LOADING && <LoadingWidget />};
                {screenState === screenStates.QUIZ && (
                        <QuestionWidget
                        question={question}
                        questionIndex={questionIndex}
                        totalQuestions={totalQuestions}
                        onSubmit={handleSubmitQuiz}
                        />
                    )};
                {screenState === screenStates.RESULT && (
                    <div>Você acertou x questões, parabéns!</div>
                )}
            </QuizContainer>
        </QuizBackground>
    )
};
