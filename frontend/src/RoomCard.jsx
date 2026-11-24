import React from 'react';

function RoomCard({ room, onEdit, disabled }) {
  return (
    <li>
      {room.name} — Capacity: {room.capacity}
      {' '}
      <button type="button" onClick={() => onEdit(room)} disabled={disabled}
        aria-label={`Edit room ${room.id}`}>Edit</button>
    </li>
  );
}

export default RoomCard;
