import React, { Component, useState } from "react";
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Event } from "./Model";
// import './styles/transitions.css'
import './App.css';

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
 
let Atest:Views={
    MONTH:"month",
    WEEK:"week",
    WORK_WEEK:"work_week",
    DAY:"day",
    AGENDA:"agenda"
};


const Sample=({
  show,
  setShow,
  eventList,
}: {
  show: any;
  setShow: any;
  eventList: Array<Event>;
})=> {
    // const {isShowing, toggle} = useModal(false);
    // const [show, setShow] = useState(false)
//   render() {
    return (
    <div className="App">
    {/* <div> */}
        {/* <button className="button-default" onClick={()=>setShow(!show)}>Show Modal</button> */}
      {/* <Modal
        show={show}
        setShow={setShow}
        eventList={eventList}
      /> */}
        <Calendar
          localizer={localizer}
          events={eventList}
          timeslots={2}
          defaultView={Atest.MONTH}
          onSelectEvent={event => setShow(true)}
          style={{ height: 500 }} />
          
      {/* <button className="button-default" onClick={toggle}>Show Modal</button> */}
      </div>
    );
//   }
}

export default Sample;
