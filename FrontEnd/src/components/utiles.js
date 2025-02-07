const formatTransactionsForBarChart = (transactions) => {
  const categories = transactions.map((transaction) => transaction.category);
  const categoryData = transactions.map((transaction) => ({
    category: transaction.category,
    total: transaction.amount,
  }));

  return {
    data: categoryData.map((item) => item.total),
    labels: categories,
  };
};
const formatTransactionsForPieChart = (transactions) => {
  const categoryTotals = transactions.reduce((acc, transaction) => {
    if (!acc[transaction.category]) {
      acc[transaction.category] = 0;
    }
    acc[transaction.category] += transaction.amount;
    return acc;
  }, {});

  return Object.keys(categoryTotals).map((category, index) => ({
    id: index,
    value: categoryTotals[category],
    label: category,
  }));
};

export { formatTransactionsForBarChart, formatTransactionsForPieChart };
