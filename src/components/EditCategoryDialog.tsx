import { useEffect, useState } from "react";
import { ICategory } from "../interfaces/category.interface";
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Autocomplete, Chip, DialogActions, Button } from "@mui/material";

interface IEditCategoryDialogProps {
    open: boolean;
    closeDialog: () => void;
    saveEditedCategory: (oldCategoryName: string, category: ICategory) => void;
    selectedCategory: ICategory;
}
const EditCategoryDialog = ({
    open,
    closeDialog,
    saveEditedCategory,
    selectedCategory,
}: IEditCategoryDialogProps) => {

    const [editCategory, setEditCategory] = useState<ICategory>(selectedCategory);

    useEffect(() => {
        setEditCategory(selectedCategory)
    }, [open, selectedCategory])

    const save = () => {
        saveEditedCategory(selectedCategory.category_name, editCategory ? editCategory : selectedCategory)
        closeDialog()
    }

    return (
        <>
            <Dialog open={open} onClose={closeDialog}>
                <DialogTitle>Edit "<b>{editCategory?.category_name}</b>" Category</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To edit this category, please enter the category's name. Additionally, provide a title to be displayed in the vertical iframe, a horizontal title for the horizontal iframe, and specify keywords for the scrapper to selectively choose from.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        value={editCategory?.category_name}
                        onChange={(e) =>
                            setEditCategory({
                                ...editCategory,
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
                        value={editCategory.page_title}
                        onChange={(e) =>
                            setEditCategory({
                                ...editCategory,
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
                        value={editCategory.page_title_horizontal}
                        onChange={(e) =>
                            setEditCategory({
                                ...editCategory,
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

                        value={editCategory.keywords}
                        onChange={(event, newValue) => {
                            setEditCategory({
                                ...editCategory,
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

                        value={editCategory.negative_keywords}
                        onChange={(event, newValue) => {
                            setEditCategory({
                                ...editCategory,
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
        </>
    )
}

export default EditCategoryDialog;