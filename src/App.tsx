import './App.css'
import {useReducer, useState} from 'react'
import {v1} from 'uuid'
import {TodolistItem} from './TodolistItem'
import {CreateItemForm} from "./CreateItemForm.tsx";
// import {AppBar, IconButton, Toolbar} from "@mui/material";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {Container, CssBaseline, Grid2, Paper} from "@mui/material";
import {ContainerSx} from "./TodolistItem.styles.ts";
import {NavButton} from "./NavButton.ts";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {green, amber} from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import {
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    CreateTodolistAC, DeleteTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export type TasksState = Record<string, Task[]>

export const App = () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const initialState: Todolist[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, initialState)

    const [tasks, setTasks] = useState<TasksState>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })


    // tasks
    // Create
    const createTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    // Update 1
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? {...task, isDone} : task)})
    }

    // Update 2
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? {...task, title} : task)})
    }

    //Delete
    const deleteTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }


    // todolists
    // Create
    const createTodolist = (title: string) => {
        const todolistId = v1()
        const action = CreateTodolistAC(title, todolistId)
        dispatchTodolists(action)
        setTasks({...tasks, [todolistId]: []})
        //dispatchTasks(action)
    }

    // Update 1
    const changeFilter = (todolistId: string, filter: FilterValues) => {
        // dispatchTodolists(ChangeTodolistFilterAC({id: todolistId, filter})) // первый способ
        const action = ChangeTodolistFilterAC({id: todolistId, filter})
        dispatchTodolists(action)
    }

    // Update 2
    const changeTodolistTitle = (todolistId: string, title: string) => {
        const action = ChangeTodolistTitleAC({id: todolistId, title})
        dispatchTodolists(action)
    }

    // Delete
    const deleteTodolist = (todolistId: string) => {
        const action = DeleteTodolistAC(todolistId)
        dispatchTodolists(action)

        delete tasks[todolistId]
        setTasks({...tasks})
        //dispatchTasks(action)
    }

    const [isLightMode, setIsLightMode] = useState<boolean>(true)
    const changeThemeHadler = () => {
        setIsLightMode(!isLightMode)
    }

    const theme = createTheme({
        palette: {
            primary: green,
            secondary: amber,
            mode: isLightMode ? 'light' : 'dark'
        },
    })


    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position="static">
                    <Toolbar>
                        <Container maxWidth={'lg'} sx={ContainerSx}>
                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                            <div>
                                <Switch onChange={changeThemeHadler}/>
                                <NavButton>Sign in</NavButton>
                                <NavButton>Sign up</NavButton>
                                <NavButton background={theme.palette.secondary.main}>Faq</NavButton>
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container maxWidth={'lg'}>
                    <Grid2 container sx={{p: '15px 0'}}>
                        <CreateItemForm createItem={createTodolist}/>
                    </Grid2>
                    <Grid2 container spacing={4}>
                        {todolists.map(todolist => {
                            const todolistTasks = tasks[todolist.id]
                            let filteredTasks = todolistTasks
                            if (todolist.filter === 'active') {
                                filteredTasks = todolistTasks.filter(task => !task.isDone)
                            }
                            if (todolist.filter === 'completed') {
                                filteredTasks = todolistTasks.filter(task => task.isDone)
                            }

                            return (
                                <Grid2 key={todolist.id}>
                                    <Paper elevation={8} sx={{p: '15px'}}>
                                        <TodolistItem
                                            todolist={todolist}
                                            tasks={filteredTasks}
                                            deleteTask={deleteTask}
                                            changeFilter={changeFilter}
                                            createTask={createTask}
                                            changeTaskStatus={changeTaskStatus}
                                            deleteTodolist={deleteTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid2>
                            )
                        })}
                    </Grid2>
                </Container>
            </ThemeProvider>
        </div>
    )
}
