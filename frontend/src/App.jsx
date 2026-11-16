
import React, { useState } from 'react';
import RoomCard from './RoomCard.jsx';

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
  // Store the search text in React state
  const [searchText, setSearchText] = useState('');

  // Prepare a case-insensitive search value
  const normalizedSearchText = searchText.trim().toLowerCase();

  // Filter rooms without changing the original array
  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(normalizedSearchText)
  );

  return (
    <div>
      {/* Existing heading and purpose */}
      <h1>Class Scheduler</h1>
      <p>We are building a tool to plan classes and rooms.</p>

      {/* Room filter */}
      <h2>Rooms</h2>

      <label htmlFor="room-search">
        Filter rooms by name:
      </label>

      <input
        id="room-search"
        type="text"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />

      {/* Display matching rooms or a no-match message */}
      {filteredRooms.length > 0 ? (
        <ul>
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </ul>
      ) : (
        <p>No matching rooms</p>
      )}
    </div>
  );
}

export default App;
