import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Event } from "./Model";
import "./styles/modal.css";
import Modal from "./Modal";
import "./App.css";

// 何の機能か分からない
const localizer = momentLocalizer(moment);

let Atest: Views = {
  MONTH: "month",
  WEEK: "week",
  WORK_WEEK: "work_week",
  DAY: "day",
  AGENDA: "agenda",
};

const Sample = ({ eventList }: { eventList: Array<Event> }) => {
  const [showModal, setShowModal] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const [event, setEvent] = useState({
    id: undefined,
    title: "",
    start: undefined,
    end: undefined,
    allDay: false,
    resource: "",
  } as Event);
  const test = () => {
    return new Date();
  };

  useEffect(() => {
    setEvent({});
  }, [showEvent]);
  return (
    <>
      <div className="App">
        <Calendar
          localizer={localizer} //????
          events={eventList} //event add
          // timeslots={2}
          // defaultView={Atest.MONTH}
          onSelectEvent={(event: Event) => {
            setEvent(event);
            setShowEvent(true);
          }}
          style={{ height: 500 }} //calendarのstyle
          // getNow={test}
          // date={new Date(moment().add(1,"day").format())}
          // resources={[{name:"test1"},{name:"test2"},{name:"test3"}]}
          formats={{ monthHeaderFormat: "YYYY-MM" }}
        />
      </div>
      {(showModal || showEvent) && (
        <div className="modal">
          <Modal
            setShowModal={setShowModal}
            eventList={eventList}
            showEvent={showEvent}
            setShowEvent={setShowEvent}
            event={event}
            setEvent={setEvent}
          />
        </div>
      )}
      <button
        className="button-default"
        onClick={() => {
          setEvent({});
          setShowModal(!showModal);
        }}
      >
        addTime
      </button>
    </>
  );
};

export default Sample;
