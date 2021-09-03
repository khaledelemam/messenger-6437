import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import { BadgeAvatar} from "../Sidebar";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  let temp = 2;
  let flag = false;
  const len = messages.length
  return (
    <Box>
      {messages.map((message, index) => {
        const time = moment(message.createdAt).format("h:mm");

        // new conversation
        if ((index === 0 && !message.isRead)) {flag = true;}
        // already encoutered an unread message (new or existing conversations)
        if (flag) {temp = 2} 
        // first time encountering unread message in existing conversation
        else if (!message.isRead) {temp = 0; flag = true;}
        // all messages are read
        if ((index +1 === len) && message.isRead) {temp  = 1;}
        
        return message.senderId === userId ? (
          temp === 0 ? (
            <React.Fragment key={message.id}>
            <BadgeAvatar photoUrl={otherUser.photoUrl} dot ={false}/>
            <SenderBubble key={message.id} text={message.text} time={time} /> 
            </React.Fragment>
          ) :
          temp === 1 ? (
            <React.Fragment key={message.id}>
            <SenderBubble key={message.id} text={message.text} time={time} /> 
            <BadgeAvatar photoUrl={otherUser.photoUrl} dot ={false}/>
            </React.Fragment>
          )
          :  (<SenderBubble key={message.id} text={message.text} time={time} />)
    
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
    
        );
      })}
    </Box>
  );
};

export default Messages;
