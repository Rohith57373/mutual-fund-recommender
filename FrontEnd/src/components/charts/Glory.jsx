import { Gauge } from "@mui/x-charts/Gauge";

export default function BasicGauges({ spent, valueMax }) {
  return (
    <Gauge
      width={200}
      height={200}
      value={spent}
      startAngle={0}
      endAngle={360}
      valueMin={0}
      valueMax={valueMax}
      cornerRadius="50%"
    />
  );
}
