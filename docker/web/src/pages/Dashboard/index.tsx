import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FiPower, FiRefreshCcw } from 'react-icons/fi';

import { useAuth } from '../../hooks/Auth';
import { useTransactions } from '../../hooks/Transactions';

import Router from './routes';

import { Wrapper, Header, Menu, Main } from './styles';

interface Props {
  path: string;
}

const Dashboard: React.FC<Props> = ({ path }) => {
  const { signOut } = useAuth();
  const { formattedBalance, loadBalance } = useTransactions();

  useEffect(() => {
    loadBalance();
  }, [loadBalance]);

  return (
    <Wrapper>
      <Menu>
        <Header>
          <div>
            <h1>Bitcoin Easy</h1>
            <span>
              <button type="button" onClick={loadBalance}>
                <FiRefreshCcw />
              </button>
              Saldo atual: {formattedBalance}
            </span>
          </div>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </Header>

        <ul>
          <li>
            <NavLink activeClassName="active" to="/">
              Dashboard
            </NavLink>
          </li>
        </ul>
      </Menu>
      <Main>
        <Router pathFather={path} />
      </Main>
    </Wrapper>
  );
};

export default Dashboard;
