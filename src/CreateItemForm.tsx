// import {Button} from "./Button.tsx";
import {type ChangeEvent, type KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Tooltip from '@mui/material/Tooltip';


type Props = {
    createItem: (itemTitle: string) => void
}

export const CreateItemForm = ({createItem}: Props) => {
    const [itemTitle, setItemTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
        setError(null)
    }

    const createItemHandler = () => {
        const trimmedTitle = itemTitle.trim()
        if (trimmedTitle !== '') {
            createItem(trimmedTitle)
            setItemTitle('')
        } else {
            setError('Title is required')
            setItemTitle('')
        }
    }

    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createItemHandler()
        }
    }

    return (
        <div>
            <TextField
                size="small"
                variant="outlined"
                error={!!error}
                helperText={error}
                // className={error ? 'error' : ''}
                value={itemTitle}
                onChange={changeItemTitleHandler}
                onKeyDown={createItemOnEnterHandler}/>
            <Tooltip title={'add'}>
                <Button
                    disableElevation
                    variant={'contained'}
                    onClick={createItemHandler}
                    endIcon={<AddIcon/>}
                >
                    add
                </Button>
            </Tooltip>
            {/*{error && <div className={'error-message'}>{error}</div>}*/}
        </div>
    );
};
