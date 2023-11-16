import { useRef } from "react";
import Loader from "./loader";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
export default function Radarchart({ data }) {
  // console.log(data);
  if (!data) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="80%"
          data={data}
          height={400}
          width={400}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar
            name="Mike"
            dataKey="value"
            stroke="#1db954"
            fill="#1db954"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </>
  );
}
