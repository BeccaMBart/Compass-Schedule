
import React, { useState } from 'react';
import RoomCard from './RoomCard.jsx';

// 1. Original fictional room records
const initialRooms = [
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
  // Keep the room list in React state
  const [rooms, setRooms] = useState(initialRooms);

  // Existing room filter
  const [searchText, setSearchText] = useState('');

  // New form inputs
  const [roomName, setRoomName] = useState('');
  const [roomCapacity, setRoomCapacity] = useState('');

  // Message for successful or rejected additions
  const [formMessage, setFormMessage] = useState('');

  // Prepare a case-insensitive search value
  const normalizedSearchText = searchText.trim().toLowerCase();

  // Filter rooms without changing the stored list
  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(normalizedSearchText)
  );

  // Handle the local room form
  function handleAddRoom(event) {
    event.preventDefault();

    const trimmedName = roomName.trim();
    const trimmedCapacity = roomCapacity.trim();

    // Reject a blank room name
    if (trimmedName === '') {
      setFormMessage('Please enter a room name.');
      return;
    }

    // Accept only positive whole-number capacities
    if (!/^[0-9]+$/.test(trimmedCapacity)) {
      setFormMessage(
        'Enter a positive whole-number capacity, such as 20. Zero, negative numbers, and decimals are not allowed.'
      );
      return;
    }

    const capacity = Number(trimmedCapacity);

    if (!Number.isSafeInteger(capacity) || capacity <= 0) {
      setFormMessage(
        'Enter a positive whole-number capacity, such as 20. Zero, negative numbers, and decimals are not allowed.'
      );
      return;
    }

    // Add exactly one new room with a unique local ID
    setRooms((currentRooms) => {
      const nextId =
        Math.max(0, ...currentRooms.map((room) => room.id)) + 1;

      const newRoom = {
        id: nextId,
        name: trimmedName,
        capacity: capacity,
      };

      return [...currentRooms, newRoom];
    });

    // Clear the form and filter after a successful addition
    setRoomName('');
    setRoomCapacity('');
    setSearchText('');

    setFormMessage(
      `Room "${trimmedName}" added for this browser session.`
    );
  }

  return (
    <div>
      {/* Existing heading and purpose */}
      <h1>Class Scheduler</h1>
      <p>We are building a tool to plan classes and rooms.</p>

      {/* Existing room filter */}
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

      {/* New local add-room form */}
      <h2>Add a Room</h2>

      <form onSubmit={handleAddRoom} noValidate>
        <div>
          <label htmlFor="room-name">
            Room name:
          </label>

          <input
            id="room-name"
            type="text"
            value={roomName}
            onChange={(event) => setRoomName(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="room-capacity">
            Capacity:
          </label>

          <input
            id="room-capacity"
            type="text"
            inputMode="numeric"
            value={roomCapacity}
            onChange={(event) =>
              setRoomCapacity(event.target.value)
            }
          />
        </div>

        <button type="submit">Add Room</button>
      </form>

      {/* Validation or success message */}
      {formMessage && (
        <p role="status">{formMessage}</p>
      )}

      <p>
        Rooms added here are temporary. Refreshing the page
        resets the list to the two original rooms.
      </p>
    </div>
  );
}

export default App;
