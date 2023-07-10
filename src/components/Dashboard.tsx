import {
  Alert,
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Delete, Edit, Image } from "@mui/icons-material";
import axios from "axios";
import PictureList from "./PictureList";
import { IPropsCategoryItem } from "./CategoryItem";
import CategoryList from "./CategoryList";
import { ICategory } from "../interfaces/category.interface";

interface IDashboardProps {
  config: {
    twitter_accounts: {
      username: string;
      prefix: string;
      suffix: string;
      images: string[];
    }[];
    within_time: string;
    show_items: number;
    categories: ICategory[];
  },
  setConfigData: React.Dispatch<any>
}

const Dashboard = ({ config, setConfigData }: IDashboardProps) => {

  const [withinTime, setWithinTime] = useState<string>(config.within_time)
  const [showItems, setShowItems] = useState<number>(config.show_items || 0)
  const [categories, setCategories] = useState(config.categories)
  const [twitterAccounts, setTwitterAccounts] = useState(config.twitter_accounts);
  const [openNewTwitterAccDialog, setOpenNewTwitterAccDialog] = useState(false);
  const [openDeleteTwitterAccDialog, setOpenDeleteNewTwitterAccDialog] =
    useState(false);
  const [openPicsTwitterAccDialog, setOpenPicsNewTwitterAccDialog] =
    useState(false);
  const [openEditTwitterAccDialog, setOpenEditNewTwitterAccDialog] =
    useState(false);
  const [newAccData, setNewAccData] = useState<{
    username: string
    prefix: string
    suffix: string
    images: string[]
  }>({
    username: "",
    prefix: "",
    suffix: "",
    images: []
  });
  const [selectedTwitterAccount, setSelectedTwitterAccount] =
    useState<string>();

  const [openSnackbar, setOpenSnackbar] = useState(false);


  const addNewCategory = (category: ICategory) => {
    setCategories([...categories, category]);
  }

  const deleteCategory = (category_name: string) => {
    setCategories(c => c.filter(item => item.category_name !== category_name));
  }

  const editCategory = (oldCategoryName: string, category: ICategory) => {
    setCategories((prevCategories =>
      prevCategories.map(prevCategory =>
        prevCategory.category_name === oldCategoryName ? category : prevCategory
      )
    ));
  }

  const openEditTwitterAccount = (username: string) => {
    selectTwitterAccount(username);
    const acc = twitterAccounts.find((user) => user.username === username)!;
    setNewAccData({
      username: username,
      prefix: acc.prefix,
      suffix: acc.suffix,
      images: acc.images
    });
    handleOpenEditTwitterAccDialog();
  };

  const openDeleteTwitterAccount = (username: string) => {
    selectTwitterAccount(username);
    handleOpenDeleteTwitterAccDialog();
  };

  const openPicsTwitterAccount = (username: string) => {
    selectTwitterAccount(username);
    handleOpenPicsTwitterAccDialog();
  }

  const selectTwitterAccount = (username: string) => {
    setSelectedTwitterAccount(username);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  const handleClickOpenNewAccDialog = () => {
    setOpenNewTwitterAccDialog(true);
  };

  const handleClosePicsTwitterAccDialog = () => {
    setOpenPicsNewTwitterAccDialog(false);
  }

  const handleCloseNewAccDialog = () => {
    setOpenNewTwitterAccDialog(false);
  };

  const handleCloseDeleteTwitterAccDialog = () => {
    setOpenDeleteNewTwitterAccDialog(false);
  };

  const handleOpenDeleteTwitterAccDialog = () => {
    setOpenDeleteNewTwitterAccDialog(true);
  };

  const handleOpenPicsTwitterAccDialog = () => {
    setOpenPicsNewTwitterAccDialog(true);
  }

  const handleCloseEditTwitterAccDialog = () => {
    setOpenEditNewTwitterAccDialog(false);
  };

  const handleOpenEditTwitterAccDialog = () => {
    setOpenEditNewTwitterAccDialog(true);
  };

  const saveNewAcc = () => {
    if (
      newAccData.username == null ||
      newAccData.prefix == null ||
      newAccData.suffix == null
    ) {
      alert("You should fill all fields");
    } else {
      setTwitterAccounts([...twitterAccounts, newAccData]);
      setNewAccData({
        username: "",
        prefix: "",
        suffix: "",
        images: []
      });
      handleCloseNewAccDialog();
    }
  };

  const deleteTwitterAccount = () => {
    setTwitterAccounts(
      twitterAccounts.filter((user) => user.username !== selectedTwitterAccount)
    );
    handleCloseDeleteTwitterAccDialog();
  };

  const editTwitterAccount = () => {
    const updatedTwitterAccounts = twitterAccounts.map((user) => {
      if (user.username === selectedTwitterAccount) {
        return newAccData;
      } else {
        return user;
      }
    });
    console.log(updatedTwitterAccounts);
    setTwitterAccounts(updatedTwitterAccounts);
    handleCloseEditTwitterAccDialog();
    setNewAccData({
      username: "",
      suffix: "",
      prefix: "",
      images: [],
    });
  };

  const addPicture = () => {

  }

  const deletePicture = () => {

  }

  const saveData = async () => {
    if (withinTime == '' && showItems == 0) {
      alert("At least one of 'Scrapper Within Time' or 'Number of News Displayed' should be declared and set with a value. Please specify either 'Within Time' or 'Number of News Displayed' in the configuration settings.")
      return;
    }
    const data = {
      within_time: withinTime,
      show_items: showItems,
      categories: categories,
      twitter_accounts: twitterAccounts
    }
    try {
      await axios.post('https://api.infokanal.com/update-config', data)
      setConfigData(data)
      setOpenSnackbar(true)
    } catch (e) {
      alert('config saving has been failed, please try again.')
    }
  }

  useEffect(() => {
    if (config.categories !== categories) {
      saveData()
    }
  }, [categories])

  return (
    <>
      <AppBar
        position="absolute"
        color="default"
        elevation={3}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            InfoKanal Settings
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={8}>
            <Paper
              variant="outlined"
              sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <Typography variant="h4">RSS Scrapper Settings</Typography>
                <br />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="time"
                  label="Scrapper Within Time"
                  name="time"
                  autoComplete="time"
                  placeholder="10h"
                  value={withinTime}
                  onChange={(e) => setWithinTime(e.target.value)}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="number"
                  id="showitems"
                  label="Number of news displayed"
                  helperText="Setting this field to 0 will disable it in the scraper. If you set a different number, it will establish a priority for this field, causing the scraper to disregard the 'Within Time' parameter."
                  name="time"
                  autoComplete="time"
                  placeholder="10h"
                  value={showItems}
                  onChange={(e) => setShowItems(Number(e.target.value))}
                  autoFocus
                />
                <br />
                <br />

                <Divider />
                <br />
                <Typography variant="h5"> Twitter Accounts</Typography>
                <Grid container justifyContent="flex-end">
                  <Button onClick={handleClickOpenNewAccDialog}>
                    <AddIcon />
                    Add Twitter Account
                  </Button>
                </Grid>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell align="left">Prefix</TableCell>
                        <TableCell align="left">Suffix</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {twitterAccounts.map((row) => (
                        <TableRow
                          key={row.username}
                          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.username}
                          </TableCell>
                          <TableCell align="left">{row.prefix}</TableCell>
                          <TableCell align="left">{row.suffix}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              onClick={() => openEditTwitterAccount(row.username)}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              onClick={() => openPicsTwitterAccount(row.username)}
                            >
                              <Image />
                            </IconButton>
                            <IconButton
                              onClick={() => openDeleteTwitterAccount(row.username)}
                            >
                              <Delete />
                            </IconButton>

                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Divider />


              </Box>

            </Paper>
            <Button
              onClick={saveData}
              fullWidth
              size="large"
              variant="contained"
              sx={{ mb: 2 }}
            >
              SAVE
            </Button>
          </Grid>
          <Grid item xs={12} lg={4} style={{ textOverflow: 'ellipsis' }}>
            <CategoryList categories={categories} addNewCategory={addNewCategory} deleteCategory={deleteCategory} editCategory={editCategory} />
          </Grid>
        </Grid>

      </Container>
      <Dialog open={openNewTwitterAccDialog} onClose={handleCloseNewAccDialog}>
        <DialogTitle>Add New Twitter Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add to the settings new twitter account, please enter twitter
            account's username and also please enter a prefix and suffix to add
            to every tweet body
          </DialogContentText>

          <TextField
            autoFocus
            required
            margin="dense"
            value={newAccData.username}
            onChange={(e) =>
              setNewAccData({
                ...newAccData,
                username: e.target.value,
              })
            }
            id="username"
            label="Twitter account username"
            type="username"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="prefix"
            label="Prefix"
            value={newAccData.prefix}
            onChange={(e) =>
              setNewAccData({
                ...newAccData,
                prefix: e.target.value,
              })
            }
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="suffix"
            label="Suffix"
            value={newAccData.suffix}
            onChange={(e) =>
              setNewAccData({
                ...newAccData,
                suffix: e.target.value,
              })
            }
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewAccDialog}>Cancel</Button>
          <Button onClick={saveNewAcc}>Save</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openEditTwitterAccDialog}
        onClose={handleCloseEditTwitterAccDialog}
      >
        <DialogTitle>Edit Twitter Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit to the settings new twitter account, please edit twitter
            account's username or the prefix or suffix
          </DialogContentText>

          <TextField
            autoFocus
            required
            margin="dense"
            value={newAccData.username}
            onChange={(e) =>
              setNewAccData({
                ...newAccData,
                username: e.target.value,
              })
            }
            id="username"
            label="Twitter account username"
            type="username"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="prefix"
            label="Prefix"
            value={newAccData.prefix}
            onChange={(e) =>
              setNewAccData({
                ...newAccData,
                prefix: e.target.value,
              })
            }
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="suffix"
            label="Suffix"
            value={newAccData.suffix}
            onChange={(e) =>
              setNewAccData({
                ...newAccData,
                suffix: e.target.value,
              })
            }
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditTwitterAccDialog}>Cancel</Button>
          <Button onClick={editTwitterAccount}>Save</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleteTwitterAccDialog}
        onClose={handleCloseDeleteTwitterAccDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete Twitter Account?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete this account ({selectedTwitterAccount}
            )?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteTwitterAccDialog}>Close</Button>
          <Button onClick={deleteTwitterAccount} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openPicsTwitterAccDialog}
        onClose={handleClosePicsTwitterAccDialog}
      >
        <DialogTitle>Edit Images for Twitter Account pics</DialogTitle>
        <DialogContent>
          <PictureList pictures={[]} deletePicture={deletePicture} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePicsTwitterAccDialog}>Close</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => { setOpenSnackbar(false) }}
      >
        <Alert severity="success">Data saved successfully</Alert>
      </Snackbar>
    </>
  );
};

export default Dashboard;
