import React from "react";

const TaskList = ({ tasks, handleDeleteTask }) => {
  return (
    <div className="column">
      <ul>
        {tasks.length === 0 ? (
          <li className="no-tasks-message">
            No tasks yet! Start by adding your first to-do.
          </li>
        ) : (
          tasks.map((task) => (
            <li key={task.id}>
              <div className="task-text">
                <div className="task-title">{task.title}</div>
                <div className="task-description">{task.description}</div>
              </div>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="done-button"
              >
                Done
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskList;
