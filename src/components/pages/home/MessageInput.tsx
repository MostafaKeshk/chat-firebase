import { Box, TextField, Tooltip, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

type IProps = {
  messageText: string;
  setMessageText: (value: string) => void;
  handleSend: any;
};

const MessageInput: React.FC<IProps> = ({
  messageText,
  setMessageText,
  handleSend,
}) => {
  return (
    <Box sx={{ display: "flex" }}>
      <TextField
        size="small"
        fullWidth
        value={messageText}
        onChange={(e: any) => setMessageText(e.target.value)}
      />

      <Tooltip title="Send">
        <IconButton
          onClick={handleSend}
          sx={{ ml: 0.5 }}
          disabled={!messageText}
        >
          <SendIcon color="primary" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default MessageInput;
