import { createReducer } from '@reduxjs/toolkit'
import { TASK_ACTION } from '../constants'

const initialState = {
  taskList: [],
}

const taskReducer = createReducer(initialState, {
  [TASK_ACTION.ADD_TASK]: (state, action) => {
    const { data } = action.payload
    return {
      ...state,
      taskList: [data, ...state.taskList],
    }
  },
  [TASK_ACTION.EDIT_TASK]: (state, action) => {
    const { id, data } = action.payload
    const newTaskList = [...state.taskList]
    const taskIndex = newTaskList.findIndex((item) => item.id === id)
    newTaskList.splice(taskIndex, 1, data)
    return {
      ...state,
      taskList: newTaskList,
    }
  },
  [TASK_ACTION.DELETE_TASK]: (state, action) => {
    const { id } = action.payload
    // const newTaskList = [...state.taskList]
    // const taskIndex = newTaskList.findIndex((item) => item.id === id)
    // newTaskList.splice(taskIndex, 1)
    const newTaskList = state.taskList.filter((item) => item.id !== id)
    return {
      ...state,
      taskList: newTaskList,
    }
  }
})

export default taskReducer
