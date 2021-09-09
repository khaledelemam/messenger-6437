import React from "react";
import { Box, Badge, Avatar } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  profilePic: {
    height: 44,
    width: 44
  },
  badge: {
    height: 13,
    width: 13,
    borderRadius: "50%",
    border: "2px solid white",
    backgroundColor: "#D0DAE9",
  },
  online: {
    backgroundColor: "#1CED84"
  },
  sidebar: {
    marginLeft: 17

  },
  chat :{
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  chatprofilePic: {
    height: 30,
    width: 30

  }
}));

const UserAvatar = (props) => {
  const classes = useStyles();
  const { sidebar, username, photoUrl, online , dot} = props;

  return (
    <Box className={sidebar ? classes.sidebar : classes.chat}>
      <Badge
        classes={{ badge: `${classes.badge} ${online && classes.online}` }}
        variant = {dot ? "dot" : "standard"}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        overlap="circular">
        <Avatar alt={username} src={photoUrl} className={dot ? classes.profilePic :classes.chatprofilePic}></Avatar>
      </Badge>
    </Box>
  );
};

export default UserAvatar;
