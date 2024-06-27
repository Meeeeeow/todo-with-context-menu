import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add_task } from '../store/actions/actions';
import TaskList from './taskList';
import '../styles/inputTask.styles.css';

const InputTask = () => {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const tasks = useSelector(({ tasks: { allTasks } }) => allTasks);
  const allState = useSelector((state) => state.tasks);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.trim() === '') {
      setError('Enter a valid task name.');
      return;
    }
    dispatch(add_task({
      id: Date.now(),
      name: task,
      description,
      status: 'New'
    }));
    setTask('');
    setDescription('');
    setError('');
  };

  return (
    <div className='add-task'>
      <form className='input-task' onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <input
          type='text'
          name='inputTaskName'
          placeholder='Enter a task'
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          type='text'
          name='inputTaskDescription'
          placeholder='Enter task description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add new task</button>
      </form>
      <div className='columns'>
        {allState.columnOrder.map((columnId) => {
          const column = allState.columns[columnId];
          const taskColumn = column.taskIds.map((taskId) => tasks[taskId]);
          return (
            <TaskList
              key={column.id}
              column={column}
              tasks={taskColumn}
            />
          );
        })}
      </div>
    </div>
  );
};

export default InputTask;
