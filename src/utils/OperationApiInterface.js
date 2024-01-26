

export const OpDebitInterface = (ribSrc, balance, motif) => {
  return {
    rib: ribSrc,
    amount: balance,
    motif: motif,
  };
};
