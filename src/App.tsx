import React from "react";
import "./App.css";
import Sample from "./Sample";
import { Event } from "./Model";

function App() {
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
