import React, { useState, useEffect } from 'react';
import '../styles/singleTask.styles.css';

const SingleTask = ({ task, onRightClick, onUpdateDueTime }) => {
  const [dueTime, setDueTime] = useState(task.dueTime || '');
  const [isOverdue, setIsOverdue] = useState(false);
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    const checkOverdue = () => {
      if (dueTime && new Date(dueTime) < new Date()) {
        setIsOverdue(true);
        if (!alertShown) {
          alert(`Task "${task.name}" is overdue!`);
          setAlertShown(true);
        }
      } else {
        setIsOverdue(false);
        setAlertShown(false);
      }
    };
    checkOverdue();
    const interval = setInterval(checkOverdue, 60000);
    return () => clearInterval(interval);
  }, [dueTime, task.name, alertShown]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return 'rgb(173, 216, 230)'; 
      case 'Ongoing':
        return isOverdue ? 'red' : 'rgb(255, 165, 0)'; 
      case 'Done':
        return 'rgb(144, 238, 144)'; 
      default:
        return 'rgb(211, 211, 211)'; 
    }
  };

  const handleDueTimeChange = (event) => {
    const newDueTime = event.target.value;
    const isNewDueTimeInThePast = new Date(newDueTime) < new Date();
    if (!isNewDueTimeInThePast) {
      setDueTime(newDueTime);
      onUpdateDueTime(task.id, newDueTime);
      setAlertShown(false); // Reset alert
    } else {
      alert("Invalid due date. Please select a future date.");
    }
  };

  return (
    <div
      onContextMenu={(event) => onRightClick(event, task)}
      className={`task-item ${isOverdue ? 'overdue' : ''}`}
      style={{ backgroundColor: getStatusColor(task.status) }}
    >
      <h2>{task.name}</h2>
      <p>{task.description}</p>
      <p><span style={{fontWeight: "bold"}}>Status: </span> {task.status}</p>
      {task.status === 'Ongoing' && (
        <div>
          <label>
            <span style={{fontWeight: "bold"}}>Due Time: </span>
            <input
              type="datetime-local"
              value={dueTime}
              onChange={handleDueTimeChange}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default SingleTask;
