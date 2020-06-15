import React, {
  useMemo,
  useCallback,
  useState,
  useEffect,
  FormEvent,
} from 'react';
import { FiDollarSign, FiRefreshCcw } from 'react-icons/fi';
import { toast } from 'react-toastify';
import NumberFormat from 'react-number-format';

import { useModal } from '../../../../hooks/Modal';
import { useTransactions } from '../../../../hooks/Transactions';
import { formatMoney } from '../../../../utils/formatting';
import LottieAnimate from '../../../../utils/lottieAnimate';
import bitcoinLoading from '../../../../assets/animations/bitcoin.json';
import api from '../../../../services/Api';

import Card from '../../../../components/Card';

import { Header, Main, Footer, Purchased, Sell } from './styles';

const ModalPurchased: React.FC = () => {
  const { closeModal } = useModal();
  const { loadBalance, balance } = useTransactions();

  const [amount, setAmount] = useState(0);
  const [purchasedFraction, setPurchasedFraction] = useState(0);
  const [valueFormatted, setValueFormatted] = useState('');

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      if (amount > balance) {
        return toast.error('Você não possui esse saldo atualmente');
      }
      await api.post('btc/purchase', { amount });
      await loadBalance();
      toast.success('Bitcoin comprado com sucesso!');
      return closeModal();
    },
    [amount, balance, closeModal, loadBalance],
  );

  const cardHeader = useMemo(() => <h1>Compra de bitcoin</h1>, []);

  const cardFooter = useMemo(
    () => (
      <button type="submit" disabled={!valueFormatted}>
        Confirmar compra
      </button>
    ),
    [valueFormatted],
  );

  useEffect(() => {
    if (amount) {
      api.get('btc/price').then(({ data }) => {
        const fraction = amount / data.buy;
        setPurchasedFraction(fraction);
      });
    }
  }, [amount]);

  return (
    <Purchased noValidate autoComplete="off" onSubmit={handleSubmit}>
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
            floatValue && setAmount(floatValue);
          }}
          onChange={({ target }) => setValueFormatted(target.value)}
        />

        {valueFormatted && (
          <h2>
            Fração comprada: <span>{purchasedFraction.toFixed(8)}</span>
          </h2>
        )}
      </Card>
    </Purchased>
  );
};

const ModalSell: React.FC = () => {
  const { closeModal } = useModal();
  const { loadBalance } = useTransactions();

  const [amount, setAmount] = useState(0);
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [valueFormatted, setValueFormatted] = useState('');

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      if (amount > purchaseAmount) {
        return toast.error('Você não possui esse saldo atualmente em bitcoin');
      }
      await api.post('btc/sell', { amount });
      await loadBalance();
      toast.success('Bitcoin vendido com sucesso!');
      return closeModal();
    },
    [amount, closeModal, loadBalance, purchaseAmount],
  );

  const cardHeader = useMemo(() => <h1>Venda de bitcoin</h1>, []);

  const cardFooter = useMemo(
    () => (
      <button type="submit" disabled={!valueFormatted}>
        Confirmar venda
      </button>
    ),
    [valueFormatted],
  );

  useEffect(() => {
    api.get('btc').then(({ data }) => {
      const [last] = data;
      setPurchaseAmount(last.purchaseAmount);
    });
  }, []);

  return (
    <Sell noValidate autoComplete="off" onSubmit={handleSubmit}>
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
            floatValue && setAmount(floatValue);
          }}
          onChange={({ target }) => setValueFormatted(target.value)}
        />
      </Card>
    </Sell>
  );
};

const Counting: React.FC = () => {
  const { setContent } = useModal();
  const { loadBalance } = useTransactions();

  const [buy, setBuy] = useState(formatMoney(0));
  const [sell, setSell] = useState(formatMoney(0));
  const [loading, setLoading] = useState(false);

  const loadPriceBtc = useCallback(async () => {
    setLoading(true);
    const { data } = await api.get('btc/price');
    setBuy(formatMoney(data.buy));
    setSell(formatMoney(data.sell));
    setLoading(false);
    toast.success('Contação atualizada com sucesso!');
  }, []);

  const buyNow = useCallback(async () => {
    setLoading(true);
    const balance = await loadBalance();
    if (!balance) {
      toast.error('Realize um depósito para poder realizar a compra!');
    }
    setContent(<ModalPurchased />);
    setLoading(false);
  }, [loadBalance, setContent]);

  const sellNow = useCallback(() => {
    setLoading(true);
    setContent(<ModalSell />);
    setLoading(false);
  }, [setContent]);

  const cardHeader = useMemo(
    () => (
      <Header>
        <h2>
          <FiDollarSign /> Contação atual
        </h2>

        <button type="button" onClick={loadPriceBtc}>
          <FiRefreshCcw /> Atualizar cotação
        </button>
      </Header>
    ),
    [loadPriceBtc],
  );

  const cardFooter = useMemo(
    () => (
      <Footer>
        <button
          type="button"
          disabled={loading}
          className="buy"
          onClick={buyNow}
        >
          Comprar agora
        </button>

        <button
          type="button"
          disabled={loading}
          className="sell"
          onClick={sellNow}
        >
          Vender agora
        </button>
      </Footer>
    ),
    [buyNow, loading, sellNow],
  );

  useEffect(() => {
    setLoading(true);
    api.get('btc/price').then(({ data }) => {
      setBuy(formatMoney(data.buy));
      setSell(formatMoney(data.sell));
      setLoading(false);
    });
  }, []);

  return (
    <Card header={cardHeader} footer={cardFooter}>
      <Main>
        {loading ? (
          <LottieAnimate fileAnimate={bitcoinLoading} />
        ) : (
          <>
            <span className="buy">
              <strong>Valor para compra:</strong> {buy}
            </span>
            <span className="sell">
              <strong>Valor para venda:</strong> {sell}
            </span>
          </>
        )}
      </Main>
    </Card>
  );
};

export default Counting;
