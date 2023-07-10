import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Autocomplete, Chip } from "@mui/material";
import { useState } from "react";
import { ICategory } from "../interfaces/category.interface";

interface IAddCategoryDialogProps {
    open: boolean;
    closeDialog: () => void;
    saveNewCategory: (category: ICategory) => void;
}

const AddCategoryDialog = ({ open, closeDialog, saveNewCategory }: IAddCategoryDialogProps) => {
    const [newCategory, setNewCategory] = useState<ICategory>({
        category_name: "",
        page_title: "",
        page_title_horizontal: "",
        keywords: [],
        negative_keywords: [],
    });

    const save = () => {
        saveNewCategory(newCategory)
        setNewCategory({
            category_name: "",
            page_title: "",
            page_title_horizontal: "",
            keywords: [],
            negative_keywords: [],
        });
        closeDialog()
    }

    return (
        <Dialog open={open} onClose={closeDialog}>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To add a new category to the settings, please enter the category's name. Additionally, provide a title to be displayed in the vertical iframe, a horizontal title for the horizontal iframe, and specify keywords for the scrapper to selectively choose from.
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    value={newCategory?.category_name}
                    onChange={(e) =>
                        setNewCategory({
                            ...newCategory,
                            category_name: e.target.value,
                        })
                    }
                    id="category_name"
                    label="Category Name"
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="page_title"
                    label="Page Title (Vertical)"
                    value={newCategory.page_title}
                    onChange={(e) =>
                        setNewCategory({
                            ...newCategory,
                            page_title: e.target.value,
                        })
                    }
                    fullWidth
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="page_title_horizontal"
                    label="Page Title (horizontal)"
                    value={newCategory.page_title_horizontal}
                    onChange={(e) =>
                        setNewCategory({
                            ...newCategory,
                            page_title_horizontal: e.target.value,
                        })
                    }
                    fullWidth
                />
                <Autocomplete
                    style={{ paddingTop: "10px" }}
                    multiple
                    id="keywords1"
                    freeSolo
                    fullWidth
                    placeholder="1"

                    value={newCategory.keywords}
                    onChange={(event, newValue) => {
                        setNewCategory({
                            ...newCategory,
                            keywords: [...newValue]
                        }
                        );
                    }}
                    options={[]}
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
                            label="Keywords"
                            placeholder="keywords"
                        />
                    )}
                />
                <Autocomplete
                    style={{ paddingTop: "10px" }}
                    multiple
                    id="negativekeywords1"
                    freeSolo
                    fullWidth
                    placeholder="1"

                    value={newCategory.negative_keywords}
                    onChange={(event, newValue) => {
                        setNewCategory({
                            ...newCategory,
                            negative_keywords: [...newValue]
                        }
                        );
                    }}
                    options={[]}
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
                            label="Negative Keywords"
                            placeholder="Negative keywords"
                        />
                    )}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>Cancel</Button>
                <Button onClick={save}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddCategoryDialog;