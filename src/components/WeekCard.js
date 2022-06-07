import { Card, CardContent, Typography } from "@material-ui/core";
import dayjs from "dayjs";

function getWeeksCalls(data) {
  let callCount = 0;

  for (const [sid, execution] of data.entries()) {
    let d = dayjs(execution.start.date_created);
    let now = dayjs();

    callCount += d.isoWeek === now.isoWeek ? 1 : 0;
  }

  return callCount;
}

export default ({ data }) => {
  return (
    <Card sx={{ p: 5 }}>
      <CardContent align="center" style={{ backgroundColor: "#ecedf1" }}>
        <Typography variant="h5" color="textPrimary">
          {getWeeksCalls(data)}
        </Typography>
        <Typography sx={{ fontSize: 10 }} color="textSecondary">
          Calls this week
        </Typography>
      </CardContent>
    </Card>
  );
};
