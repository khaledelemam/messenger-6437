import React from "react";
import { Box, Typography } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat} from "../../store/activeConversation";
import { readMessages } from "../../store/utils/thunkCreators";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab"
    },
  },
  number : {
    background: "#3A8DFF",
    padding: 5,
    borderRadius: 14,
    fontSize: 12,
    height : 28,
    width: 28,
    fontWeight: "bold",
    textAlign:"center", 
    color: "white", 
    position: "relative",
    right: 20
  }
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation } = props;
  const { otherUser, notRead , id} = conversation;

  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation.otherUser.username);
    const reqBody = {
      recipientId: otherUser.id,
      conversationId: id ? id : null
    };
    await props.readMessages(reqBody);
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
        dot = {true}
      />
      <ChatContent conversation={conversation} />
      {notRead > 0 && <Typography className ={classes.number}> {notRead} </Typography>}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    readMessages: (body) => {
      dispatch(readMessages(body));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
