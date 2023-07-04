import React, { useState } from 'react';

function NotesInput() {
  const [notes, setNotes] = useState('');

  const handleInputChange = (event) => {
    setNotes(event.target.value);
  };

  return (
    <div>
      <textarea
        value={notes}
        onChange={handleInputChange}
        placeholder="Write your notes here..."
        rows={4}
        className="w-full bg-gray-100 p-2 rounded-lg"
      ></textarea>
    </div>
  );
}

export default NotesInput;