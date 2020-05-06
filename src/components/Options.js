import React from 'react';

function Options({ id, removeTask }) {
  return (
    <div className="options">
      <input
        className="option"
        type="button"
        value="remove board"
        onClick={() => removeTask(id)}
      />
      {/* <input
        className="option"
        type="button"
        value="rename board"
        onClick={}
      /> */}
    </div>
  );
}

export default Options;
