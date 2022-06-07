import { Card, CardContent, Typography } from "@material-ui/core";
import { getCallLength } from "../utils";

function getAvgCallLength(data) {
  let length = 0;
  let totallength = 0;
  let cnt = 0;

  for (const [sid, execution] of data.entries()) {
    length = getCallLength(execution);

    totallength += length !== -1 ? length : 0;
    cnt += 1;
  }

  const avg = Math.floor(totallength / cnt);

  return [Math.floor(avg / 60), Math.floor(avg % 60)];
}

export default ({ data }) => {
  const avgCallLength = getAvgCallLength(data);

  return (
    <Card sx={{ p: 5 }}>
      <CardContent align="center" style={{ backgroundColor: "#ecedf1" }}>
        <Typography variant="h5" color="textPrimary">
          {`${avgCallLength[0]}m${avgCallLength[1]}s`}
        </Typography>
        <Typography sx={{ fontSize: 10 }} color="textSecondary">
          Average call duration
        </Typography>
      </CardContent>
    </Card>
  );
};
