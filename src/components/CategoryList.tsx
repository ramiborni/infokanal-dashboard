import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Delete, Edit, Link } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { ICategory } from "../interfaces/category.interface";
import AddCategoryDialog from "./AddCategoryDialog";
import { useState } from "react";
import ShowLinksDialog from "./ShowLinksDialog";
import EditCategoryDialog from "./EditCategoryDialog";
import DeleteCategoryDialog from "./DeleteCategoryDialog";

interface IPropCategoryList {
    categories: ICategory[];
    addNewCategory: (category: ICategory) => void;
    deleteCategory: (category_name: string) => void;
    editCategory: (oldCategoryName: string, category: ICategory) => void;
}

const CategoryList = ({ categories, addNewCategory, deleteCategory, editCategory }: IPropCategoryList) => {

    const [openAddCategory, setOpenAddCategory] = useState(false);
    const [openShowLinks, setOpenShowLinks] = useState(false);
    const [openEditCategory, setOpenEditCategory] = useState(false);
    const [openDeleteDialog, setOpenDeleteCategory] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>("");


    const openShowLinksHandler = (category_name: string) => {
        setSelectedCategory(category_name);
        setOpenShowLinks(true);
    }

    const closeShowLinks = () => {
        setOpenShowLinks(false);
        setSelectedCategory("");
    }

    const openAddCategoryHandler = () => {
        setOpenAddCategory(true);
    }

    const closeAddCategoryHandler = () => {
        setOpenAddCategory(false);
    }

    const saveNewCategory = (category: ICategory) => {
        addNewCategory(category);
        closeAddCategoryHandler();
    }

    const openEditCategoryHandler = (category_name: string) => {
        setSelectedCategory(category_name);
        setOpenEditCategory(true);
    }

    const closeEditCategoryHandler = () => {
        setOpenEditCategory(false);
        setSelectedCategory("");
    }

    const openDeleteCategoryHandler = (category_name: string) => {
        setOpenDeleteCategory(true);
        setSelectedCategory(category_name);
    }

    const closeDeleteCategoryHandler = () => {
        setOpenDeleteCategory(false);
        setSelectedCategory("");
    }

    const deleteCategoryHandler = (category_name: string) => {
        deleteCategory(category_name);
        setOpenDeleteCategory(false);
    }

    const saveEditedCategory = (oldCategoryName: string ,category: ICategory) => {
        editCategory(oldCategoryName,category)

    }

    const capitalizeFirstLetter = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

    return (
        <>
            <Paper
                variant="outlined"
                sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
                <Box
                    style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        width: '100%',
                        display: 'inline-block'
                    }}
                >
                    <Typography variant="h4">Categories</Typography>
                    <br />
                    <Grid container justifyContent="flex-end">
                        <Button onClick={openAddCategoryHandler}>
                            <AddIcon />
                            Add Category
                        </Button>
                    </Grid>
                    <br />
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Category Name</TableCell>
                                    <TableCell align="center">Keywords</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {categories.map((row) => (
                                    <TableRow
                                        key={row.category_name}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {capitalizeFirstLetter(row.category_name)}
                                        </TableCell>
                                        <TableCell align="center">{row.keywords.length}</TableCell>
                                        <TableCell align="right">

                                            <IconButton
                                                onClick={() => openShowLinksHandler(row.category_name)}
                                            >
                                                <Link />
                                            </IconButton>

                                            <IconButton
                                                onClick={() => openEditCategoryHandler(row.category_name)}
                                            >
                                                <Edit />
                                            </IconButton>

                                            <IconButton
                                                onClick={() => openDeleteCategoryHandler(row.category_name)}
                                            >
                                                <Delete />
                                            </IconButton>

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Box>
            </Paper>
            {
                console.log(
                    categories.find(c => c.category_name === selectedCategory) ?? {
                        category_name: "", page_title: "", page_title_horizontal: "", keywords: []
                    }
                )
            }
            <AddCategoryDialog open={openAddCategory} closeDialog={closeAddCategoryHandler} saveNewCategory={saveNewCategory} />
            <EditCategoryDialog open={openEditCategory} closeDialog={closeEditCategoryHandler} selectedCategory={
                categories.find(c => c.category_name === selectedCategory) ?? {
                    category_name: "", page_title: "", page_title_horizontal: "", keywords: [], negative_keywords: []
                }
            } saveEditedCategory={saveEditedCategory} />
            <DeleteCategoryDialog open={openDeleteDialog} closeDialog={closeDeleteCategoryHandler} selectedCategory={
                selectedCategory
            } deleteCategory={deleteCategoryHandler} />
            <ShowLinksDialog open={openShowLinks} closeDialog={closeShowLinks} selectedCategory={selectedCategory} />
        </>
    );
}

export default CategoryList;



/*



*/