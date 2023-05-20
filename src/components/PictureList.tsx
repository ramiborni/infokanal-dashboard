import React, { FC } from 'react';
import { Button, Card, CardMedia, makeStyles } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Picture {
  id: number;
  url: string;
}

interface PictureCardProps {
  picture: Picture;
  onDelete: (id: number) => void;
}

interface PictureListProps {
  pictures: Picture[];
  deletePicture: (id: number) => void;
}


const PictureCard: FC<PictureCardProps> = ({ picture, onDelete }) => {

  return (
    <Card style={{
      position: 'relative',
      width: 200,
      height: 200,
      margin: 10,
    }}>
      <CardMedia style={{
        height: '100%',
        width: '100%',
      }} image={picture.url} />
      <Button
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
        onClick={() => onDelete(picture.id)}
        variant="contained"
        color="secondary"
      >
        <DeleteIcon />
      </Button>
    </Card>
  );
};

const PictureList: FC<PictureListProps> = ({ pictures, deletePicture }) => {
  return (
    <div>
      {pictures.map((picture) => (
        <PictureCard
          key={picture.id}
          picture={picture}
          onDelete={deletePicture}
        />
      ))}
    </div>
  );
};

export default PictureList;