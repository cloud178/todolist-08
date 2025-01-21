import {v1} from 'uuid'
import {beforeEach, expect, test} from 'vitest'
import type {Todolist} from '../App'
import {
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    CreateTodolistAC,
    DeleteTodolistAC,
    todolistsReducer
} from './todolists-reducer'

let todolistId1: string
let todolistId2: string
let startState: Todolist[] = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
})

test('correct todolist should be deleted', () => {
    // 2. Действие
    // const action = {
    //     type: 'delete_todolist',
    //     payload: {
    //         id: todolistId1,
    //     },
    // } as const // тайпскрипт, ничего не выдумывай, читай как есть, либо после delete todolist написатть, так как всё оставльное совпадаем с типом из редьюсера, а так он воспринимает его как string

    // const action = DeleteTodolistAC(todolistId1)
    const endState = todolistsReducer(startState, DeleteTodolistAC(todolistId1))

    // 3. Проверка, что действие измененило state соответствующим образом
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, не любой
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be created', () => {
    const id = v1()
    const title = 'New todolist'
    const endState = todolistsReducer(startState, CreateTodolistAC(title, id))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(title)
})

test('correct todolist should change its title', () => {
    const title = 'New title'
    const endState = todolistsReducer(startState, ChangeTodolistTitleAC({id: todolistId2, title}))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(title)
})

test('correct todolist should change its filter', () => {
    const filter = 'completed'
    const endState = todolistsReducer(startState, ChangeTodolistFilterAC({id: todolistId2, filter}))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(filter)
})
