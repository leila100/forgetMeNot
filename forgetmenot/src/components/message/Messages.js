import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import requireAuth from "../../hoc/requireAuth";
import { Button, Error } from "../../styles/commonStyles";
import { MessageIcon, Preview } from "../../styles/messagesStyles";
import { typeImages } from "../../utils/typeImages";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#4C688F",
    color: theme.palette.common.white,
    fontSize: 14,
    [theme.breakpoints.down("xs")]: {
      fontSize: 13,
      padding: "6px 3px",
    },
  },
  body: {
    fontSize: 14,
    [theme.breakpoints.down("xs")]: {
      fontSize: 13,
      padding: "6px 3px",
    },
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    cursor: "pointer",
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "1.6rem",
  },
  cancel: {
    fontSize: "1.6rem",
    color: "#4c688f",
  },
  delete: {
    fontSize: "1.6rem",
    color: "red",
  },
  table: {
    minWidth: 500,
  },
  container: {
    maxWidth: 1500,
    margin: "auto",
    marginTop: "50px",
  },
  img: {
    width: "20px",
  },
  icon: {
    fontSize: "1.5rem",
  },
  sent: {
    color: "red",
  },
  notSent: {
    color: "black",
  },
  invisible: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const Messages = ({ messages, onDelete, onMessageClick, history, setError }) => {
  useEffect(() => {
    setError();
  }, [setError]);

  const user = useSelector((state) => state.usersReducer).currentUser;

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [detailOpen, setDetailOpen] = React.useState(false);
  const [id, setId] = React.useState(null);
  const [updateMessage, setUpdateMessage] = React.useState(null);

  const handleClickOpen = (messageId) => {
    setOpen(true);
    setId(messageId);
  };

  const handleDetailOpen = (message) => {
    setDetailOpen(true);
    setUpdateMessage(message);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDetailClose = () => {
    setDetailOpen(false);
  };

  const deleteMessageHandler = () => {
    onDelete(id);
    handleClose();
  };

  const onClickHandler = () => {
    onMessageClick(updateMessage);
    history.push("/");
  };

  return (
    <>
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} size='small' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <StyledTableCell align='right'>
                <i className={`far fa-trash-alt ${classes.icon}`} />
              </StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align='left'>Date</StyledTableCell>
              <StyledTableCell align='left'>Message</StyledTableCell>
              <StyledTableCell align='left' className={classes.invisible}>
                Email
              </StyledTableCell>
              <StyledTableCell align='left' className={classes.invisible}>
                Type
              </StyledTableCell>
              <StyledTableCell align='left'>Sent</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages &&
              messages.map((row) => (
                <StyledTableRow key={row.id} onClick={() => handleDetailOpen(row)}>
                  <StyledTableCell align='left'>
                    <MessageIcon
                      id='delete'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClickOpen(row.id);
                      }}
                    >
                      <i className='far fa-trash-alt' />
                    </MessageIcon>
                  </StyledTableCell>
                  <StyledTableCell component='th' scope='row'>
                    {row.recipientName}
                  </StyledTableCell>
                  <StyledTableCell align='left'>{moment(row.date).format("DD-MMM-YYYY HH:mm")}</StyledTableCell>
                  <StyledTableCell align='left'>{row.messageText.slice(0, 10)}...</StyledTableCell>
                  <StyledTableCell align='left' className={classes.invisible}>
                    {row.recipientEmail}
                  </StyledTableCell>
                  <StyledTableCell align='left' className={classes.invisible}>
                    <img src={typeImages[row.type]} alt={row.type} className={classes.img} />
                  </StyledTableCell>
                  <StyledTableCell align='left'>
                    <i className={`fa fa-check ${row.sent ? classes.sent : classes.notSent}`} />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-description' classes={{ root: classes.root }}>
            Are you sure you want to delete this message?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={deleteMessageHandler} autoFocus delete>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={detailOpen} onClose={handleDetailClose}>
        <DialogContent classes={{ root: classes.root }}>
          {updateMessage && (
            <>
              <Preview>
                <img src={typeImages[updateMessage.type]} alt={`Theme ${updateMessage.type}`} />
                <div>
                  <div>To: {updateMessage.recipientName}</div>
                  {user && <div>From: {user.username}</div>}
                  <p>{updateMessage.messageText}</p>
                </div>
              </Preview>
              {updateMessage.sent && <Error>Message was already sent. Can not update it.</Error>}
            </>
          )}
          <DialogActions>
            <Button onClick={handleDetailClose}>Cancel</Button>
            <Button onClick={onClickHandler} autoFocus delete disabled={updateMessage && updateMessage.sent}>
              Update
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default requireAuth(Messages);
