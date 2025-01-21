import {type ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type Props = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = ({title, changeTitle}: Props) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [itemTitle, setItemTitle] = useState<string>(title)

    const onEditMode = () => {
        setIsEditMode(true)
    }

    const offEditMode = () => {
        setIsEditMode(false)
        changeTitle(itemTitle)
    }

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
    }

    return (
        isEditMode
            ? <TextField
                variant="standard"
                value={itemTitle}
                onChange={changeItemTitleHandler}
                autoFocus
                onBlur={offEditMode}
            />
            : <span onDoubleClick={onEditMode}>{title}</span>
    );
};
