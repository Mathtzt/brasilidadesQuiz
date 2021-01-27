import React from "react";
import styled from 'styled-components'
import { useRouter } from "next/router";

import db from '../db.json';
import Widget from '../src/components/Widget'
import QuizBackground from '../src/components/QuizBackground'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizLogo from "../src/components/QuizLogo";

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
        <QuizBackground backgroundImage={db.bg}>
          <Header />
          <QuizContainer>
            <QuizLogo />
            <Widget>
              <Widget.Header>
                <h1>Brasilidades</h1>
              </Widget.Header>
              <Widget.Content>
                <p>Você <b>realmente</b> conhece o Brasil?</p>
                <p>Teste seus conhecimentos e prove que não é um estrangeiro por aqui!</p>
                <form onSubmit={function (event) {
                  event.preventDefault();
                  router.push(`/quiz?name=${name}`);
                }}>
                  <input
                      placeholder="Digite seu nome para começar a jogar!"
                      onChange={function (event) {
                        setName(event.target.value);
                      }}
                  />
                  <button type="submit" disabled={name.length === 0}>
                    Jogar {name}
                  </button>
                </form>
              </Widget.Content>
            </Widget>
            <Widget>
              <Widget.Header>
                <h1>Quizes da Galera</h1>
              </Widget.Header>
              <Widget.Content>
                <p>Encontre outros quizes fantásticos feitos pela galera durante a Imersão React Next.js da Alura:</p>
              </Widget.Content>
            </Widget>
            <Footer />
          </QuizContainer>
          <GitHubCorner projectUrl='https://github.com/Mathtzt' />
        </QuizBackground>
  )
}
