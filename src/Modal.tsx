import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Event } from "./Model";
import { enGB } from "date-fns/locale";
import { DatePicker } from "react-nice-dates";
import "react-nice-dates/build/style.css";

import "./styles/modal.css";

const Modal = ({
  showModal,
  setShowModal,
  eventList,
  showEvent,
  setShowEvent,
  event,
  setEvent
}: {
  showModal: any;
  setShowModal: any;
  eventList: Array<Event>;
  showEvent:boolean;
  setShowEvent:any;
  event:Event;
  setEvent:any;
}) => {
  const id = !!event?event.id:eventList.length;
  const [title, setTitle] = useState(event.title);
  const [start, setStart] = useState(event.start);
  const [end, setEnd] = useState(event.end);
  const [allDay, setAllDay] = useState(event.allDay);
  
  const test = () => {
    const addEvent = {
      id: id,
      title: title,
      start: start,
      end: end,
      allDay: allDay,
    } as Event;
    eventList.push(addEvent);
    setShowModal(false);
    setShowEvent(false);
    setEvent({})
    console.log(eventList)
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const disabled=showEvent;
  // let props : any
  // let inputEvent={
  //   title:""
  // } as Event;
  return showModal||showEvent
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="overlay" />
          <div className="modal">
          <button
              className="modal-close"
              type="button"
              onClick={() => {
                setShowModal(false)
                setShowEvent(false)
                setEvent({})
              }}
            >
              X
            </button>
            <div className="modal-body">
              <p>
                <input name="title" onChange={onChange} value={title} disabled={disabled} />
                <DatePicker
                  date={start}
                  onDateChange={(date) => {
                    date && setStart(date as any);
                  }}
                  locale={enGB}
                  format="yyyy-MM-dd"
                >
                  {({ inputProps, focused }) => (
                    <input
                      className={"input" + (focused ? " -focused" : "")}
                      {...inputProps}
                      disabled={disabled}
                    />
                  )}
                </DatePicker>
                <DatePicker
                  date={end}
                  onDateChange={(date) => {
                    date && setEnd(date as any);
                  }}
                  locale={enGB}
                  format="yyyy-MM-dd"
                >
                  {({ inputProps, focused }) => (
                    <input
                      className={"input" + (focused ? " -focused" : "")}
                      {...inputProps}
                      disabled={disabled}
                    />
                  )}
                </DatePicker>
                Hello, I'm a modal.
              </p>
            </div>
            {!disabled&&<button
              // className="modal-close"
              type="button"
              onClick={test}
            >
              test
            </button>}
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};

export default Modal;
