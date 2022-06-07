import {
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Box,
} from "@material-ui/core";

import DataTable from "react-data-table-component";
import { Icon } from "@twilio/flex-ui";

import { ExecutionTableRow } from "../utils";

function getTableRows(data) {
  let rows = [];

  for (const [sid, execution] of data.entries()) {
    rows.push(new ExecutionTableRow(execution));
  }

  return rows;
}

const columns = [
  {
    name: "Execution Sid",
    selector: (row) => row.sid,
  },
  {
    name: "Start date",
    selector: (row) => row.start,
  },
  {
    name: "Caller",
    selector: (row) => row.caller,
  },
  {
    name: "Final step",
    selector: (row) => row.final,
  },
  {
    name: "Call duration",
    selector: (row) => row.duration,
  },
  {
    name: "Steps",
    selector: (row) => row.steps,
    omit: true,
  },
];

const StepStepper = ({ data }) => {
  data.steps.sort((a, b) => {
    return new Date(a["date_created"]) - new Date(b["date_created"]);
  });

  return (
    <Stepper connector={<Icon icon="ArrowRight" />}>
      {data.steps.map((i) => {
        return (
          <Step key={i["step_sid"]} active={true}>
            <StepLabel>{i["transitioned_to"]}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default ({ data }) => {
  return (
    <Card sx={{ p: 2 }}>
      <CardContent align="center">
        <DataTable
          title="List of IVR executions"
          striped={true}
          columns={columns}
          data={getTableRows(data)}
          expandableRows
          expandableRowsComponent={StepStepper}
        />
      </CardContent>
    </Card>
  );
};
