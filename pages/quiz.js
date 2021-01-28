import React from "react";
import { useRouter } from 'next/router'

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

import db from '../db.json';
import QuizBackground from "../src/components/QuizBackground";
import QuizLogo from "../src/components/QuizLogo";
import Widget from "../src/components/Widget";
import Button from "../src/components/Button";
import QuizContainer from "../src/components/QuizContainer";
import AlternativesForm from "../src/components/AlternativeForm";
import NavHomePage from "../src/components/NavToHome";

const screenStates = {
    LOADING: 'loading',
    QUIZ: 'quiz',
    RESULT: 'result'
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
                    <ResultWidget results={results} key={screenStates.RESULT}/>
                )}
            </QuizContainer>
        </QuizBackground>
    )
};

function getDesempenhoMsg(results) {
    const total = results.filter(x => x).length;
    return total >= 3 ? 'Mandou muito bem,' : 'Não foi dessa vez estrangeiro,';
}

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
    const router = useRouter()
    const params = router.query;

    return(
        <Widget>
            <Widget.Header>
                Tela de Resultados
            </Widget.Header>
            <Widget.Content>
                <p>{getDesempenhoMsg(results)} <strong>{params.name}</strong>!</p>
                <div>Você fez um total de {getSomatorioAcertosQuiz(results) * 20} pontos.</div>

                <NavHomePage />
                {/*<ul>
                    {results.map((result, index) => (
                        <li>
                            Questão {index+1}: {' '}
                            {result === true
                                ? 'Acertou'
                                : 'Errou'
                            }
                        </li>
                    ))}
                </ul>*/}
            </Widget.Content>
        </Widget>
    );
}

function LoadingWidget() {
    return(
        <Widget>
            <Widget.Header>
                Preparado? ...
            </Widget.Header>
            <Widget.Content>
                <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} padding={'15px'}/>
            </Widget.Content>
        </Widget>
    );
}
