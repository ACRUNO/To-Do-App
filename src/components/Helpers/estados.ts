export type Items = {
    id:number,
    task: string,
    completed: boolean
}

export interface AlertEditProps {
    setSelectedIndexEdit: React.Dispatch<React.SetStateAction<number | null>>,
    selectedIndexEdit: number,
    setEditedText: React.Dispatch<React.SetStateAction<string>>,
    editedText: string,
    listItems: Items[],
    setListItems: React.Dispatch<React.SetStateAction<Items[]>>,
    setOpenRepeated: React.Dispatch<React.SetStateAction<boolean>>,
    id: number
}

export interface AlertDeleteProps {
    setSelectedIndexDelete: React.Dispatch<React.SetStateAction<number | null>>,
    selectedIndexDelete: number
    listItems: Items[],
    setListItems: React.Dispatch<React.SetStateAction<Items[]>>,
    id: number
}

export interface AlertRepeatedProps {
    openRepeated: boolean,
    setOpenRepeated: React.Dispatch<React.SetStateAction<boolean>>
}