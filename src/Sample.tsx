/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Event } from "./Model";
import "./styles/modal.css";
import Modal from "./Modal";
import "./App.css";
import Api from "./api/api";

// 何の機能か分からない
const localizer = momentLocalizer(moment);

const Atest: Views = {
  MONTH: "month",
  WEEK: "week",
  WORK_WEEK: "work_week",
  DAY: "day",
  AGENDA: "agenda",
};

const Sample = ({
  eventList,
  setEventList,
}: {
  eventList: Array<Event>;
  setEventList: any;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const [event, setEvent] = useState({} as Event);

  const [{ data, loading, error }, refetch] = Api.get();

  if (!!error) {
    alert(error.message);
  }

  if (loading) return <p>Loading...</p>;

  if(!!data){

    data.forEach((value:Event)=>{
      value.allDay=!!value.alldays
      value.start=new Date(moment(value.start).format("YYYY-MM-DD HH:mm:ss"))
      value.end=new Date(moment(value.end).format("YYYY-MM-DD HH:mm:ss"))
    })
    setEventList(data);
  }

  return (
    <>
      <div className="App">
        <Calendar
          localizer={localizer} //????
          events={eventList} //event add
          // timeslots={2}
          defaultView={Atest.MONTH}
          onSelectEvent={(event: Event) => {
            setEvent(event);
            setShowEvent(true);
          }}
          views={["month", "day", "agenda"]}
          // drilldownView="agenda"
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
            refetch={refetch}
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
