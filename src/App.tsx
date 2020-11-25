import React,{useEffect} from "react";
import "./App.css";
import Sample from "./Sample";
import { Event } from "./Model";
import axios from "axios";
import moment from "moment";

function App() {

  let eventList = [
  ] as Array<Event>;
  let flag=false;
  useEffect(() => {
  const f = async () => {
    console.log('side effect!');
    await axios
      .get("http://localhost:5000/api/getEvent")
      .then(({ data }) =>{ 
        data.forEach((event: Event)=>{
          event.start=new Date(moment(event.start).format("YYYY-MM-DD HH:mm:ss"))
          event.end=new Date(moment(event.end).format("YYYY-MM-DD HH:mm:ss"))
          event.allDay=false
          Object.assign(eventList, data)
        })
      }).catch(({reason})=>{
      });
      flag=true;
    };
    f();
    
  }, []);

  // if(!flag) return null;
  
  return (
    <div>
        <div className="App">
        <Sample eventList={eventList} />
      </div>
    </div>
  );
}

export default App;
