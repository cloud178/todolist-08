import {type ChangeEvent} from 'react'
import type {FilterValues, Task, Todolist} from './App'
// import {Button} from './Button'
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {Box, Button, Checkbox, IconButton, List, ListItem, ListItemIcon, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {ContainerSx, getListItemSx} from "./TodolistItem.styles.ts";

type Props = {
    todolist: Todolist
    tasks: Task[]
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const TodolistItem = (props: Props) => {
    const {
        todolist: {id, title, filter},
        tasks,
        deleteTask,
        changeFilter,
        createTask,
        changeTaskStatus,
        deleteTodolist,
        changeTaskTitle,
        changeTodolistTitle
    } = props

    // const [taskTitle, setTaskTitle] = useState('')
    // const [error, setError] = useState<string | null>(null)

    const createTaskHandler = (title: string) => {
        createTask(id, title)
    }

    // const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    //     setTaskTitle(event.currentTarget.value)
    //     setError(null)
    // }

    // const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    //     if (event.key === 'Enter') {
    //         createTaskHandler()
    //     }
    // }

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    const changeTodolistTitleHandler = (newTitle: string) => {
        changeTodolistTitle(id, newTitle)
    }

    return (
        <div>
            <div className={'container'}>
                <Box>
                    <Typography variant={'h5'} align={'center'} sx={{fontWeight: '700'}}>
                        <EditableSpan title={title} changeTitle={changeTodolistTitleHandler}/>
                    </Typography>
                </Box>
                {/*<Button title={'x'} onClick={deleteTodolistHandler}/>*/}
                <IconButton color={'default'} onClick={deleteTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            {/*<div>*/}
            {/*    <input className={error ? 'error' : ''}*/}
            {/*           value={taskTitle}*/}
            {/*           onChange={changeTaskTitleHandler}*/}
            {/*           onKeyDown={createTaskOnEnterHandler}/>*/}
            {/*    <Button title={'+'} onClick={createTaskHandler}/>*/}
            {/*    {error && <div className={'error-message'}>{error}</div>}*/}
            {/*</div>*/}
            <CreateItemForm createItem={createTaskHandler}/>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => {
                            deleteTask(id, task.id)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(id, task.id, newStatusValue)
                        }

                        const changeTaskTitleHandler = (newTitle: string) => {
                            changeTaskTitle(id, task.id, newTitle)
                        }

                        return (
                            <ListItem
                                divider
                                disablePadding
                                key={task.id}
                                // className={task.isDone ? 'is-done' : ''}
                                secondaryAction={
                                    <IconButton
                                        color="secondary"
                                        onClick={deleteTaskHandler}>
                                        <DeleteIcon/>
                                    </IconButton>
                                }
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        size={'small'}
                                        checked={task.isDone}
                                        onChange={changeTaskStatusHandler}
                                    />
                                </ListItemIcon>
                                <Box sx={getListItemSx(task.isDone)}>
                                    <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>
                                </Box>
                            </ListItem>
                        )
                    })}
                </List>
            )}
            <Box sx={ContainerSx}>
                {/*<Box sx={{display: 'flex', justifyContent: 'space-between'}}>*/}
                <Button
                    variant={'contained'}
                    color={filter === 'all' ? 'secondary' : 'primary'}
                    onClick={() => changeFilterHandler('all')}>
                    All
                </Button>
                <Button
                    variant={'contained'}
                    color={filter === 'active' ? 'secondary' : 'primary'}
                    onClick={() => changeFilterHandler('active')}>
                    Active
                </Button>
                <Button
                    variant={'contained'}
                    color={filter === 'completed' ? 'secondary' : 'primary'}
                    onClick={() => changeFilterHandler('completed')}>
                    Completed
                </Button>
            </Box>
        </div>
    )
}
