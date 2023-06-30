import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { ICategory } from "../interfaces/category.interface";
import AddCategoryDialog from "./AddCategoryDialog";
import { useState } from "react";

interface IPropCategoryList {
    categories: ICategory[];
    addNewCategory: (category: ICategory) => void;
}

const CategoryList = ({ categories, addNewCategory }: IPropCategoryList) => {

    const [openAddCategory, setOpenAddCategory] = useState(false);

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

    const openEditCategory = (category_name:string) => {

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
                        <Table sx={{  }} aria-label="simple table">
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
                                        
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Box>
            </Paper>
            <AddCategoryDialog open={openAddCategory} closeDialog={closeAddCategoryHandler} saveNewCategory={saveNewCategory} />
        </>
    );
}

export default CategoryList;



/*


                <Typography variant="h4">Link</Typography>
                <br />
                <div>
                  <Typography variant="subtitle1">RSS Haugaland:</Typography>
                  <a href="https://www.infokanal.com/haugaland_rss.xml" target="_blank" rel="noopener">https://www.infokanal.com/haugaland_rss.xml</a>
                </div>
                <div>
                  <Typography variant="subtitle1">
                    RSS Sunnhordland:
                  </Typography>
                  <a href="https://www.infokanal.com/sunnhordland_rss.xml" target="_blank" rel="noopener">https://www.infokanal.com/sunnhordland_rss.xml</a>
                </div>
                <div>
                  <Typography variant="subtitle1">
                    Vertical integrations Haugaland: </Typography>
                  <a href="https://www.infokanal.com/admin/haugaland.html" target="_blank" rel="noopener">https://www.infokanal.com/admin/haugaland.html</a>

                </div>
                <div>
                  <Typography variant="subtitle1">
                    Vertical integrations Sunnhordland: </Typography>
                  <a href="https://www.infokanal.com/admin/sunnhordland.html" target="_blank" rel="noopener">https://www.infokanal.com/admin/sunnhordland.html</a>

                </div>
                <div>
                  <Typography variant="subtitle1">
                    Horizontal integration Haugaland: </Typography>
                  <a href="https://www.infokanal.com/admin/haugaland_horizontal.html" target="_blank" rel="noopener">https://www.infokanal.com/admin/haugaland_horizontal.html</a>

                </div>

                <div>
                  <Typography variant="subtitle1">
                    Horizontal integration Sunnhordland:
                  </Typography>
                  <a href="https://www.infokanal.com/admin/sunnhordland_horizontal.html" target="_blank" rel="noopener">https://www.infokanal.com/admin/sunnhordland_horizontal.html</a>
                </div>


*/