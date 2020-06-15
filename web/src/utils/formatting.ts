const formatMoney = (value: number): string => {
  const formatted = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

  return formatted;
};

const formatPercentage = (value: number): string => {
  const formatted = Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 1,
  }).format(value);

  return formatted;
};

export { formatMoney, formatPercentage };
