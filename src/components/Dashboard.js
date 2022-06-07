import React, { useEffect } from "react";

import { Grid, Box } from "@material-ui/core";

import IvrInsightsAppBar from "./IvrInsightsAppBar";
import OngoingCard from "./OngoingCard";
import TodayCard from "./TodayCard";
import WeekCard from "./WeekCard";
import CallLengthCard from "./CallLengthDuration";
import FrequencyCard from "./FrequencyCard";
import TopCallersCard from "./TopCallersCard";
import CallTimesCard from "./CallTimesCard";
import TerminationCard from "./TerminationCard";
import ExecutionTableCard from "./ExecutionTableCard";

import { Execution } from "../utils";

export default () => {
  const [executionMap, setExecutionMap] = React.useState(new Map());

  useEffect(() => {
    async function fetchDashboardData() {
      let executionData = [];

      //ADD YOUR DATA RETRIEVAL LOGIC HERE
      // Example for retrieving data via an API
      // const url = "https://your_url.com/api";
      // const sampleData = await axios.get(url);
      //see `sampleData.json` for the expected data shape

      // DO NOT EDIT AFTER THIS LINE
      executionData.forEach((item) => {
        const executionSid = item["data"]["execution_sid"];

        if (!executionMap.get(executionSid)) {
          setExecutionMap(
            new Map(executionMap.set(executionSid, new Execution()))
          );
        }

        const exec = executionMap.get(executionSid);

        switch (item.type) {
          case "com.twilio.studio.flow.execution.started":
            exec.start = item.data;
            break;

          case "com.twilio.studio.flow.step.ended":
            exec.steps.push(item.data);
            break;

          case "com.twilio.studio.flow.execution.ended":
            exec.end = item.data;
            break;
        }
      });
    }

    console.log("Useeffect render");

    fetchDashboardData();
  }, []);

  return (
    <Box overflow="auto" sx={{ width: "100%" }}>
      <IvrInsightsAppBar />
      <Grid container spacing={2} alignContent="center" justify="space-around">
        <Grid item xs={3}>
          <Box sx={{ p: 3 }}>
            <OngoingCard data={executionMap} />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ p: 3 }}>
            <TodayCard data={executionMap} />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ p: 3 }}>
            <WeekCard data={executionMap} />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ p: 3 }}>
            <CallLengthCard data={executionMap} />
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Box sx={{ p: 1 }}>
            <FrequencyCard data={executionMap} />
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box sx={{ p: 1 }}>
            <TopCallersCard data={executionMap} />
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Box sx={{ p: 1 }}>
            <CallTimesCard data={executionMap} />
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box sx={{ p: 1 }}>
            <TerminationCard data={executionMap} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ p: 1 }}>
            <ExecutionTableCard data={executionMap} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
