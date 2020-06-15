import React, { useState, useCallback, FormEvent } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../../services/Api';

import { Wrapper, Content, Title, Form } from './styles';

const SigUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const history = useHistory();

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      if (!email || !name || !password || !confirmPassword) {
        return toast.error('Preencha todos os campos');
      }

      if (password !== confirmPassword) {
        return toast.error('As senhas não se correspondem');
      }

      try {
        await api.post('account', {
          name,
          email,
          password,
        });

        toast.success('Usuário cadastro com sucesso!');

        return history.replace('/');
      } catch (error) {
        if (error.response) {
          const { status } = error.response;
          if (status === 400) {
            return toast.error('Usuário já existe na base de dados');
          }
        }
        return toast.error('Ocorreu um erro inesperado, tente novamente!');
      }
    },
    [confirmPassword, email, history, name, password],
  );

  return (
    <Wrapper>
      <Content>
        <Title>
          <h1>Faça seu cadastro</h1>
        </Title>

        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <input
            type="email"
            defaultValue={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
          />
          <input
            type="text"
            defaultValue={name}
            onChange={e => setName(e.target.value)}
            placeholder="Digite seu nome"
          />
          <input
            type="password"
            defaultValue={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />
          <input
            type="password"
            defaultValue={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Confirme sua senha"
          />

          <button type="submit">Cadastrar</button>

          <Link to="/">
            <FiArrowLeft /> Voltar para o login
          </Link>
        </Form>
      </Content>
    </Wrapper>
  );
};

export default SigUp;
