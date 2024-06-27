import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import SingleTask from './singleTask';
import ContextMenu from './ContextMenu';
import '../styles/taskList.styles.css';
import { move_task, update_due_time } from '../store/actions/actions';

const TaskList = ({ column, tasks }) => {
  const [contextMenu, setContextMenu] = useState({ visible: false, position: { x: 0, y: 0 }, currentTask: null });
  const dispatch = useDispatch();

  const handleRightClick = (event, task) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      position: { x: event.pageX, y: event.pageY },
      currentTask: task,
    });
  };

  const closeContextMenu = () => {
    setContextMenu({ ...contextMenu, visible: false });
  };

  const moveTask = (taskId, targetColumnTitle) => {
    dispatch(move_task(taskId, targetColumnTitle));
    closeContextMenu();
  };

  const updateDueTime = (taskId, dueTime) => {
    dispatch(update_due_time(taskId, dueTime));
  };

  return (
    <div className='tasks' onClick={closeContextMenu}>
      <h1 className='title'>{column.title}</h1>
      <div>
        {tasks.map((task) => (
          <SingleTask
            key={task.id}
            task={task}
            onRightClick={(event) => handleRightClick(event, task)}
            onUpdateDueTime={updateDueTime}
          />
        ))}
      </div>
      {contextMenu.visible && (
        <ContextMenu
          position={contextMenu.position}
          currentTask={contextMenu.currentTask.id}
          onClose={closeContextMenu}
          moveTask={moveTask}
          currentColumn={column.title}
        />
      )}
    </div>
  );
};

export default TaskList;
