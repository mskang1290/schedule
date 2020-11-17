import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Event } from "./Model";
import { enGB } from "date-fns/locale";
import { DatePicker } from "react-nice-dates";
import "react-nice-dates/build/style.css";
// import './App.css';

import "./styles/modal.css";

const Modal = ({
  show,
  setShow,
  eventList,
}: {
  show: any;
  setShow: any;
  eventList: Array<Event>;
}) => {
  const id = eventList.length;
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [allDay, setAllDay] = useState(false);
  const test = () => {
    const event = {
      id: id,
      title: title,
      start: start,
      end: end,
      allDay: allDay,
    } as Event;
    eventList.push(event);
    setShow(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  // let props : any
  // let inputEvent={
  //   title:""
  // } as Event;
  return show
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="overlay" />
          <div className="modal">
            <button
              className="modal-close"
              type="button"
              onClick={() => setShow(false)}
            >
              X
            </button>
            <div className="modal-body">
              <p>
                <input name="title" onChange={onChange} />
                <DatePicker
                  date={start}
                  onDateChange={(date) => {
                    date && setStart(date);
                  }}
                  locale={enGB}
                  format="dd/MM/yyyy HH:mm"
                >
                  {({ inputProps, focused }) => (
                    <input
                      className={"input" + (focused ? " -focused" : "")}
                      {...inputProps}
                    />
                  )}
                </DatePicker>
                <DatePicker
                  date={end}
                  onDateChange={(date) => {
                    date && setEnd(date);
                  }}
                  locale={enGB}
                  format="dd/MM/yyyy HH:mm"
                >
                  {({ inputProps, focused }) => (
                    <input
                      className={"input" + (focused ? " -focused" : "")}
                      {...inputProps}
                    />
                  )}
                </DatePicker>
                Hello, I'm a modal.
              </p>
            </div>
            <button
              // className="modal-close"
              type="button"
              onClick={test}
            >
              test
            </button>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};

export default Modal;
