import React from 'react';
import PropTypes from 'prop-types';

function Progress({ list }) {
  const totalTasks = list.todos.length;
  const completeTasks = list.todos.filter(list => list.completed === true);

  return <progress value={completeTasks.length} max={totalTasks} />;
}

Progress.propTypes = {
  list: PropTypes.object,
};

export default Progress;
