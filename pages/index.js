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
import Input from "../src/components/Input";
import Button from "../src/components/Button";
import QuizContainer from "../src/components/QuizContainer";

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
                <h1>Brasilidades Quiz</h1>
              </Widget.Header>
              <Widget.Content>
                <p>Você <b>realmente</b> conhece o Brasil?</p>
                <p>Teste seus conhecimentos e prove que não é um estrangeiro por aqui!</p>
                <form onSubmit={function (event) {
                  event.preventDefault();
                  router.push(`/quiz?name=${name}`);
                }}>
                  <Input
                      name="nomeDoUsuario"
                      placeholder="Digite seu nome para começar a jogar!"
                      onChange={(event) => setName(event.target.value)}
                      value={name}
                  />
                  <Button type="submit" disabled={name.length === 0}>
                    Jogar
                  </Button>
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
