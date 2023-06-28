import { Box, Typography } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

const Welcome = () => {
  const classes = {
    welcome: {
      height: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  };
  return (
    <Box sx={classes.welcome}>
      <QuestionAnswerIcon color="primary" sx={{ fontSize: "80px" }} />
      <Typography variant="h2" sx={{ fontWeight: "bold" }} color="primary">
        Welcome to Chatty
      </Typography>
      <Typography variant="h5">
        Start communicating by selecting, joining or creating a new room.
      </Typography>
    </Box>
  );
};

export default Welcome;
