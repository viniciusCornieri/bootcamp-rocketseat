import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import { FiArrowLeft, FiLock } from 'react-icons/fi';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Content, Background } from './styles';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();
  const location = useLocation();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        // eslint-disable-next-line no-unused-expressions
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string()
            .required('Senha obrigatória')
            .min(6, 'No mínimo 6 caracteres'),
          password_confirmation: Yup.string()
            .required('Confirmação obrigatória')
            .oneOf([Yup.ref('password')], 'confirmação incorreta'),
        });

        await schema.validate(data, { abortEarly: false });

        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error('token not found');
        }

        const { password, password_confirmation } = data;

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        addToast({
          type: 'success',
          title: 'Senha alterada com sucesso',
          description:
            'Agora você já pode fazer login na aplicação com a nova senha.',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          console.error(err);
          // eslint-disable-next-line no-unused-expressions
          formRef.current?.setErrors(getValidationErrors(err));

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao resetar a senha',
          description:
            'Ocorreu um erro ao resetar a sua senha, tente novamente.',
        });
      }
    },
    [addToast, history, location.search],
  );
  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="GoBarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Resetar senha</h1>

          <Input
            name="password"
            type="password"
            placeholder="Nova senha"
            icon={FiLock}
          />

          <Input
            name="password_confirmation"
            type="password"
            placeholder="Confirmação da senha"
            icon={FiLock}
          />

          <Button type="submit">Alterar senha</Button>
        </Form>
        <Link to="/">
          <FiArrowLeft />
          Voltar para o logon
        </Link>
      </Content>
    </Container>
  );
};

export default ResetPassword;
