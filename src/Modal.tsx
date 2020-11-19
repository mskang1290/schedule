import React, { useState } from "react";
import { Event } from "./Model";
import "react-nice-dates/build/style.css";

import "./styles/modal.css";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  })
);

const Modal = ({
  showModal,
  setShowModal,
  eventList,
  showEvent,
  setShowEvent,
  event,
  setEvent,
}: {
  showModal: any;
  setShowModal: any;
  eventList: Array<Event>;
  showEvent: boolean;
  setShowEvent: any;
  event: Event;
  setEvent: any;
}) => {
  const id = showEvent ? event.id : eventList.length;
  const [title, setTitle] = useState(showEvent ? event.title : "");
  const [date, setDate]=useState({
    start:showEvent ? event.start||'' : moment().format("YYYY-MM-DDTHH:mm"),
    end:showEvent ? event.end||'' : moment().format("YYYY-MM-DDTHH:mm")
  })
  const [allDay, setAllDay] = useState(showEvent ? event.allDay : false);
    console.log(moment().format("YYYY-MM-DDTHH:mm"))

    const test2=(e:any)=>{
      const {name, value}=e.target
      console.log(e.target)
      setDate({...date, [name]:value} )
    }

  const classes = useStyles();
  const test = () => {
    const addEvent = {
      id: id,
      title: title,
      start: new Date(date.start),
      end: new Date(date.end),
      allDay: allDay,
      resource:"test1234"
    } as unknown as Event;
    eventList.push(addEvent);
    setShowModal(false);
    setShowEvent(false);
    setEvent(null);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const disabled = showEvent;
  return showModal || showEvent ? (
    // ? ReactDOM.createPortal(
    <div>
      <div className="overlay" />
      <div className="modal">
        <button
          className="modal-close"
          type="button"
          onClick={() => {
            setShowModal(false);
            setShowEvent(false);
            setEvent({});
          }}
        >
          X
        </button>
        <div className="modal-body">
          <p>
            <input
              name="title"
              onChange={onChange}
              value={title}
              disabled={disabled}
            />
            <TextField
              id="datetime-local"
              label="Next appointment"
              type="datetime-local"
              name="start"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={test2}
              value={date.start}
            />
            <TextField
              id="datetime-local"
              label="Next appointment"
              type="datetime-local"
              name="end"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={test2}
              value={date.end}
            />
          </p>
        </div>
        {!disabled && (
          <button
            type="button"
            onClick={test}
          >
            test
          </button>
        )}
      </div>
    </div>
  ) : null;
};

export default Modal;
