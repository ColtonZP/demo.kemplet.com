import React, { useState } from 'react';

function Progress({ list }) {
  const totalTasks = list.length;
  const completeTasks = list.filter(list => list.completed === true);
  console.log('idk');

  return <progress value={completeTasks.length} max={totalTasks} />;
}

export default Progress;
