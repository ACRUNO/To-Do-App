import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import React from 'react'
import { AlertDeleteProps } from '../Helpers/estados'


function AlertDelete( { setSelectedIndexDelete, selectedIndexDelete, listItems, setListItems, id } : AlertDeleteProps) {

    const handleCloseDialog = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setSelectedIndexDelete(null);
    }

    const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const filterListItems = listItems.filter((l) => l.id !== selectedIndexDelete)
        setListItems(filterListItems);
        setSelectedIndexDelete(null);
    }

    return (
        <Dialog
            open={selectedIndexDelete === id}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete this task from the list?"}
            </DialogTitle>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={handleDelete} autoFocus>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertDelete