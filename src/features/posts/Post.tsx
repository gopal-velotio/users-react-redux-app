import React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Collapse,
  CardActions,
  IconButton
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './Posts.css';
import moment from 'moment';
import Comments from 'features/comments/Comments';

export interface PostProps {
  id: string;
  text: string;
  image: string;
  likes: number;
  published: string;
}

const Post: React.FC<PostProps> = ({id, text, image, likes, published }) => {
  const date = moment(published).format('DD MMM YY');
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
        <CardActions disableSpacing>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <span>Comments</span>  <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Comments postId={id} />
        </CardContent>
      </Collapse>
      </CardContent>
    </Card>
  );
};

export default Post;
