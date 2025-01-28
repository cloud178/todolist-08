import {SxProps} from '@mui/material'

export const ContainerSx: SxProps = {
    display: 'flex',
    justifyContent: 'space-between'
}

export const getListItemSx = (isDone: boolean): SxProps => ({
    opacity: isDone ? 0.5 : 1,
    fontWeight: isDone ? 400 : 900,
});
