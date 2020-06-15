import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { FiBarChart2, FiRefreshCcw } from 'react-icons/fi';
import { subHours, parseISO, format } from 'date-fns';
import { Line } from 'react-chartjs-2';

import api from '../../../../services/Api';
import { optionsChart } from '../../../../utils/optionsChart';
import LottieAnimate from '../../../../utils/lottieAnimate';
import bitcoinLoading from '../../../../assets/animations/bitcoin.json';

import Card from '../../../../components/Card';

import { Wrapper, Header, Main } from './styles';

interface HistoricItem {
  buy: number;
  sell: number;
  createdAt: string;
  dateFormatted: string;
}

const Historic: React.FC = () => {
  const [chart, setChart] = useState({});
  const [loading, setLoading] = useState(false);

  const loadHistoric = useCallback(async () => {
    setLoading(true);
    const { data: historics } = await api.get<HistoricItem[]>('history');
    const twentyFourFoursAgo = subHours(new Date(), 24);

    const newHistoric = historics
      .filter(item => parseISO(item.createdAt) >= twentyFourFoursAgo)
      .map(item => ({
        ...item,
        dateFormatted: format(parseISO(item.createdAt), 'HH:mm'),
      }));

    const labels = newHistoric.map(item => item.dateFormatted);
    const buy = newHistoric.map(item => item.buy.toFixed(2));
    const sell = newHistoric.map(item => item.sell.toFixed(2));

    const data = optionsChart(labels, buy, sell);

    setChart(data);
    setLoading(false);
  }, []);

  const cardHeader = useMemo(
    () => (
      <Header>
        <h2>
          <FiBarChart2 /> Histórico das últimas 24 horas
        </h2>

        <button type="button" onClick={loadHistoric}>
          <FiRefreshCcw /> Atualizar histórico
        </button>
      </Header>
    ),
    [loadHistoric],
  );

  useEffect(() => {
    loadHistoric();
  }, [loadHistoric]);

  return (
    <Wrapper>
      <Card header={cardHeader}>
        <Main>
          {loading ? (
            <LottieAnimate fileAnimate={bitcoinLoading} />
          ) : (
            <Line data={chart} />
          )}
        </Main>
      </Card>
    </Wrapper>
  );
};

export default Historic;
