import React from 'react';

// 1. Local room records
const rooms = [
  {
    id: 1,
    name: 'Room 101',
    capacity: 24,
  },
  {
    id: 2,
    name: 'Art Studio',
    capacity: 18,
  },
];

// 2. Main page component
function App() {
  return (
    <div>
      {/* Existing heading and purpose */}
      <h1>Class Scheduler</h1>
      <p>We are building a tool to plan classes and rooms.</p>

      {/* Today's addition */}
      <h2>Rooms</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            {room.name} — Capacity: {room.capacity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
