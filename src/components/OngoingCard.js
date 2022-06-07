import { Card, CardContent, Typography } from "@material-ui/core";

function getOngoingCalls(data) {
  let ongoingCalls = 0;

  for (const [sid, execution] of data.entries()) {
    ongoingCalls += 1;
    ongoingCalls -= execution.end !== null ? 1 : 0;
  }

  return ongoingCalls;
}

export default ({ data }) => {
  return (
    <Card sx={{ p: 5 }}>
      <CardContent align="center" style={{ backgroundColor: "#ecedf1" }}>
        <Typography variant="h5" color="textPrimary">
          {getOngoingCalls(data)}
        </Typography>
        <Typography sx={{ fontSize: 10 }} color="textSecondary">
          Ongoing calls
        </Typography>
      </CardContent>
    </Card>
  );
};
