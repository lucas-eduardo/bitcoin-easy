import React, {
  useMemo,
  useCallback,
  useState,
  FormEvent,
  useEffect,
} from 'react';
import { FiList, FiRefreshCcw } from 'react-icons/fi';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import { parseISO, format } from 'date-fns';

import { useModal } from '../../../../hooks/Modal';
import { useTransactions } from '../../../../hooks/Transactions';
import { formatMoney } from '../../../../utils/formatting';
import LottieAnimate from '../../../../utils/lottieAnimate';
import bitcoinLoading from '../../../../assets/animations/bitcoin.json';
import Card from '../../../../components/Card';
import api from '../../../../services/Api';

import { Header, Main, Footer, Deposit } from './styles';

interface ExractItem {
  id: string;
  value: number;
  type: 'deposit';
  createdAt: string;
}

interface ModalDepositProps {
  loadExtract: () => Promise<void>;
}

const ModalDeposit: React.FC<ModalDepositProps> = ({ loadExtract }) => {
  const { closeModal } = useModal();
  const { loadBalance } = useTransactions();

  const [value, setValue] = useState(0);
  const [valueFormatted, setValueFormatted] = useState('');

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      await api.post('deposit', { value });
      await loadBalance();
      await loadExtract();
      toast.success('Deposito realizado com sucesso!');
      closeModal();
    },
    [value, closeModal, loadBalance, loadExtract],
  );

  const cardHeader = useMemo(() => <h1>Depositar</h1>, []);

  const cardFooter = useMemo(
    () => <button type="submit">Confirmar deposito</button>,
    [],
  );

  return (
    <Deposit noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Card header={cardHeader} footer={cardFooter}>
        <NumberFormat
          type="text"
          value={valueFormatted}
          prefix="R$ "
          thousandSeparator="."
          decimalSeparator=","
          decimalScale={2}
          fixedDecimalScale
          allowNegative={false}
          onValueChange={({ floatValue }) => {
            floatValue && setValue(floatValue);
          }}
          onChange={({ target }) => setValueFormatted(target.value)}
        />
      </Card>
    </Deposit>
  );
};

const types = {
  investment: 'Investimento',
  sold: 'Venda',
  deposit: 'Deposito',
};

const Extract: React.FC = () => {
  const { setContent } = useModal();

  const [extract, setExtract] = useState<ExractItem[]>([]);
  const [loading, setLoading] = useState(false);

  const loadExtract = useCallback(async () => {
    setLoading(true);
    const { data } = await api.get<ExractItem[]>('extract');

    setExtract(data);
    setLoading(false);
  }, []);

  const handleDeposit = useCallback(() => {
    setContent(<ModalDeposit loadExtract={loadExtract} />);
  }, [loadExtract, setContent]);

  const updateStatement = useCallback(async () => {
    setLoading(true);
    await loadExtract();

    setLoading(false);
    toast.success('Extrato atualizado com sucesso!');
  }, [loadExtract]);

  const cardHeader = useMemo(
    () => (
      <Header>
        <h2>
          <FiList /> Extrato
        </h2>

        <button type="button" onClick={updateStatement}>
          <FiRefreshCcw /> Atualizar extrato
        </button>
      </Header>
    ),
    [updateStatement],
  );

  const cardFooter = useMemo(
    () => (
      <Footer>
        <button type="button" onClick={handleDeposit}>
          Depositar
        </button>
      </Footer>
    ),
    [handleDeposit],
  );

  const formattedValue = useCallback((item: any) => {
    if (item.type === 'deposit') {
      return formatMoney(item.deposit);
    }

    if (item.type === 'investment') {
      return formatMoney(item.amountInvested);
    }

    if (item.type === 'sold') {
      return formatMoney(item.valueSold);
    }
  }, []);

  const table = useMemo(
    () =>
      extract.map(item => (
        <tr key={item.id}>
          <td>{types[item.type]}</td>
          <td>{formattedValue(item)}</td>
          <td>{format(parseISO(item.createdAt), 'dd/MM/yyyy')}</td>
        </tr>
      )),
    [extract, formattedValue],
  );

  useEffect(() => {
    loadExtract();
  }, [loadExtract]);

  return (
    <Card header={cardHeader} footer={!loading && cardFooter}>
      <Main>
        {loading ? (
          <LottieAnimate fileAnimate={bitcoinLoading} />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Valor</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>{table}</tbody>
          </table>
        )}
      </Main>
    </Card>
  );
};

export default Extract;
