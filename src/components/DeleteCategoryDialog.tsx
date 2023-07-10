import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

interface IDeleteCategoryDialogProps {
    open: boolean;
    closeDialog: () => void;
    selectedCategory: string;
    deleteCategory: (category: string) => void;
}

const DeleteCategoryDialog = ({ open, closeDialog, selectedCategory, deleteCategory }: IDeleteCategoryDialogProps) => {

    const deleteHandler = () => {
        deleteCategory(selectedCategory);
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={closeDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Delete This category?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you really want to delete this category (<b>{selectedCategory}</b>)?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Close</Button>
                    <Button onClick={deleteHandler} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DeleteCategoryDialog;