import React, { useState } from "react";
import { Event } from "../model/Model";
import "react-nice-dates/build/style.css";
import axios from "axios";

import "../styles/modal.css";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import Const from "../const/const";
import Api from "../api/api";
import { Checkbox } from "@material-ui/core";

const api_url = Const.localhost;

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
  setShowModal,
  eventList,
  showEvent,
  setShowEvent,
  event,
  setEvent,
  refetch,
}: {
  setShowModal: any;
  eventList: Array<Event>;
  showEvent: boolean;
  setShowEvent: any;
  event: Event;
  setEvent: any;
  refetch: any;
}) => {
  let eventOrg = {} as Event;
  Object.assign(eventOrg, event);
  const disabled = showEvent;

  const [input, setInput] = useState({
    title: "",
    name: event.name || "",
  });
  const [date, setDate] = useState({
    start:
      // moment(event.start).format("YYYY-MM-DDTHH:mm") ||
      // moment().format("YYYY-MM-DDTHH:mm"):
      disabled ? "" : moment().format("YYYY-MM-DDTHH:mm"),
    end:
      // moment(event.end).format("YYYY-MM-DDTHH:mm") ||
      // moment().format("YYYY-MM-DDTHH:mm"),
      disabled ? "" : moment().format("YYYY-MM-DDTHH:mm"),
  });

  const [allDay, setAllDay] = useState(showEvent ? event.allDay : false);

  const test2 = (e: any) => {
    const { name, value } = e.target;
    setDate({ ...date, [name]: value });
  };

  const classes = useStyles();
  const addEvent = async () => {
    if (!input.title || !input.name) {
      alert("title, nameを入力してください");
      return;
    }

    const event = ({
      title: input.title,
      start: new Date(date.start.replace("T", " ")),
      end: new Date(date.end.replace("T", " ")),
      allDay: allDay ? 1 : 0,
      resource: "test1234",
      name: input.name,
    } as unknown) as Event;
    eventList.push(event);

    setShowModal(false);
    setShowEvent(false);

    await axios(api_url + Const.api.addEvent, {
      method: "POST",
      data: event,
      headers: new Headers(),
    })
      .then(({ data }) => {
        console.log(data);
      })
      .catch(({ reason }) => {
        console.log(reason);
      });
    refetch();
  };
  const updateEvent = async () => {
    let param = {
      id: event.id,
      title: input.title,
      start: new Date(date.start.replace("T", " ")),
      end: new Date(date.end.replace("T", " ")),
      allDay: allDay,
    } as Event;

    // eventList.push(event);

    setShowModal(false);
    setShowEvent(false);

    await Api.post(Const.api.updateEvent, param);

    refetch();
    setEvent({});
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  return (
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
            <label>name : </label>
            <input
              name="name"
              onChange={onChange}
              value={input.name}
              disabled={disabled}
            />
          </p>
          <p>
            <label>title : </label>
            <input
              name="title"
              onChange={onChange}
              defaultValue={event.title}
            />
          </p>
          <p>
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
              defaultValue={
                disabled
                  ? moment(event.start).format("YYYY-MM-DDTHH:mm")
                  : moment().format("YYYY-MM-DDTHH:mm")
              }
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
              defaultValue={
                disabled
                  ? moment(event.end).format("YYYY-MM-DDTHH:mm")
                  : moment().format("YYYY-MM-DDTHH:mm")
              }
            />
          </p>
          <Checkbox
            onChange={(e) => setAllDay(e.target.checked)}
            checked={disabled ? allDay : undefined}
          />
          allDay
        </div>
        {!disabled ? (
          <button type="button" onClick={addEvent}>
            登録
          </button>
        ) : (
          <button type="button" onClick={updateEvent}>
            変更
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
