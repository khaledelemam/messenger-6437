import { sendReadMessage , saveReadMessages}  from "./thunkCreators";

export const addMessageToStore = (state, payload) =>{
  const { message, sender, activeConv , user} = payload;
  // if sender isn't  null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
      notRead: 0
    };
    newConvo.latestMessageText = message.text;
    newConvo.notRead += 1;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      // return new state instead of mutating current state
      const convoCopy = {...convo};
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      // instantly show unread message icon when both users are online and chat is not active
      if (convo.otherUser.username !== activeConv){
        convoCopy.notRead += 1;
      }
      // instanly read message when both users are online and chat is active
      else if (message.senderId !== user.id){
        const reqBody = {
          recipientId: message.senderId,
          conversationId: convo.id
        };
        saveReadMessages(reqBody);
        sendReadMessage(message.senderId, convo.id)
        readAllMessages(state, {recipientID: message.senderId, conversationID: convo.id})
      }
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      // return new state instead of mutating current state
      const convoCopy = {...convo};
      convoCopy.id = message.conversationId;
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const readAllMessages = (state, payload) => {
  const {recipientID, conversationID} = payload
  return state.map((convo) => {
    if ((convo.id === conversationID)) {
      const convoCopy = {...convo};
      // as an optimization going forward: flag the new messages so only loop through them
      convoCopy.messages.forEach((message) => {
        if ((message.senderId === recipientID)) {
          message.isRead = true;
          convoCopy.notRead = 0; 
          }
         if (message.isRead){
          convoCopy.lastReadId = message.id;
        }
      } );
      return convoCopy;
    } else {
      return convo;
    }
  });
};