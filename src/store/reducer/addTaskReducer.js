import * as ACTION_TYPES from '../actions/action_types';

const initialState = {
  allTasks: {},
  columns: {
    'New': { id: 'New', title: 'New', taskIds: [] },
    'Ongoing': { id: 'Ongoing', title: 'Ongoing', taskIds: [] },
    'Done': { id: 'Done', title: 'Done', taskIds: [] },
  },
  columnOrder: ['New', 'Ongoing', 'Done'],
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_TASK: {
      const { id, name, description, status } = action.payload;
      const newTask = { id, name, description, status };

      if (!state.columns[status]) {
        console.error('Invalid status:', status);
        return state;
      }

      return {
        ...state,
        allTasks: {
          ...state.allTasks,
          [id]: newTask,
        },
        columns: {
          ...state.columns,
          [status]: {
            ...state.columns[status],
            taskIds: [id, ...state.columns[status].taskIds],
          },
        },
      };
    }
    case ACTION_TYPES.MOVE_TASK: {
      const { taskId, newColumnId } = action.payload;
      console.log('taskId', taskId);
      console.log('newColumnId', newColumnId);
      console.log('state', state);
      console.log('state.allTasks', state.allTasks);
      console.log('state.columns', state.columns);
      console.log(state.allTasks[taskId]);
      if (!state.allTasks[taskId] || !state.columns[newColumnId]) {
        console.error('Invalid taskId or newColumnId');
        return state; 
      }
    
      const oldColumnId = Object.keys(state.columns).find(columnId =>
        state.columns[columnId].taskIds.includes(taskId)
      );
    
      if (!oldColumnId) {
        console.error('Task not found in any column');
        return state; 
      }
    
      const updatedTaskIds = state.columns[oldColumnId].taskIds.filter(id => id !== taskId);
      let updatedTask = state.allTasks[taskId];
  
      if (state.columns[oldColumnId].title === 'Ongoing') {
        updatedTask = { ...state.allTasks[taskId], dueTime: '' };
      }
    
      return {
        ...state,
        allTasks: {
          ...state.allTasks,
          [taskId]: { ...updatedTask, status: newColumnId },
        },
        columns: {
          ...state.columns,
          [oldColumnId]: {
            ...state.columns[oldColumnId],
            taskIds: updatedTaskIds,
          },
          [newColumnId]: {
            ...state.columns[newColumnId],
            taskIds: [taskId, ...state.columns[newColumnId].taskIds],
          },
        },
      };
    }    
    case ACTION_TYPES.UPDATE_DUE_TIME: {
      const { taskId, dueTime } = action.payload;

      return {
        ...state,
        allTasks: {
          ...state.allTasks,
          [taskId]: { ...state.allTasks[taskId], dueTime },
        },
      };
    }
    default:
      return state;
  }
};
