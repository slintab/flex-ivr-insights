import React from "react";
import { FlexPlugin } from "@twilio/flex-plugin";
import { View } from "@twilio/flex-ui";

import Dashboard from "./components/Dashboard";
import DashboardSidebarItem from "./components/DashboardSidebarItem";

const PLUGIN_NAME = "FlexIvrInsightsPlugin";

export default class FlexIvrInsightsPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  async init(flex, manager) {
    flex.ViewCollection.Content.add(
      <View name="ivr-insights" key="ivr-insights">
        <Dashboard />
      </View>
    );
    flex.SideNav.Content.add(
      <DashboardSidebarItem key="IvrInsightsSideLink" />
    );
  }
}
