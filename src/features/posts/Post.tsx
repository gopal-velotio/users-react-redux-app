import React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import './Posts.css';
import moment from 'moment';

export interface PostProps {
  text: string;
  image: string;
  likes: number;
  published: string;
}

const Post: React.FC<PostProps> = ({ text, image, likes, published }) => {
  const date = moment(published).format('DD MMM YY');
  return (
    <Card>
      <CardHeader title={text.slice(0, 20)} />
      <CardMedia className='PostImage' image={image} title='Paella dish' />
      <CardContent>
        <Typography>
          <span>{date}</span>
          <span>
            <FavoriteIcon />
          </span>
          <span>{`  ${likes}`}</span>
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
