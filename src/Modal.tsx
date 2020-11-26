import React, { useEffect, useState } from "react";
import { Event } from "./Model";
import "react-nice-dates/build/style.css";
import axios from "axios";

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
  setShowModal,
  eventList,
  showEvent,
  setShowEvent,
  event,
  setEvent,
}: {
  setShowModal: any;
  eventList: Array<Event>;
  showEvent: boolean;
  setShowEvent: any;
  event: Event;
  setEvent: any;
}) => {

  console.log(eventList)
  const [input, setInput] = useState({title:event.title || "", name:event.name || ""});
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
    setDate({ ...date, [name]: value });
  };

  const classes = useStyles();
  const addEvent = async () => {
    let id=-1;
    let idCheckFL=false;
    eventList.forEach((event)=>{
    if(!idCheckFL){
        if(event.name===input.name&&(typeof event.id!=="undefined")){
        id=event.id;
        idCheckFL=true;
      }else{
        if(typeof event.id!=="undefined"&&id<event.id){
          id=event.id
        }
      }
    }
    })
console.log("111111111111111111111111")
console.log(eventList)
console.log("111111111111111111111111")
    const event = ({
      id: idCheckFL?id:id+1,
      title: input.title,
      start: new Date(date.start.replace("T", " ")),
      end: new Date(date.end.replace("T", " ")),
      allDay: allDay,
      resource: "test1234",
      name:input.name
    } as unknown) as Event;
    eventList.push(event);
    console.log("22222222222222222222")
    console.log(eventList)
    console.log("22222222222222222222222")
    setShowModal(false);
    setShowEvent(false);
    
    await axios('http://localhost:5000/add/data', {
      method : 'POST',
      data : event,
      headers: new Headers()
    })
  // useEffect(() => {
  //   const f = async () => {
  //     console.log('side effect!');
  //     await axios
  //       .post("http://localhost:5000/api/addEvent")
  //       .then(({ data }) =>{ 
  //         console.log("data")
  //         console.log(data)
  //         console.log("data")
  //         data.forEach((event: Event)=>{
  //           // event.start=event.start&&event.start.replace("T", " ")
  //           // event.end=event.end&&event.end.replace("T", " ")
  //           // event.start=event.start&&event.start.replace("Z", "")
  //           // event.end=event.end&&event.end.replace("Z", "")
  //           event.start=new Date(moment(event.start).format("YYYY-MM-DD HH:mm"))
  //           event.end=new Date(moment(event.end).format("YYYY-MM-DD HH:mm"))
  //           event.allDay=false
  //           // eventList=eventList.concat(data)
  //           console.log(event)
  //           Object.assign(eventList, data)
  //         })
  //         // eventList=data.slice()
  //         console.log(data)
  //         console.log(eventList)
  //       }).catch(({reason})=>{
  //         console.log(reason)
  //       });
  //       // renderFL=true;
  //     };
  //     f();
  //   }, []);
    setEvent({})
  };

  

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput({...input, [event.target.name]:event.target.value});
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
            setEvent({})
          }}
        >
          X
        </button>
        <div className="modal-body">
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
            <label>name : </label>
            <input
              name="name"
              onChange={onChange}
              value={input.name}
              disabled={disabled}
            />
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
        {!disabled && (
          <button type="button" onClick={addEvent}>
            test
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
