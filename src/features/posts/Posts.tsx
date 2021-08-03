import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchPostsAsync, selectPosts } from 'features/posts/postSlice';
import { useEffect } from 'react';
import { Grid, Container } from '@material-ui/core';
import Post from 'features/posts/Post';

interface PostsProps {
  userId: string;
}

const Posts: React.FC<PostsProps> = (props) => {
  const posts = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  const userId = props.userId;

  useEffect(() => {
    dispatch(fetchPostsAsync(userId));
  }, [dispatch, userId]);

  return (
    <Container>
      <Grid item xs={12}>
        <Grid container justifyContent='center' spacing={2}>
          {posts &&
            posts.map((post, i) => {
              return (
                <Grid key={i} item>
                  <Post
                    text={post.text}
                    image={post.image}
                    likes={post.likes}
                    published={post.publishDate}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Posts;
