import { ICategory } from "../interfaces/category.interface";

interface IEditCategoryDialogProps{
    open: boolean;
    closeDialog: () => void;
    saveEditedCategory: (category: ICategory) => void;
    selectedCategory: ICategory
}
const EditCategoryDialog = ({
    open,
    closeDialog,
    saveEditedCategory,
    selectedCategory
} : IEditCategoryDialogProps) => {
    const [newCategory, setNewCategory] = useState<ICategory>({
        category_name: "",
        page_title: "",
        page_title_horizontal: "",
        keywords: []
    });

    const save = () => {
        saveNewCategory(newCategory)
    }

    return (
        <>
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