import type {TasksState} from '../App'
import {CreateTodolistActionType, DeleteTodolistActionType} from "./todolists-reducer.ts";

const initialState: TasksState = {}

type Actions = DeleteTodolistActionType | CreateTodolistActionType

export const tasksReducer = (tasks: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case 'create_todolist': {
            const { id } = action.payload
            return {...tasks, [id]: [] }
        }
        case 'delete_todolist': {
            const { id } = action.payload
            delete tasks[id]
            return tasks
        }
        default:
            return tasks
    }
}
