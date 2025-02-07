import { BarChart } from "@mui/x-charts/BarChart";

export default function BasicBars() {
  return (
    <BarChart
      xAxis={[
        { scaleType: "band", data: ["Day Before", "Yesterday", "Recent"] },
      ]}
      series={[
        { data: [40, 300, 50] },
        { data: [100, 60, 300] },
        { data: [20, 50, 60] },
      ]}
      width={500}
      height={300}
    />
  );
}
