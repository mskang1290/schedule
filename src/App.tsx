import React, { useState } from "react";
import "./App.css";
import Sample from "./Sample";
import { Event } from "./Model";

function App() {
  const [eventList, setEventList] = useState([] as Array<Event>);

  return (
    <div>
      <div className="App">
        <Sample eventList={eventList} setEventList={setEventList} />
      </div>
    </div>
  );
}

export default App;
