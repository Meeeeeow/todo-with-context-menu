import * as ACTION_TYPES from './action_types';

export const add_task = (task) => {
    return {
      type: ACTION_TYPES.ADD_TASK,
      payload: task
    };
  };
  
export const move_task = (taskId, newColumnId) => {
    return {
      type: ACTION_TYPES.MOVE_TASK,
      payload: { taskId, newColumnId },
    };
};

export const update_due_time = (taskId, dueTime) => {
    return {
      type: ACTION_TYPES.UPDATE_DUE_TIME,
      payload: { taskId, dueTime },
    };
  };
