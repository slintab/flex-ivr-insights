import { Card, CardContent, Typography } from "@material-ui/core";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { getTerminationStep } from "../utils";

function getTopTerminationSteps(data) {
  const termMap = new Map();
  const result = [];
  let finalStep = null;

  for (const [sid, execution] of data.entries()) {
    finalStep = getTerminationStep(execution);
    if (finalStep === null) {
      continue;
    } else if (!termMap.has(finalStep)) {
      termMap.set(finalStep, 1);
    } else {
      termMap.set(finalStep, termMap.get(finalStep) + 1);
    }
  }

  termMap.forEach((value, key) => {
    result.push({ step: key, cnt: value });
  });

  return result.sort((a, b) => b.cnt - a.cnt).slice(0, 5);
}

export default ({ data }) => {
  return (
    <Card sx={{ p: 2 }}>
      <CardContent align="center">
        <Typography variant="h6" color="textPrimary">
          Top termination steps
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Steps most frequently causing the flow to end
        </Typography>
        <BarChart width={300} height={300} data={getTopTerminationSteps(data)}>
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="step" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="cnt" fill="#c84a77" />
        </BarChart>
      </CardContent>
    </Card>
  );
};
