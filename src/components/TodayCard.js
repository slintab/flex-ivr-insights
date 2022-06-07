import { Card, CardContent, Typography } from "@material-ui/core";

function getTodaysCalls(data) {
  let callCount = 0;

  for (const [sid, execution] of data.entries()) {
    let d = new Date(execution.start.date_created).setHours(0, 0, 0, 0);
    let now = new Date().setHours(0, 0, 0, 0);

    callCount += d === now ? 1 : 0;
  }

  return callCount;
}

export default ({ data }) => {
  return (
    <Card sx={{ p: 5 }}>
      <CardContent align="center" style={{ backgroundColor: "#ecedf1" }}>
        <Typography variant="h5" color="textPrimary">
          {getTodaysCalls(data)}
        </Typography>
        <Typography sx={{ fontSize: 10 }} color="textSecondary">
          Calls today
        </Typography>
      </CardContent>
    </Card>
  );
};
