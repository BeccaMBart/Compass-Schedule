import React from 'react';

function RoomCard({ room }) {
  return (
    <li>
      {room.name} — Capacity: {room.capacity}
    </li>
  );
}

export default RoomCard;