import { BarChart } from "@mui/x-charts/BarChart";

const chartSetting = {
  xAxis: [
    {
      label: "Spent on Categories",
    },
  ],
  width: 700,
  height: 300,
};

const valueFormatter = (value) => `${value}mm`;

export default function HorizontalGrid({ dataset, dataKey, datakeyY }) {
  return (
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: "band", dataKey: "category" }]}
      series={[{ dataKey: "amount" }]}
      layout="horizontal"
      grid={{ vertical: true }}
      {...chartSetting}
    />
  );
}
