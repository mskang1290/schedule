import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Event } from "./Model";
// import './styles/transitions.css'
import "./styles/modal.css";
import Modal from "./Modal";
import "./App.css";

// 何の機能か分からない
const localizer = momentLocalizer(moment);
// const eventList = [
// {
//   id: 0,
//   title: 'All Day Event very long title',
//   allDay: true,
//   start: new Date('2020-03-01'),
//   end: new Date('2020-03-01'),
// },
// {
//   id: 1,
//   title: 'Long Event',
//   allDay: false,
//   start: new Date('2020-03-07 15:00'),
//   end: new Date('2020-03-07 17:00'),
// }
// ] as Array<Event>;

let Atest: Views = {
  MONTH: "month",
  WEEK: "week",
  WORK_WEEK: "work_week",
  DAY: "day",
  AGENDA: "agenda",
};

const Sample = ({ eventList }: { eventList: Array<Event> }) => {
  console.log(new Date())
  // const {isShowing, toggle} = useModal(false);
  // const [show, setShow] = useState(false)
  //   render() {
  const [showModal, setShowModal] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const [event, setEvent] = useState({} as Event);
const test=()=>{

  return new Date()
}

  useEffect(() => {
    setEvent({})
      },[showEvent])
  return (
    <>
      <div className="App">
        <Calendar
          localizer={localizer} //????
          events={eventList}　//event add
          // timeslots={2}
          // defaultView={Atest.MONTH}
          // onSelectEvent={(event) => setShowEvent(true)}
          style={{ height: 500 }} //calendarのstyle
          // getNow={test}
          // date={new Date(moment().add(1,"day").format())}
        />
      </div>
      <div className="modal">
        <Modal 
        showModal={showModal} 
        setShowModal={setShowModal} 
        eventList={eventList} 
        showEvent={showEvent} 
        setShowEvent={setShowEvent} 
        event={event}
        setEvent={setEvent}/>
      </div>
        <button className="button-default" onClick={() => setShowModal(!showModal)}>
          addTime
        </button>
    </>
  );
  //   }
};

export default Sample;
