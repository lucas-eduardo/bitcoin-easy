import React, { useState, useCallback, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuth } from '../../../hooks/Auth';

import { Wrapper, Content, Title, Form } from './styles';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      setLoading(true);

      if (!email || !password) {
        setLoading(false);
        return toast.error('Preencha todos os campos');
      }

      try {
        await signIn({ email, password });

        return toast.success('Login realizado com sucesso!');
      } catch (error) {
        setLoading(false);
        if (error.response) {
          const { status } = error.response;
          if (status === 400) {
            return toast.error('Usuário já existe na base de dados');
          }
        }
        return toast.error(
          'Ocorreu um erro ao tentar fazer o login, tente novamente!',
        );
      }
    },
    [email, password, signIn],
  );

  return (
    <Wrapper>
      <Content>
        <Title>
          <h1>Login</h1>
        </Title>

        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <input
            type="email"
            defaultValue={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
            placeholder="Digite seu e-mail"
          />
          <input
            type="password"
            defaultValue={password}
            onChange={e => setPassword(e.target.value)}
            disabled={loading}
            placeholder="Digite sua senha"
          />

          <button type="submit">{loading ? 'Carregando' : 'Entrar'}</button>

          <span>
            Não tem uma conta? <Link to="/signup">Registre-se</Link>
          </span>
        </Form>
      </Content>
    </Wrapper>
  );
};

export default SignIn;
