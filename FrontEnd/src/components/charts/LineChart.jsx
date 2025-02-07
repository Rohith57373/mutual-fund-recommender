import { LineChart } from "@mui/x-charts/LineChart";

export default function BasicLineChart({ spendingData }) {
  // Assuming spendingData is an array of objects with 'date' and 'amount' properties
  const dates = spendingData.map((item) => item.date);
  const amounts = spendingData.map((item) => item.amount);

  // Reverse the arrays if you want to show data from oldest to newest
  // dates.reverse();
  // amounts.reverse();

  return (
    <LineChart
      xAxis={[{ data: dates }]}
      series={[
        {
          data: amounts,
        },
      ]}
      width={500}
      height={300}
    />
  );
}
