import { Card, CardContent, Typography } from "@material-ui/core";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import _ from "lodash";

function getTopCallers(data) {
  let result = [];
  const callers = _.groupBy(
    Array.from(data.values()),
    (i) => i.start.contact_channel_address
  );

  for (const [caller, executions] of Object.entries(callers)) {
    result.push({ caller: caller, cnt: executions.length });
  }

  return result.sort((a, b) => b.cnt - a.cnt).slice(0, 5);
}

export default ({ data }) => {
  return (
    <Card sx={{ p: 2 }}>
      <CardContent align="center">
        <Typography variant="h6" color="textPrimary">
          Top callers
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Numbers most frequently calling the IVR
        </Typography>
        <BarChart width={300} height={300} data={getTopCallers(data)}>
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="caller" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="cnt" fill="#7b447d" />
        </BarChart>
      </CardContent>
    </Card>
  );
};
