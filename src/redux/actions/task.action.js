import { createAction } from '@reduxjs/toolkit'
import { TASK_ACTION } from '../constants'

export const addTaskAction = createAction(TASK_ACTION.ADD_TASK)
export const editTaskAction = createAction(TASK_ACTION.EDIT_TASK)
export const deleteTaskAction = createAction(TASK_ACTION.DELETE_TASK)
