import { Card, CardContent, Typography } from "@material-ui/core";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import _ from "lodash";

function getCallFrequency(data) {
  let callMap = new Map();
  let result = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const fmtD = d.toISOString().slice(0, 10);

    callMap.set(fmtD, 0);
  }

  const callsByDate = _.groupBy(Array.from(data.values()), (i) => {
    return new Date(i.start.date_created).toISOString().slice(0, 10);
  });

  for (const [date, executions] of Object.entries(callsByDate)) {
    if (!callMap.has(date)) {
      continue;
    }

    callMap.set(date, executions.length);
  }

  callMap.forEach((value, key) => {
    result.push({ date: key, cnt: value });
  });

  return result.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
}

export default ({ data }) => {
  return (
    <Card sx={{ p: 2 }}>
      <CardContent align="center">
        <Typography variant="h6" color="textPrimary">
          Call frequency
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Count of calls received by day
        </Typography>
        <BarChart data={getCallFrequency(data)} width={650} height={300}>
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="date" interval={0} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="cnt" fill="#485475" />
        </BarChart>
      </CardContent>
    </Card>
  );
};
