import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { FiActivity, FiRefreshCcw } from 'react-icons/fi';
import { parseISO, format } from 'date-fns';

import api from '../../../../services/Api';
import { formatPercentage, formatMoney } from '../../../../utils/formatting';
import LottieAnimate from '../../../../utils/lottieAnimate';
import bitcoinLoading from '../../../../assets/animations/bitcoin.json';

import Card from '../../../../components/Card';

import { Wrapper, Header, Main } from './styles';

interface PositionItem {
  id: string;
  purchasePrice: number | string;
  currentPrice: number;
  purchasedBtcAmount: number;
  currentBtcAmount: number;
  purchaseAmount: number;
  sellAmount: number;
  variation: number;
  purchasedDate: string;
  percent: string;
  purchasedDateFormatted: string;
  amountInvested: string;
  valueBrute: string;
}

const Position: React.FC = () => {
  const [positions, setPositions] = useState<PositionItem[]>([]);

  const loadPosition = useCallback(async () => {
    const { data } = await api.get<PositionItem[]>('btc');
    const formattedPositions = data.map(item => ({
      ...item,
      percent: formatPercentage(item.variation),
      purchasedDateFormatted: format(
        parseISO(item.purchasedDate),
        'dd/MM/yyyy HH:mm',
      ),
      amountInvested: formatMoney(item.purchaseAmount),
      purchasePrice: formatMoney(item.purchasePrice as number),
      valueBrute: formatMoney(item.sellAmount + item.purchaseAmount),
    }));

    setPositions(formattedPositions);
  }, []);

  const cardHeader = useMemo(
    () => (
      <Header>
        <h2>
          <FiActivity /> Posição dos investimentos
        </h2>

        <button type="button" onClick={loadPosition}>
          <FiRefreshCcw /> Atualizar posição
        </button>
      </Header>
    ),
    [loadPosition],
  );

  const table = useMemo(
    () =>
      positions.map(position => (
        <tr key={position.id}>
          <td>{position.purchasedDateFormatted}</td>
          <td>{position.amountInvested}</td>
          <td>{position.purchasePrice}</td>
          <td>{position.percent}</td>
          <td>{position.valueBrute}</td>
        </tr>
      )),
    [positions],
  );

  useEffect(() => {
    loadPosition();
  }, [loadPosition]);

  return (
    <Wrapper>
      <Card header={cardHeader}>
        <Main>
          {positions.length === 0 ? (
            <LottieAnimate fileAnimate={bitcoinLoading} />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Data da compra</th>
                  <th>Valor investido</th>
                  <th>Valor btc na compra</th>
                  <th>Variação</th>
                  <th>Valor bruto</th>
                </tr>
              </thead>
              <tbody>{table}</tbody>
            </table>
          )}
        </Main>
      </Card>
    </Wrapper>
  );
};

export default Position;
