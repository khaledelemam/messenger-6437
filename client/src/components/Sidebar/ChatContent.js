import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    letterSpacing: -0.17,
    fontWeight: props => props.conversation.notRead > 0 
    ? 'bold'
    :'',
    color: props => props.conversation.notRead > 0 
    ? 'black'
    : "#9CADC8"
  },
}));

const ChatContent = (props) => {
  const classes = useStyles(props);
  
  const { conversation } = props;
  const { latestMessageText, otherUser} = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatContent;
