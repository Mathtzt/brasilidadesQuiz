import React from "react";

import db from '../db.json';
import QuizBackground from "../src/components/QuizBackground";
import QuizLogo from "../src/components/QuizLogo";
import Widget from "../src/components/Widget";
import Button from "../src/components/Button";
import QuizContainer from "../src/components/QuizContainer";
import AlternativesForm from "../src/components/AlternativeForm";

function getSomatorioAcertosQuiz(results) {
    return (
        results.reduce((somatorioAtual, resultAtual) => {
            const isAcerto = resultAtual === true;
            if (isAcerto) {
                return somatorioAtual + 1;
            }
            return somatorioAtual;
        }, 0)
    )
}

function ResultWidget({results}) {
    return(
        <Widget>
            <Widget.Header>
                Tela de Resultados
            </Widget.Header>
            <Widget.Content>
                <div>Você acertou {getSomatorioAcertosQuiz(results)} questões, parabéns!</div>
                <ul>
                    {results.map((result, index) => (
                        <li>
                            Questão {index+1}: {' '}
                            {result === true
                                ? 'Acertou'
                                : 'Errou'
                            }
                        </li>
                    ))}
                </ul>
            </Widget.Content>
        </Widget>
    );
}

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

function QuestionWidget({question, totalQuestions, questionIndex, onSubmit, addResult}) {
    const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
    const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
    const questionId = `question_${questionIndex}`
    const isCorrect = selectedAlternative === question.answer;
    const hasAlternativeSelected = selectedAlternative !== undefined;

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

                <AlternativesForm onSubmit={(event) => {
                    event.preventDefault();
                    setIsQuestionSubmited(true);
                    setTimeout(() => {
                        addResult(isCorrect);
                        setIsQuestionSubmited(false);
                        setSelectedAlternative(undefined);
                        onSubmit();
                    }, 2000)
                }}>
                    {question.alternatives.map((alternative, index) => {
                        const alternativeId = `alternativeId_${index}`;
                        const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
                        const isSelected = selectedAlternative == index;

                        return (
                            <Widget.Topic
                                as="label"
                                key={alternativeId}
                                htmlFor={alternativeId}
                                data-selected={isSelected}
                                data-status={isQuestionSubmited && alternativeStatus}
                            >
                            <input
                                style={{display: 'none'}}
                                type="radio"
                                name={questionId}
                                id={alternativeId}
                                onChange={() => setSelectedAlternative(index)}
                            />
                                {alternative}
                            </Widget.Topic>
                        );
                    })}
                    <Button type='submit' disabled={!hasAlternativeSelected}>
                    Confirmar
                    </Button>

                    {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
                    {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
                </AlternativesForm>
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
    const [results, setResults] = React.useState([])
    const question = db.questions[questionIndex];
    const totalQuestions = db.questions.length;

    function addResult(result) {
        setResults([
            ...results,
            result
        ]);
    }

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
                        addResult={addResult}
                        onSubmit={handleSubmitQuiz}
                        />
                    )};
                {screenState === screenStates.RESULT && (
                    <ResultWidget results={results}/>
                )}
            </QuizContainer>
        </QuizBackground>
    )
};
