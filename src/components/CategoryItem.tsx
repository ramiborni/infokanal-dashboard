import { Autocomplete, Chip, TextField } from "@mui/material";
import { useState } from "react";
import { ICategory } from "../interfaces/category.interface";

export interface IPropsCategoryItem{
    category: ICategory
}

const CategoryItem = ({category}:IPropsCategoryItem) => {

    const alreadySavedKeywords = category.keywords;
    const [selectedKeywords, setKeywords] = useState<string[]>(alreadySavedKeywords);

    return (
        <>

            <Autocomplete
                style={{ paddingTop: "10px" }}
                multiple
                id="keywords1"
                freeSolo
                fullWidth
                placeholder="1"

                value={selectedKeywords}
                onChange={(event, newValue) => {
                    setKeywords([...newValue]);
                }}
                options={alreadySavedKeywords}
                getOptionLabel={(option) => option}
                renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                        <Chip label={option} {...getTagProps({ index })} />
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        required
                        {...params}
                        label="Haugaland Keywords"
                        placeholder="Haugaland keyword"
                    />
                )}
            />
        </>
    )
}


export default CategoryItem;