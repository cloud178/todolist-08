import type {TasksState} from '../App'
import {CreateTodolistActionType, DeleteTodolistActionType} from "./todolists-reducer.ts";
import {v1} from 'uuid'

const initialState: TasksState = {}

type Actions =
    DeleteTodolistActionType |
    CreateTodolistActionType |
    CreateTaskActionType |
    DeleteTaskActionType |
    ChangeTaskStatusActionType |
    ChangeTaskTitleActionType

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
        case 'create_task': {
            const {todolistId, title} = action.payload
            return {
                ...tasks,
                [todolistId]: [
                    {id: v1(), title, isDone: false},
                    ...tasks[todolistId]
                ]
            }
        }
        case 'delete_task': {
            const {todolistId, taskId} = action.payload
            return {
                ...tasks,
                [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)
            }
        }
        case 'change_task_status': {
            const {todolistId, taskId, isDone} = action.payload
            return {
                ...tasks,
                [todolistId]: tasks[todolistId].map(task => task.id === taskId
                    ? {...task, isDone}
                    : task)
            }
        }
        case 'change_task_title': {
            const {todolistId, taskId, title} = action.payload
            return {
                ...tasks,
                [todolistId]: tasks[todolistId].map(task => task.id === taskId
                    ? {...task, title}
                    : task)
            }
        }
        default:
            return tasks
    }
}


export const CreateTaskAC = (todolistId: string, title: string) => (
    {
        type: 'create_task',
        payload: {
            todolistId,
            title
        }
    } as const
)

type CreateTaskActionType = ReturnType<typeof CreateTaskAC>


export const DeleteTaskAC = (todolistId: string, taskId: string) => (
    {
        type: 'delete_task',
        payload: {
            todolistId,
            taskId
        }
    } as const
)

type DeleteTaskActionType = ReturnType<typeof DeleteTaskAC>


export const ChangeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => (
    {
        type: 'change_task_status',
        payload: {
            todolistId,
            taskId,
            isDone
        }
    } as const
)

type ChangeTaskStatusActionType = ReturnType<typeof ChangeTaskStatusAC>


export const ChangeTaskTitleAC = (todolistId: string, taskId: string, title: string) => (
    {
        type: 'change_task_title',
        payload: {
            todolistId,
            taskId,
            title
        }
    } as const
)

type ChangeTaskTitleActionType = ReturnType<typeof ChangeTaskTitleAC>
