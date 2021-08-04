import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  fetchCommentsAsync,
  selectComments
} from 'features/comments/commentSlice';
import { useEffect } from 'react';
import { Grid, Container } from '@material-ui/core';

interface CommentsProps {
  postId: string;
}

const Comments: React.FC<CommentsProps> = (props) => {
  const comments = useAppSelector(selectComments);
  const dispatch = useAppDispatch();

  const postId = props.postId;

  useEffect(() => {
    dispatch(fetchCommentsAsync(postId));
  }, [dispatch, postId]);

  return (
    <Container>
      <Grid item xs={12}>
        <Grid container justifyContent='center' spacing={2}>
          {comments && comments.length > 0 ? (
            comments.map((comment, i) => {
              return (
                <Grid key={i} item>
                  <div>
                    <p>{comment.message}</p>
                  </div>
                </Grid>
              );
            })
          ) : (
            <p>No comments</p>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Comments;
