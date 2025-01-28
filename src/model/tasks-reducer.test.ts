import { beforeEach, expect, test } from 'vitest'
import type {TasksState} from '../App'
import {v1} from 'uuid'
import { CreateTodolistAC, DeleteTodolistAC } from './todolists-reducer'
import {ChangeTaskStatusAC, ChangeTaskTitleAC, CreateTaskAC, DeleteTaskAC, tasksReducer} from "./tasks-reducer.ts";

let startState: TasksState = {}

beforeEach(() => {
    startState = {
        todolistId1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false},
        ],
    }
})

test('array should be created for new todolist', () => {
    const endState = tasksReducer(startState, CreateTodolistAC('New todolist', v1()))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('New key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, DeleteTodolistAC('todolistId2'))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
    // or
    expect(endState['todolistId2']).toBeUndefined()
})

test('task  should be deleted', () => {
    const endState = tasksReducer(startState, DeleteTaskAC('todolistId2', '3'))

    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'][0].title).toBe('bread')
    expect(endState['todolistId2'][1].title).toBe('milk')
})

test('task should be added', () => {
    const endState = tasksReducer(startState, CreateTaskAC('todolistId1', 'RTK'))

    expect(endState['todolistId1'].length).toBe(4)
    expect(endState['todolistId1'][0].title).toBe('RTK')
    expect(endState['todolistId1'][1].title).toBe('CSS')
    expect(endState['todolistId1'][2].title).toBe('JS')
    expect(endState['todolistId1'][3].title).toBe('React')
})

test('task status should be changed', () => {
    const endState = tasksReducer(startState, ChangeTaskStatusAC('todolistId1', '2', false))

    expect(Object.keys(endState).length).toBe(2)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId1'][1].isDone).toBe(false)
    expect(endState['todolistId2'][1].isDone).toBe(true)
})

test('task title should be changed', () => {
    const endState = tasksReducer(startState, ChangeTaskTitleAC('todolistId1', '2', 'JS/TS'))

    expect(Object.keys(endState).length).toBe(2)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId1'][1].title).toBe('JS/TS')
    expect(endState['todolistId2'][1].title).toBe('milk')
})
