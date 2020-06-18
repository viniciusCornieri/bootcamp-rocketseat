import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios do Github</Title>

      <Form>
        <input placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="test">
          <img
            src="https://avatars1.githubusercontent.com/u/5756992?s=460&u=4edb4d6759db1f681ea1ee024030bcc19be57195&v=4"
            alt="Vinicius Cornieri"
          />
          <div>
            <strong>Bootcamp Rocketseat</strong>
            <p>Description test</p>
          </div>
          <FiChevronRight />
        </a>
        <a href="test">
          <img
            src="https://avatars1.githubusercontent.com/u/5756992?s=460&u=4edb4d6759db1f681ea1ee024030bcc19be57195&v=4"
            alt="Vinicius Cornieri"
          />
          <div>
            <strong>Bootcamp Rocketseat</strong>
            <p>Description test</p>
          </div>
          <FiChevronRight />
        </a>
        <a href="test">
          <img
            src="https://avatars1.githubusercontent.com/u/5756992?s=460&u=4edb4d6759db1f681ea1ee024030bcc19be57195&v=4"
            alt="Vinicius Cornieri"
          />
          <div>
            <strong>Bootcamp Rocketseat</strong>
            <p>Description test</p>
          </div>
          <FiChevronRight />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
