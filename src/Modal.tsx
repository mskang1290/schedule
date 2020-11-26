import React, { useState } from "react";
import { Event } from "./Model";
import "react-nice-dates/build/style.css";
import axios from "axios";

import "./styles/modal.css";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import Const from "./const/const";
import Api from "./api/api";

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
  const [input, setInput] = useState({
    title: event.title || "",
    name: event.name || "",
  });
  const [date, setDate] = useState({
    start:
      moment(event.start).format("YYYY-MM-DDTHH:mm") ||
      moment().format("YYYY-MM-DDTHH:mm"),
    end:
      moment(event.end).format("YYYY-MM-DDTHH:mm") ||
      moment().format("YYYY-MM-DDTHH:mm"),
  });

  const [allDay, setAllDay] = useState(showEvent ? event.allDay : false);

  const test2 = (e: any) => {
    const { name, value } = e.target;

    if (name === "start") {
      new Date(value);
    }

    setDate({ ...date, [name]: value });
  };

  const classes = useStyles();
  const addEvent = async () => {
    if (!input.title || !input.name) {
      alert("title, nameを入力してください");
      return;
    }
    let id = -1;
    let idCheckFL = false;
    eventList.forEach((event) => {
      if (!idCheckFL) {
        if (event.name === input.name && typeof event.id !== "undefined") {
          id = event.id;
          idCheckFL = true;
        } else {
          if (typeof event.id !== "undefined" && id < event.id) {
            id = event.id;
          }
        }
      }
    });

    const event = ({
      id: idCheckFL ? id : id + 1,
      title: input.title,
      start: new Date(date.start.replace("T", " ")),
      end: new Date(date.end.replace("T", " ")),
      allDay: allDay,
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
    });
    setEvent({});
  };
  const updateEvent = async () => {
    if (!input.title || !input.name) {
      alert("title, nameを入力してください");
      return;
    }

    if (input === event) {
      alert("変更内容がありません。");
      return;
    }
    let id = -1;
    let idCheckFL = false;
    eventList.forEach((event) => {
      if (!idCheckFL) {
        if (event.name === input.name && typeof event.id !== "undefined") {
          id = event.id;
          idCheckFL = true;
        } else {
          if (typeof event.id !== "undefined" && id < event.id) {
            id = event.id;
          }
        }
      }
    });

    const param = ({
      id: idCheckFL ? id : id + 1,
      title: input.title,
      start: new Date(date.start.replace("T", " ")),
      end: new Date(date.end.replace("T", " ")),
      allDay: allDay,
      resource: "test1234",
      name: input.name,
    } as unknown) as Event;
    eventList.push(param);

    setShowModal(false);
    setShowEvent(false);

    await Api.post(Const.api.addEvent, param);

    refetch();
    setEvent({});
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const disabled = showEvent;
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
              value={input.title}
              disabled={disabled}
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
              value={date.start}
              disabled={disabled}
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
              disabled={disabled}
            />
          </p>
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
