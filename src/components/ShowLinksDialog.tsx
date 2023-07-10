import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button } from "@mui/material";

interface IShowLinksDialogProps {
  open: boolean;
  closeDialog: () => void;
  selectedCategory: string
}

const ShowLinksDialog = ({ open, closeDialog, selectedCategory }: IShowLinksDialogProps) => {
  return (
    <>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>Category Links</DialogTitle>
        <DialogContent>

          <Typography variant="h4">Link</Typography>
          <br />
          <div>
            <Typography variant="subtitle1">RSS {selectedCategory}:</Typography>
            <a href={`https://www.infokanal.com/${selectedCategory}_rss.xml`} target="_blank" rel="noopener">https://www.infokanal.com/{selectedCategory}_rss.xml</a>
          </div>
          <div>
            <Typography variant="subtitle1">
              Vertical integrations {selectedCategory}: </Typography>
            <a href={`https://www.infokanal.com/admin/${selectedCategory}.html`} target="_blank" rel="noopener">https://www.infokanal.com/admin/{selectedCategory}.html</a>

          </div>
          <div>
            <Typography variant="subtitle1">
              Horizontal integration {selectedCategory}: </Typography>
            <a href={`https://www.infokanal.com/admin/${selectedCategory}_horizontal.html`} target="_blank" rel="noopener">https://www.infokanal.com/admin/{selectedCategory}_horizontal.html</a>

          </div>

        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ShowLinksDialog;