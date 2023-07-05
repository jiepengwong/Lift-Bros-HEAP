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
        placeholder="Write notes about your workout here..."
        rows={5}
        className="w-60 bg-gray-200 p-2 mt-4 rounded-lg"
      ></textarea>
    </div>
  );
}

export default NotesInput;