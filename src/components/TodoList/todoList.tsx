import { Box, Button, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import React, { useEffect, useState } from 'react'
import Todo from '../Todo/todo'
import AlertRepeated from "../Alerts/AlertRepeated";
import AlertDelete from '../Alerts/AlertDelete';
import AlertEdit from '../Alerts/AlertEdit';
import { Items } from '../Helpers/estados';
import s from '../TodoList/todoList.module.css';

function TodoList() {

    const [listItems, setListItems] = useState<Items[]>(
        //carga los datos almacenados en el local storage, en caso de que no haya guarda un array vacio
        () => {
        const itemsJson = localStorage.getItem('listItems');
        const items = itemsJson ? JSON.parse(itemsJson) : [];
        return items || [];
    });

    const [filteredListItems, setFilteredListItems] = useState<Items[]>([])

    //toma el indice del elemento que quiero borrar
    const [selectedIndexDelete, setSelectedIndexDelete] = useState<number | null>(null);

    //toma el indice del elemento que quiero editar
    const [selectedIndexEdit, setSelectedIndexEdit] = useState<number | null>(null);

    //En principio guarda el texto a editar, luego el texto editado.
    const [editedText, setEditedText] = useState<string>('');

    const [openRepeated, setOpenRepeated] = useState<boolean>(false);

    const [selectedButton, setSelectedButton] = useState<string>("All");

    const filterButtons = ["All", "Pending", "Completed"];

    useEffect(() => {
        //guarda los datos en el local storage, escuchando a listItems
        localStorage.setItem('listItems', JSON.stringify(listItems));
        handleFilters(listItems, selectedButton);
    }, [listItems])


    //abre el Dialog de Delete
    const handleOpenDialogDelete = (e: React.MouseEvent<HTMLElement>, index: number) => {
        e.preventDefault();
        setSelectedIndexDelete(index)
    }

    //abre el Dialog de Edicion
    const handleOpenDialogEdit = (e: React.MouseEvent<HTMLElement>, index: number, task: string) => {
        e.preventDefault();
        setSelectedIndexEdit(index)
        setEditedText(task)
    }

    //modifica el valor de completed de los items de la lista.
    const handleCompletedTask = (e: React.MouseEvent<HTMLElement>, index: number) => {
        e.preventDefault();
        const newListItems = listItems.map((item, i) => {
            return index === item.id ? { ...item, completed: !item.completed } : item
        })
        setListItems(newListItems)
    }

    const handleFilters = (allItems: Items[], type: string) => {
        setSelectedButton(type);
        switch (type) {
            case "All":
                setFilteredListItems(allItems);
                return;
            case "Pending":
                const filteredItemsPending = allItems.filter(items => items.completed === false);
                setFilteredListItems(filteredItemsPending);
                return
            case "Completed":
                const filteredItemsCompleted = allItems.filter(items => items.completed === true);
                setFilteredListItems(filteredItemsCompleted);
                return
            default:
                return allItems;
                
        }
    }

    return (
        <div>
            <Todo listItems={listItems} setListItems={setListItems} />
            <Box className={s.buttonsContainer} >
                {
                    filterButtons.map((buttons, i) => {
                        return (
                            <Button key={i} className={s.buttons} variant={selectedButton === buttons ? "contained" : 'outlined'} onClick={() => {handleFilters(listItems, buttons)}}>{buttons}</Button>
                        )
                    })
                }
            </Box>
            <List className={s.list}>
                {
                    filteredListItems?.map((l) => {
                        return (
                            <ListItem key={l.id} className={l.completed ? s.listItemTrue : s.listItemFalse}>
                                <ListItemAvatar>
                                    <IconButton edge="end" aria-label="completed" onClick={e => handleCompletedTask(e, l.id)}>
                                        <TaskAltIcon color={l.completed ? "success" : "primary"} />
                                    </IconButton>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography style={{ textDecoration: l.completed ? "line-through" : "none" }} noWrap>{l.task}</Typography>
                                </ListItemText>
                                <IconButton edge="end" aria-label="edit" onClick={e => handleOpenDialogEdit(e, l.id, l.task)}>
                                    <ModeEditOutlineOutlinedIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={e => handleOpenDialogDelete(e, l.id)}>
                                    <DeleteIcon color='error' />
                                </IconButton>

                                {
                                    selectedIndexDelete === l.id &&
                                    <AlertDelete 
                                        setSelectedIndexDelete={setSelectedIndexDelete}
                                        selectedIndexDelete={selectedIndexDelete}
                                        listItems={listItems}
                                        setListItems={setListItems}
                                        id={l.id}
                                    />
                                }

                                {
                                    selectedIndexEdit === l.id &&
                                    <AlertEdit 
                                        setSelectedIndexEdit={setSelectedIndexEdit}
                                        selectedIndexEdit={selectedIndexEdit}
                                        setEditedText={setEditedText}
                                        editedText={editedText}
                                        listItems={listItems}
                                        setListItems={setListItems}
                                        setOpenRepeated={setOpenRepeated}
                                        id={l.id}
                                    />
                                }

                                { 
                                openRepeated &&
                                <AlertRepeated
                                    openRepeated={openRepeated}
                                    setOpenRepeated={setOpenRepeated}
                                />
                                }
                            </ListItem>
                        )
                    })
                }
            </List>
        </div>
    )
}

export default TodoList