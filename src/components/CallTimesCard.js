import { Card, CardContent, Typography } from "@material-ui/core";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";

function getCallTimes(data) {
  let callMap = new Map();
  let result = [];

  for (let i = 0; i < 24; i++) {
    callMap.set(i.toString(), 0);
  }

  const callsByHour = _.groupBy(Array.from(data.values()), (i) => {
    return new Date(i.start.date_created).getHours();
  });

  for (const [hour, executions] of Object.entries(callsByHour)) {
    if (!callMap.has(hour)) {
      continue;
    }

    callMap.set(hour, executions.length);
  }

  callMap.forEach((value, key) => {
    result.push({ hour: key, cnt: value });
  });

  return result.sort();
}

export default ({ data }) => {
  return (
    <Card sx={{ p: 2 }}>
      <CardContent align="center">
        <Typography variant="h6" color="textPrimary">
          Most popular call times
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Count of calls received by hour of day
        </Typography>
        <LineChart width={650} height={300} data={getCallTimes(data)}>
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="hour" interval={0} />
          <YAxis />
          <Tooltip />
          <Line
            type="linear"
            dataKey="cnt"
            stroke="#a3467e                    "
            strokeWidth={2}
          />
        </LineChart>
      </CardContent>
    </Card>
  );
};
