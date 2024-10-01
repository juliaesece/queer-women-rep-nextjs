"use client"
import { useState } from 'react';
import { Box, TextField, List, ListItem, ListItemText, Typography } from '@mui/material';
import st from "./reviews.module.css"
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';
import { postReview } from './_actions/postReview';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#E0C2FF',
    },
  },
});

const ReviewsComponent = ({ reviews, session }) => {
  const MAX_CHARACTERS = 1000;
  const [clientReviews, setClientReviews] = useState(reviews.reviews);
  const [newReview, setNewReview] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      alert("You need to be logged in to submit a review")
      return
    }
    if (!session.user.username) {
      alert("You need to have a username to submit a review")
      return
    }

    if (newReview.length >= MAX_CHARACTERS) {
      alert("No more than 1000 characters")
      return
    }

    const newServerReview = {
      review: newReview,
      username: session.user.username,
      userId: session.user._id,
      date: new Date()
    }

    const res = await postReview(reviews._id, newServerReview)
    if (!res) alert("There was an error")
    setClientReviews([...clientReviews, newServerReview]);
    setNewReview('');
  };

  const handleReviewChange = (e) => {
    const input = e.target.value;
    setNewReview(input);

    if (input.length >= MAX_CHARACTERS) {
      alert("No more than 1000 characters")
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className={st.container}>
        <h3>
          Reviews
        </h3>
        <List className={st.listContainer}>
          {clientReviews.map((review) => (
            <ListItem key={review.date} divider>
              <em>{review.username}</em>:
              <ListItemText primary={review.review} sx={{ ml: 2 }} />
            </ListItem>
          ))}
        </List>

        {clientReviews.length === 0 && (
          <Typography variant="body2" align="center">
            No reviews yet. Be the first to review!
          </Typography>
        )}

        <div>
          {session ?
            <form onSubmit={handleSubmit} className={st.form}>
              <TextField
                fullWidth
                label="Add a review"
                variant="outlined"
                value={newReview}
                onChange={(e) => handleReviewChange(e)}
                color="primary"
                sx={{ mb: 2 }}
                multiline
              />
              <button type="submit">
                Post Review
              </button>
            </form>
            :
            <Typography variant="body2" align="center">
              You need to be logged in to submit a review.
            </Typography>
          }
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default ReviewsComponent;