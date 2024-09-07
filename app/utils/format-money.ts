export const formatMoney = (value?: number): string => {
  if (!value) {
    return `$${0}`;
  }

  const MXPeso = Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  });

  return MXPeso.format(value);
}