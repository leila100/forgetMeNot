import React, { useState } from "react";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { Messages } from "../../styles/messagesStyles";
import MessagesOnDate from "./MessagesOnDate";

const PurpleSwitch = withStyles({
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
  }
});

const MessagesList = ({ dates, row, updateMessage, deleteMessage, classes }) => {
  const [sent, setSent] = useState(true);
  const handleChange = e => {
    setSent(e.target.checked);
  };

  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={<PurpleSwitch checked={sent} onChange={handleChange} value='sent' />}
          label='Show sent messages'
          classes={{ root: classes.root, label: row ? classes.label : classes.otherLabel }}
        />
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
          />
        ))}
      </Messages>
    </>
  );
};

export default withStyles(styles)(MessagesList);
