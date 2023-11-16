import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Barchart({ data }) {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            // left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="genre" />
          <YAxis />
          <Tooltip
            content={({ payload, label, active }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="custom-tooltip">
                    <p>{`${label} : ${payload[0].value}`}</p>
                    {/* <p>{`Genre: ${payload[0].payload.genre}`}</p> */}
                  </div>
                );
              }

              return null;
            }}
          />
          <Legend />
          <Bar
            dataKey="count"
            fill="#1db954"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
