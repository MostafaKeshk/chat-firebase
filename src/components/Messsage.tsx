import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { viewDate } from "../utils/viewDate";
import { useAuth } from "../contexts/AuthContext";

type IProps = {
  message: any;
};

// .talk-bubble {
//     margin: 40px;
//     display: inline-block;
//     position: relative;
//     width: 200px;
//     height: auto;
//     background-color: blue;
//   }

//   .triangle.left-top:after {
//     content: ' ';
//     position: absolute;
//     width: 0;
//     height: 0;
//     left: -20px;
//     right: auto;
//     top: 0px;
//     bottom: auto;
//     border: 22px solid;
//     border-color: blue transparent transparent transparent;
//   }

//   .triangle.right-top:before {
//       content: ' ';
//       position: absolute;
//       width: 0;
//       height: 0;
//       left: auto;
//       right: -20px;
//       top: 0;
//       bottom: auto;
//       border: 32px solid;
//       border-color: blue transparent transparent transparent;
//   }

//   <div class="talk-bubble triangle left-top">
//     <div class="talktext">
//       <p>Left flush at the top.</p>
//     </div>
//   </div>

//   <div class="talk-bubble triangle right-top">
//     <div class="talktext">
//       <p>Right flush at the top.</p>
//     </div>
//   </div>

const Message: React.FC<IProps> = ({ message }) => {
  const theme = useTheme();
  const { user } = useAuth();
  const classes = {
    self: {
      backgroundColor: theme.palette.primary.main,
      p: 1,
      maxWidth: "250px",
      height: "auto",
      wordWrap: "break-word",
      position: "relative",
      marginRight: "10px",
      borderRadius: "10px 0 10px 10px",
      "&:before": {
        content: '""',
        position: "absolute",
        width: 0,
        height: 0,
        left: "auto",
        right: "-10px",
        zIndex: "-1",
        top: 0,
        bottom: "auto",
        border: "10px solid",
        borderColor: `${theme.palette.primary.main} transparent transparent transparent`,
      },
    },
    others: {
      backgroundColor: theme.palette.secondary.main,
      p: 1,
      maxWidth: "250px",
      height: "auto",
      wordWrap: "break-word",
      position: "relative",
      marginLeft: "10px",
      borderRadius: "0 10px 10px 10px",

      "&:after": {
        content: '""',
        position: "absolute",
        width: 0,
        height: 0,
        righr: "auto",
        left: "-10px",
        zIndex: "-1",
        top: 0,
        bottom: "auto",
        border: "10px solid",
        borderColor: `${theme.palette.secondary.main} transparent transparent transparent`,
      },
    },

    selfContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "self-end",
    },
    othersContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "self-start",
    },
  };
  const isSelf = user.uid === message.uid;

  return (
    <Box sx={isSelf ? classes.selfContainer : classes.othersContainer}>
      {!isSelf && <Typography variant="subtitle1">{message.name}</Typography>}
      <Box sx={isSelf ? classes.self : classes.others}>
        <Typography variant="body1">{message.text}</Typography>
      </Box>
      <Typography
        variant="subtitle2"
        sx={{ color: "#888", marginBottom: "8px" }}
      >
        {viewDate(message.createdAt.toDate())}
      </Typography>
    </Box>
  );
};

export default Message;
