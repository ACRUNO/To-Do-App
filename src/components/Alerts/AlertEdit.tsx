import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { ChangeEvent } from 'react'
import { AlertEditProps } from '../Helpers/estados'


function AlertEdit( { setSelectedIndexEdit, selectedIndexEdit, setEditedText, editedText , listItems , setListItems, setOpenRepeated, id } : AlertEditProps) {

    const handleCloseDialog = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setSelectedIndexEdit(null);
    }

    const handleChangeEdit = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        setEditedText(e.target.value);
    }

    const handleEdit = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();        
        if (!editedText.trim()) return;
        for (const item of listItems) {
            if (item.task === editedText.trim().toUpperCase()) return setOpenRepeated(true);
        }
        const editedListItems = listItems.map((item, i) => {
            return item.id === selectedIndexEdit ? { ...item, task: editedText.toUpperCase() } : item
        })
        setListItems(editedListItems)
        setSelectedIndexEdit(null);
    }

    return (
        <Dialog
            fullWidth
            open={selectedIndexEdit === id}
            onClose={handleCloseDialog}>
            <DialogTitle>Edit To-Do</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Edit To-Do"
                    type="Edit To-Do"
                    value={editedText}
                    fullWidth
                    variant="standard"
                    onChange={handleChangeEdit}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={handleEdit}>OK</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertEdit