
import React, { useEffect, useState } from 'react';
import RoomCard from './RoomCard.jsx';
import Catalog from './Catalog.jsx';

function App() {
  const [rooms, setRooms] = useState([]);
  const [loadError, setLoadError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingRoomId, setEditingRoomId] = useState(null);

  async function loadRooms(signal) {
    setLoading(true);
    setLoadError('');
    try {
      const response = await fetch('/api/rooms', { signal });
      if (!response.ok) throw new Error('Load failed');
      const data = await response.json();
      if (!signal?.aborted) setRooms(data);
    } catch {
      if (!signal?.aborted) {
        setLoadError('Could not load rooms. Check that the API is running, then retry.');
      }
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    loadRooms(controller.signal);
    return () => controller.abort();
  }, []);

  // Existing room filter
  const [searchText, setSearchText] = useState('');

  // Controlled form inputs
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

  async function handleAddRoom(event) {
    event.preventDefault();
    if (saving) return;
    setFormMessage('');

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

    setSaving(true);
    try {
      const response = await fetch(`/api/rooms${editingRoomId === null ? '' : `/${editingRoomId}`}`, {
        method: editingRoomId === null ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmedName, capacity }),
      });
      if (response.status !== (editingRoomId === null ? 201 : 200)) {
        setFormMessage(response.status === 422
          ? 'The server rejected this room. Check the name and positive whole-number capacity.'
          : 'The server could not save this room. Check that the API and storage are available.');
        return;
      }
      const savedRoom = await response.json();
      setRoomName('');
      setRoomCapacity('');
      setEditingRoomId(null);
      setSearchText('');
      setFormMessage(`Room "${savedRoom.name}" saved by the server.`);
      await loadRooms();
    } catch {
      setFormMessage('Could not confirm the save. Check the room list before trying again.');
    } finally {
      setSaving(false);
    }
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

      {loading && <p role="status">Loading rooms...</p>}
      {loadError && <p role="alert">{loadError}</p>}
      <button type="button" disabled={loading || saving} onClick={() => loadRooms()}>
        {loadError ? 'Retry loading rooms' : 'Reload rooms'}
      </button>
      {/* Display matching rooms or a no-match message */}
      {!loading && !loadError && (filteredRooms.length > 0 ? (
        <ul>
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} disabled={saving} onEdit={(selected) => {
              setEditingRoomId(selected.id);
              setRoomName(selected.name);
              setRoomCapacity(String(selected.capacity));
              setFormMessage('');
            }} />
          ))}
        </ul>
      ) : (
        <p>No matching rooms</p>
      ))}

      {/* Send accepted input to the API */}
      <h2>{editingRoomId === null ? 'Add a Room' : `Edit Room ${editingRoomId}`}</h2>

      <form onSubmit={handleAddRoom} noValidate>
        <div>
          <label htmlFor="room-name">
            Room name:
          </label>

          <input
            id="room-name"
            type="text"
            value={roomName}
            disabled={saving}
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
            disabled={saving}
            onChange={(event) =>
              setRoomCapacity(event.target.value)
            }
          />
        </div>

        <button type="submit" disabled={saving}>
          {saving ? 'Saving room...' : editingRoomId === null ? 'Add Room' : 'Save Room'}
        </button>
        {editingRoomId !== null && <button type="button" disabled={saving} onClick={() => {
          setEditingRoomId(null);
          setRoomName('');
          setRoomCapacity('');
          setFormMessage('');
        }}>Cancel room edit</button>}
      </form>

      {/* Validation or success message */}
      {formMessage && (
        <p role="status">{formMessage}</p>
      )}

      <p>
        Rooms are saved in PostgreSQL. Refreshing the page or restarting
        the API keeps saved rooms.
      </p>
      <Catalog />
    </div>
  );
}

export default App;
