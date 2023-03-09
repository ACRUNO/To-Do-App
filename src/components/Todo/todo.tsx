import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import AlertRepeated from "../Alerts/AlertRepeated";
import { Items } from "../Helpers/estados";
import s from "../Todo/todo.module.css";


interface InputProps {
    setListItems: Dispatch<SetStateAction<Items[]>>,
    listItems: Items[]
}


function Todo({ setListItems, listItems }: InputProps) {

    //estado local que guarda lo que se escriba en el input
    const [input, setInput] = useState<string>('')
    //estado local que controla el Dialog
    const [openRepeated, setOpenRepeated] = useState<boolean>(false);

    //funcion que escucha a los cambios en el input y los guarda en el estado local
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        setInput(e.target.value)
    }

    //funcion que escucha el click al boton Add To-do
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim()) return;
        //pregunta si lo que esta escrito ya esta agregado en la lista. Si esta agregado muestra un dialogo
        for (const item of listItems) {
            if (item.task === input.trim().toUpperCase()) return setOpenRepeated(true);
        }
        setListItems([...listItems, { id: listItems.length ? listItems[listItems.length - 1].id + 1 : 0, task: input.trim().toUpperCase(), completed: false }])
        setInput('')
    }

    return (
        <Box className={s.container}>
            <form onSubmit={handleSubmit}>
                <Box className={s.form} >
                    <Box>
                        <TextField
                            className={s.textField}
                            label="Add a to-do"
                            variant="outlined"
                            value={input}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box>
                        <Button
                            color="primary"
                            type="submit"
                            variant="contained"
                            className={s.formButton}
                        >Add to-do</Button>
                    </Box>
                </Box>
            </form>
            {
                openRepeated &&
                <AlertRepeated
                    openRepeated={openRepeated}
                    setOpenRepeated={setOpenRepeated}
                />
            }
        </Box>
    );
}

export default Todo;
