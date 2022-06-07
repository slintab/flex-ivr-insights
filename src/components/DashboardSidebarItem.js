import { SideLink, Actions } from "@twilio/flex-ui";

export default ({ activeView }) => {
  return (
    <SideLink
      showLabel={true}
      icon="Dashboard"
      iconActive="DashboardBold"
      isActive={activeView === "ivr-insights"}
      onClick={() => {
        Actions.invokeAction("NavigateToView", { viewName: "ivr-insights" });
      }}
    >
      IVR Insights
    </SideLink>
  );
};
