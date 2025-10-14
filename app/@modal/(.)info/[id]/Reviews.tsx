"use client"
import { useState } from 'react';
import st from "./reviews.module.css"
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';
import { postReview } from './_actions/postReview';
import { Session } from 'next-auth';
import { Review } from '@/app/utils/types';
import { use } from 'react'
import { useRouter } from 'next/navigation';

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

const ReviewsComponent = ({ reviewsPromise, session }: { reviewsPromise: Promise<{ _id: string, reviews: Review[] }>, session: Session | null }) => {
  const reviews = use(reviewsPromise)
  const MAX_CHARACTERS = 1000;
  const [clientReviews, setClientReviews] = useState(reviews.reviews);
  const [newReview, setNewReview] = useState('');
  const router = useRouter()

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
      userId: session.user.id,
      date: new Date()
    }

    const res = await postReview(reviews._id as string, newServerReview as Review)
    if (!res) alert("There was an error")
    setClientReviews([...clientReviews, newServerReview]);
    setNewReview('');
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const input = e.target.value;
    setNewReview(input);

    if (input.length >= MAX_CHARACTERS) {
      alert("No more than 1000 characters")
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <section className={st.container} aria-labelledby="reviews-heading">
        <h3>
          Reviews
        </h3>
        <div role="list" className={st.listContainer}>
          {clientReviews && clientReviews.map((review) => (
            <div className={st.pixelatedBorder} key={String(review.date)}>
              <article className={st.pixelatedContent} itemScope itemType="https://schema.org/Review"  >
                <div className={st.reviewContent}>
                  <div className={st.reviewData}>
                    <span><em itemProp="name">{review.username}</em>:</span>
                    <span className={st.reviewDate}>
                      {review.date?.toISOString?.().split('T')[0] || ''}
                    </span>
                  </div>
                  <div itemProp="reviewBody"> {review.review}  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        {(!clientReviews || clientReviews?.length === 0) && (
          <div className={st.noReviews}>
            No reviews yet. Be the first to review!
          </div>
        )}

        <div>
          {session ?
            <form onSubmit={handleSubmit} className={st.form}>
              <label htmlFor='new-review' className={st.label}>Add a review</label>
              <textarea
                id='new-review'
                name='new-review'
                placeholder='Your thoughts... (No spoilers though!)'
                rows={2}
                className={st.textarea}
                value={newReview}
                onChange={(e) => handleReviewChange(e)}
              />
              <button type="submit">
                Post Review
              </button>
            </form>
            :
            <div className={st.needToLogin}>
              You need to be logged in to submit a review. You can create an account or log in <span onClick={()=> router.push('/signin') }>here</span>.
            </div>
          }
        </div>
      </section>
    </ThemeProvider>
  );
};

export default ReviewsComponent;