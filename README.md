# Studio IVR Insights for Twilio Flex

This repository contains the code for a Twilio Flex plugin for displaying IVR insights/data within your Flex cloud contact center.



## Design
![Architecture Diagram](architecture.png?raw=true)

This solution involves the following components:
- **Twilio Flex**: a Twilio Flex instance. (Flex is Twilio's  programmable cloud contact center platform, you can read more about it [here.](https://www.twilio.com/flex))
- **Studio flow**: the [IVR system](https://www.twilio.com/studio) we want to see insights for. Usually positioned in front of the contact center to collect details from the caller before they get transferred to a contact center agent.
- **Database**: holds the IVR execution data.
- **Event Streams**: streams IVR execution data to the database. More details [here.](https://www.twilio.com/event-streams)
- **IVR Insights Flex plugin**: displays a dashboard showing information related to the IVR executions.

Note: this repository only contains the code for the plugin. Configuring event streams, the database and the IVR will depend on your requirements. 




## Setup

1. [Configure](https://www.twilio.com/blog/twilio-studio-event-streams) Event Streams to forward Studio data into a destination of your choice. It is assumed you have a database in which the data can be stored.
2. Open the `/src/components/Dashboard.js` file and add your data retrieval logic inside the `fetchDashboardData()` function. 
Your execution data is expected to be an array consisting of the following object types:
    - `Studio.FlowStepEvent` - schema [here.](https://events-schemas.twilio.com/Studio.FlowStepEvent/1)
    - `Studio.FlowExecutionEvent` - schema [here.](https://events-schemas.twilio.com/Studio.FlowExecutionEvent/1)

    If you are using Event Streams, the data will be in this format by default.

3. Install the flex plugin using the `twilio flex:plugins:deploy` CLI command. Further details, including installing the Flex Plugin CLI can be found [here.](https://www.twilio.com/docs/flex/developer/plugins/cli/deploy-and-release)

    Note that the plugin requires React **16.13.1**. The instructions for updating the React version of your Flex instance can be found here.

4. That's it! Navigate to your Flex instance to see your new IVR dashboard. 

![Screenshot](demo.jpg?raw=true)