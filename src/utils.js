export function getCallLength(execution) {
  if (execution.end === null) {
    return -1;
  }

  const diff = Math.abs(
    new Date(execution.end.date_updated) -
      new Date(execution.start.date_created)
  );

  return Math.floor(Math.abs(diff) / 1000);
}

export function getTerminationStep(execution) {
  if (execution.end === null) {
    return null;
  }
  for (const step of execution.steps) {
    if (step["transitioned_to"] === "Ended") {
      return step["transitioned_from"];
    }
  }
  return null;
}

export class Execution {
  constructor() {
    this.start = null;
    this.end = null;
    this.steps = [];
  }
}

export class ExecutionTableRow {
  constructor(execution) {
    this.sid = "";
    this.start = "";
    this.caller = "";
    this.final = "";
    this.duration = "";
    this.steps = "";

    this.build(execution);
  }

  build(execution) {
    this.setSid(execution);
    this.setStart(execution);
    this.setCaller(execution);
    this.setFinal(execution);
    this.setDuration(execution);
    this.setSteps(execution);
  }

  setSid(execution) {
    this.sid = execution.start["execution_sid"];
  }

  setStart(execution) {
    this.start = execution.start["date_created"];
  }

  setCaller(execution) {
    this.caller = execution.start.contact_channel_address;
  }

  setFinal(execution) {
    const finalStep = getTerminationStep(execution);
    if (finalStep !== null) {
      this.final = finalStep;
    }
  }

  setDuration(execution) {
    const duration = getCallLength(execution);
    if (duration !== -1) {
      this.duration = `${Math.floor(duration / 60)}m${Math.floor(
        duration % 60
      )}s`;
    }
  }

  setSteps(execution) {
    this.steps = execution.steps;
  }
}
