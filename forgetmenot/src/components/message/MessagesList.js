import React, { useState } from "react";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { Messages } from "../../styles/messagesStyles";
import MessagesOnDate from "./MessagesOnDate";
import { BtnGroup, TypeBtn } from "../../styles/modalStyles";

const SentSwitch = withStyles({
  switchBase: {
    color: "grey",
    "&$checked": {
      color: "#B87A71"
    },
    "&$checked + $track": {
      backgroundColor: "#B87A71"
    }
  },
  checked: {},
  track: {}
})(Switch);

const styles = theme => ({
  root: {
    marginBottom: 10
  },
  otherLabel: {
    fontSize: "1.6rem",
    color: "#F3EEC3"
  },
  label: {
    fontSize: "1.6rem",
    color: "#4c688f"
  },
  family: {
    backgroundColor: "#b87a71",
    "&:clicked": {
      backgroundColor: "#284243"
    }
  },
  friend: {
    backgroundColor: "#4c688f"
  },
  work: {
    backgroundColor: "#ffff"
  },
  other: {
    backgroundColor: "#F3EEC3"
  },
  all: {
    backgroundColor: "#666680"
  }
});

const MessagesList = ({ dates, row, updateMessage, deleteMessage, classes }) => {
  const [sent, setSent] = useState(true);
  const [typeFilter, setTypeFilter] = useState("all");

  const handleSwitchChange = e => {
    setSent(e.target.checked);
  };

  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={<SentSwitch checked={sent} onChange={handleSwitchChange} value='sent' />}
          label='Show sent messages'
          classes={{ root: classes.root, label: row ? classes.label : classes.otherLabel }}
        />
      </FormGroup>
      <FormGroup>
        <BtnGroup>
          <TypeBtn className={classes.all} onClick={() => setTypeFilter("all")} clicked={typeFilter === "all"}>
            <i className='fas fa-users' /> All
          </TypeBtn>
          <TypeBtn className={classes.family} onClick={() => setTypeFilter("family")} clicked={typeFilter === "family"}>
            <i className='fas fa-home' /> Family
          </TypeBtn>
          <TypeBtn className={classes.friend} onClick={() => setTypeFilter("friend")} clicked={typeFilter === "friend"}>
            <i className='fas fa-user-friends' /> Friend
          </TypeBtn>
          <TypeBtn className={classes.work} onClick={() => setTypeFilter("work")} clicked={typeFilter === "work"}>
            <i className='fas fa-briefcase' /> Work
          </TypeBtn>
          <TypeBtn className={classes.other} onClick={() => setTypeFilter("other")} clicked={typeFilter === "other"}>
            <i className='fas fa-envelope' /> Other
          </TypeBtn>
        </BtnGroup>
      </FormGroup>
      <Messages>
        {dates.map((date, i) => (
          <MessagesOnDate
            date={date}
            row={row}
            key={i}
            updateMessage={updateMessage}
            deleteMessage={deleteMessage}
            showSent={sent}
            showType={typeFilter}
          />
        ))}
      </Messages>
    </>
  );
};

export default withStyles(styles)(MessagesList);
