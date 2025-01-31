import { Box, Typography, Stack } from "@mui/material";
import { format, isEqual, startOfDay, add } from "date-fns";
import ChattingCard from "./ChattingCard";

const ChatHistoryCard = ({ details }) => {
  // Function to format the date for display
  const formatDate = (date) => {
    const today = startOfDay(new Date());

    if (isEqual(date, today)) {
      return "Today's chats";
    } else if (isEqual(today, add(date, { days: 1 }))) {
      return "Yesterday's chats";
    } else {
      return format(date, "do LLL yyyy");
    }
  };

  return (
    <Box p={2} bgcolor="primary.light" borderRadius={2}>
      {/* Display the formatted date */}
      <Typography variant="h6" fontWeight={700} mb={2}>
        {formatDate(new Date(details.datetime))}
      </Typography>

      {/* Render the chat items */}
      <Stack spacing={{ xs: 2, md: 3 }}>
        {details.chat.map((item, index) => (
          <ChattingCard details={item} readOnly={true} key={index} />
        ))}
      </Stack>

      {/* Display the timestamp of the chat */}
      <Typography variant="caption" color="text.secondary" mt={2}>
        {new Date(details.datetime).toLocaleString()}
      </Typography>
    </Box>
  );
};

export default ChatHistoryCard;
