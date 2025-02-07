import { formatTransactionsForBarChart } from "@/components/utiles"; // Adjust the path accordingly
import { BarChart } from "@mui/x-charts";

export const SecondBar = ({ transactions, height, width }) => {
  const { data, labels } = formatTransactionsForBarChart(transactions);

  return (
    <BarChart
      series={[{ data }]}
      xAxis={[{ scaleType: "band", data: labels }]}
      height={height}
      width={width}
      leftAxis={null}
    />
  );
};
