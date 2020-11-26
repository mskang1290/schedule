import React, { useEffect, useState } from "react";
import "./App.css";
import Sample from "./Sample";
import { Event } from "./Model";
import axios from "axios";
import moment from "moment";

function App() {
  const [eventList, setEventList]=useState([] as Array<Event>)
  // let eventList = [] as Array<Event>;

  // if(!flag) return null;

  return (
    <div>
      <div className="App">
        <Sample eventList={eventList} setEventList={setEventList} />
      </div>
    </div>
  );
}

export default App;
