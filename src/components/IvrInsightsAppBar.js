import { AppBar, Toolbar, Typography } from "@material-ui/core";

export default () => {
  return (
    <AppBar position="static" color="inherit">
      <Toolbar variant="dense">
        <Typography type="title" color="inherit">
          IVR Insights
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
