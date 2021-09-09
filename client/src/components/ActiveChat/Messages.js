import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import { BadgeAvatar} from "../Sidebar";

const Messages = (props) => {
  const { messages, otherUser, userId ,lastReadId} = props;
  return (
    <Box>
      {messages.map((message, index) => {
        const time = moment(message.createdAt).format("h:mm");
        
        return message.senderId === userId ? (
          message.id === lastReadId ? (
            <>
            <SenderBubble key={message.id} text={message.text} time={time} /> 
            <BadgeAvatar photoUrl={otherUser.photoUrl} dot ={false}/>
            </>
            ) :
            (<SenderBubble key={message.id} text={message.text} time={time} />)
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
    
        );
      })}
    </Box>
  );
};

export default Messages;
