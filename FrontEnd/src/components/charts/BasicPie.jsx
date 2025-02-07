import { formatTransactionsForPieChart } from "@/components/utiles";
import { PieChart } from "@mui/x-charts/PieChart";

export default function BasicPie({ height, width, transactions }) {
  const data = formatTransactionsForPieChart(transactions);

  return <PieChart series={[{ data }]} width={width} height={height} />;
}
