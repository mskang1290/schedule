import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Event } from "./Model";
import "./styles/modal.css";
import Modal from "./Modal";
import "./App.css";
import axios from "axios";

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
  // useEffect(() => {
    // fetch("http://localhost:5000/api/getEvent")
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
    //       console.log("data")
    //       console.log(result)
    //       console.log("data")
    //       result.forEach((event: Event)=>{
    //         // event.start=event.start&&event.start.replace("T", " ")
    //         // event.end=event.end&&event.end.replace("T", " ")
    //         // event.start=event.start&&event.start.replace("Z", "")
    //         // event.end=event.end&&event.end.replace("Z", "")
    //         event.start=new Date(moment(event.start).format("YYYY-MM-DD HH:mm"))
    //         event.end=new Date(moment(event.end).format("YYYY-MM-DD HH:mm"))
    //         event.allDay=false
    //         // eventList=eventList.concat(data)
    //         console.log(event)
    //         Object.assign(eventList, result)
    //     },
    //     // Note: it's important to handle errors here
    //     // instead of a catch() block so that we don't swallow
    //     // exceptions from actual bugs in components.
    //     (error) => {
    //       setIsLoaded(true);
    //       setError(error);
    //     })}
    //   )
  // const f = async () => {
  //   console.log('side effect!');
  //   await axios
  //     .get("http://localhost:5000/api/customers")
  //     .then(({ data }) =>{ 
  //       console.log("data")
  //       console.log(data)
  //       console.log("data")
  //       data.forEach((event: Event)=>{
  //         // event.start=event.start&&event.start.replace("T", " ")
  //         // event.end=event.end&&event.end.replace("T", " ")
  //         // event.start=event.start&&event.start.replace("Z", "")
  //         // event.end=event.end&&event.end.replace("Z", "")
  //         event.start=new Date(moment(event.start).format("YYYY-MM-DD HH:mm"))
  //         event.end=new Date(moment(event.end).format("YYYY-MM-DD HH:mm"))
  //         event.allDay=false
  //         // eventList=eventList.concat(data)
  //         console.log(event)
  //         Object.assign(eventList, data)
  //       })
  //       // eventList=data.slice()
  //       console.log(data)
  //       console.log(eventList)
  //     }).catch(({reason})=>{
  //       console.log(reason)
  //     });
  //     // renderFL=true;
  //   };
  //   f();
  // }, []);
  console.log("sample")
  console.log(eventList)
  console.log("sample")

  const [data, setData]=useState([]);
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
  return (
    <>
      <div className="App">
        <Calendar
          localizer={localizer} //????
          events={eventList} //event add
          timeslots={2}
          defaultView={Atest.MONTH}
          onSelectEvent={(event: Event) => {
            setEvent(event);
            setShowEvent(true);
          }}
          views={['month', 'day', 'agenda']}
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
