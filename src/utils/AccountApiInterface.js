export const createNewSavingAccount = (
  balance,
  interestRate,
  selectedStatus,
  selectedCustomer
) => {
  return {
    balance: balance,
    interestRate: interestRate,
    status: selectedStatus,
    customerDto: {
      id: selectedCustomer,
    },
  };
};

export const createNewCurrentAccount = (
  balance,
  overDraft,
  selectedStatus,
  selectedCustomer
) => {
  return {
    balance: balance,
    overDraft: overDraft,
    status: selectedStatus,
    customerDto: {
      id: selectedCustomer,
    },
  };
};
