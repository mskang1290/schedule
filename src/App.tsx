import React,{useEffect, useState} from "react";
import "./App.css";
import Sample from "./Sample";
import { Event } from "./Model";
import axios from "axios";

function App() {
  const [data, setData]=useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/customers")
      .then(({ data }) =>{ 
        console.log(data)
        setData(data)
      }).catch(({reason})=>{
        console.log(reason)

      });
  }, []);

  const eventList = [
  ] as Array<Event>;
  return (
    <div>
        <div className="App">
        <Sample eventList={eventList} />
      </div>
    </div>
  );
}

export default App;
