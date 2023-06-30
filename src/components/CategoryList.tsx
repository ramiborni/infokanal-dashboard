import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Edit, Link } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { ICategory } from "../interfaces/category.interface";
import AddCategoryDialog from "./AddCategoryDialog";
import { useState } from "react";
import ShowLinksDialog from "./ShowLinksDialog";
import EditCategoryDialog from "./EditCategoryDialog";

interface IPropCategoryList {
    categories: ICategory[];
    addNewCategory: (category: ICategory) => void;
}

const CategoryList = ({ categories, addNewCategory }: IPropCategoryList) => {

    const [openAddCategory, setOpenAddCategory] = useState(false);
    const [openShowLinks, setOpenShowLinks] = useState(false);
    const [openEditCategory, setOpenEditCategory] = useState(false);
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

    const saveNewCategory = (category:ICategory) => {
        addNewCategory(category);
        closeAddCategoryHandler();
    }

    const openEditCategoryHandler = (category_name:string) => {
        setSelectedCategory(category_name);

    }

    const closeEditCategoryHandler = () => {
        setOpenEditCategory(false);
        setSelectedCategory("");
    }

    const saveEditedCategory = (category: ICategory) => {
        
    }

    const capitalizeFirstLetter = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

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
                    <br/>
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
                                                onClick={() => openEditCategory(row.category_name)}
                                            >
                                                <Edit />
                                            </IconButton>

                                            <IconButton
                                                onClick={() => openShowLinksHandler(row.category_name)}
                                            >
                                                <Link />
                                            </IconButton>
                                        
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Box>
            </Paper>
            <AddCategoryDialog open={openAddCategory} closeDialog={closeAddCategoryHandler} saveNewCategory={saveNewCategory} />
            <EditCategoryDialog open={openAddCategory} closeDialog={closeAddCategoryHandler} selectedCategory={selectedCategory} saveEditedCategory={saveEditedCategory} />
            <ShowLinksDialog open={openShowLinks} closeDialog={closeShowLinks} selectedCategory={selectedCategory} />
        </>
    );
}

export default CategoryList;



/*



*/