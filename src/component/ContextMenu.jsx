import React from 'react';
import '../styles/contextMenu.styles.css';
const ContextMenu = ({ position, currentTask, onClose, moveTask, currentColumn }) => {
  const options = {
    'New': ['Ongoing', 'Done'],
    'Ongoing': ['New', 'Done'],
    'Done': ['New', 'Ongoing'],
  };

  const availableOptions = options[currentColumn].filter(option => option !== currentColumn);

  const handleOptionClick = (targetColumn) => {
    moveTask(currentTask, targetColumn);
    onClose();
  };

  return (
    <ul
      className="context-menu"
      style={{ top: `${position.y}px`, left: `${position.x}px`, position: 'absolute', display: 'block' }}
    >
      {availableOptions.map((option) => (
        <li key={option} onClick={() => handleOptionClick(option)}>
          Move to {option}
        </li>
      ))}
    </ul>
  );
};

export default ContextMenu;
