import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "next/router";
import Form from 'react-bootstrap/Form';

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
  const [dificuldade, setDificuldade] = React.useState('facil');

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
                <Form onSubmit={function (event) {
                  event.preventDefault();
                  router.push(`/quiz?name=${name}&nv=${dificuldade}`);
                }}>

                  <Form.Group controlId="dificuldadeForm">
                    <Form.Label>Dificuldade</Form.Label>
                    <Form.Control as="select" onChange={event => setDificuldade(event.target.value)}>
                      <option value="facil">Fácil</option>
                      <option value="medio">Médio</option>
                      <option value="dificil">Difícil</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Label>Nome</Form.Label>
                  <Input
                      name="nomeDoUsuario"
                      placeholder="Digite seu nome para começar a jogar!"
                      onChange={(event) => setName(event.target.value)}
                      value={name}
                  />
                  <Button type="submit" disabled={name.length === 0}>
                    Jogar
                  </Button>
                </Form>
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
