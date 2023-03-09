import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import React from 'react'
import { AlertRepeatedProps } from '../Helpers/estados';


function AlertRepeated( {openRepeated, setOpenRepeated } :  AlertRepeatedProps ) {


    const handleClose = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setOpenRepeated(false);
    };

    return (
        <Dialog
            open={openRepeated}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                {"To-Do already added to the list!"}
            </DialogTitle>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertRepeated