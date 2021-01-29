import React from "react";
import QuizScreen from '../../src/screens/quiz';
import {ThemeProvider} from "styled-components";

export default function QuizDaGaleraPage({dbExterno}) {
    return (
        <ThemeProvider theme={dbExterno.theme}>
            <QuizScreen
                externalQuestions={dbExterno.questions}
                externalBg={dbExterno.bg}
            />
        </ThemeProvider>
    );
}

export async function getServerSideProps(context) {
    try {
        const [projectName, gitHubUser] = context.query.id.split('___');
        const dbExterno = await fetch(`https://${projectName}.${gitHubUser}.vercel.app/api/db`)
            .then((respostaDoServer) => {
                if (respostaDoServer.ok) {
                    return respostaDoServer.json();
                }
                throw new Error('Falha ao pegar os dados');
            })
            .then((respostaConvertidaEmObjeto) => respostaConvertidaEmObjeto)
            .catch((err) => {
                console.log('Erro:' + err);
            })

        return {
            props: {
                dbExterno,
            }, //will be passed to the page component as props
        };
    } catch (err) {
        //redirect...
        return;
    }

}
