export const OpDebitCreditInterface = (ribSrc, balance, motif) => {
  return {
    rib: ribSrc,
    amount: balance,
    motif: motif,
  };
};

export const OpTransferInterface = (ribSrc,ribDST ,balance, motif) => {
  return {
    ribSrc: ribSrc,
    ribDest: ribDST,
    amount: balance,
    motif: motif,
  };
};
