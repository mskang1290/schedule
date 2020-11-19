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
  // const id = !!event?event.id:eventList.length;
  // const [title, setTitle] = useState(event.title);
  // const [start, setStart] = useState(event.start);
  // const [end, setEnd] = useState(event.end);
  // const [allDay, setAllDay] = useState(event.allDay);
  const id = showEvent ? event.id : eventList.length;
  const [title, setTitle] = useState(showEvent ? event.title : "");
  const [start, setStart] = useState(
    showEvent ? event.start : moment().format("YYYY-MM-DDTHH:mm")
  );
  const [end, setEnd] = useState([]);
  const [date, setDate]=useState({
    start:showEvent ? event.start||'' : moment().format("YYYY-MM-DDTHH:mm"),
    end:showEvent ? event.end||'' : moment().format("YYYY-MM-DDTHH:mm")
  })
  // const [end, setEnd] = useState(showEvent ? event.end : moment().format("YYYY-MM-DDTHH:mm"));
  const [allDay, setAllDay] = useState(showEvent ? event.allDay : false);
    console.log(moment().format("YYYY-MM-DDTHH:mm"))
    const test2=(e:any)=>{
      const {name, value}=e.target
      // const name=e.target.name as string
      // updateDate[name]=e.target.value as string|undefined
      console.log(e.target)
      setDate({...date, [name]:value} )
    }

  const classes = useStyles();
  const test = () => {
    // const a="asdf";
    // a.replace('T')
    const addEvent = {
      id: id,
      title: title,
      start: new Date(date.start),
      end: new Date(date.end),
      allDay: allDay,
    } as unknown as Event;
    eventList.push(addEvent);
    setShowModal(false);
    setShowEvent(false);
    setEvent({});
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onDateChange = (date: any) => {
    date && setStart(date as any);
  };

  const disabled = showEvent;
  return showModal || showEvent ? (
    // ? ReactDOM.createPortal(
    <div>
      {/* <React.Fragment> */}
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
              // defaultValue={start}
              name="start"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              value={date.start}
            />
            <TextField
              id="datetime-local"
              label="Next appointment"
              type="datetime-local"
              // defaultValue={end}
              // defaultValue="2017-05-24T10:30"
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
            // className="modal-close"
            type="button"
            onClick={test}
          >
            test
          </button>
        )}
      </div>
      {/* </React.Fragment>, */}
      {/* document.body */}
    </div>
  ) : null;
};

export default Modal;
