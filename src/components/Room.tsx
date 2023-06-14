import React, { forwardRef, Ref } from "react";
import { Box } from "@mui/material";

import Message from "./Messsage";
import ChatSvg from "../assets/svg/ChatSvg";

type IProps = {
  roomMessages: any;
};

type RoomRef = HTMLDivElement;

const Room: React.ForwardRefRenderFunction<RoomRef, IProps> = (
  { roomMessages },
  ref: Ref<RoomRef>
) => {
  return (
    <>
      {roomMessages.length > 0 ? (
        <Box sx={{ height: "80vh", overflow: "scroll", py: 1 }}>
          {roomMessages.map((message: any) => (
            <Message message={message} />
          ))}
          <Box ref={ref} />
        </Box>
      ) : (
        <ChatSvg />
      )}
    </>
  );
};

export default forwardRef<RoomRef, IProps>(Room);
