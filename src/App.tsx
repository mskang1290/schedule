import React, { useState } from 'react';
import './App.css';
import './styles/modal.css'
import Sample from './Sample'
import Modal from './Modal';
import { Event } from './Model';

function App() {
  const eventList = [
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
  ] as Array<Event>;
    const [show, setShow] = useState(false)
    return (
    <div className="App">
        <button className="button-default" onClick={()=>setShow(!show)}>Show Modal</button>
      <Sample 
        show={show}
        setShow={setShow}
        eventList={eventList}
        />
    <div className="modal">
      <Modal
        show={show}
        setShow={setShow}
        eventList={eventList}
      />
    </div>
    </div>
  );
}

export default App;
