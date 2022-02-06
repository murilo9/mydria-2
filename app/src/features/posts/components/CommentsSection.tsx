import { Alert, Box, CircularProgress, Link, Paper } from '@mui/material';
import React, { useState } from 'react';
import Comment from '../../comments/components/Comment';
import CommentData from '../../comments/types/Comment';

type CommentsSectionProps = {
  loadingComments: boolean,
  comments: CommentData[],
  error: string,
}

export default function CommentsSection({
  loadingComments = false,
  comments = [],
  error = ''
}: CommentsSectionProps) {
  const [commentsToShow, setCommentsToShow] = useState(10);

  const commentsList = [];
  const totalComments = comments.length;

  // Increases comments to show
  const onShowMoreCommentsClick = (event: any) => {
    event.preventDefault();
    const totalComments = comments.length;
    if (commentsToShow < totalComments) {
      setCommentsToShow(commentsToShow + 10)
    }
  }

  for (let i = 0; i < commentsToShow; i++) {
    if (comments[i]) {
      commentsList.push(<Comment {...comments[i]} key={comments[i]._id} />)
    }
  }

  return comments.length ?
    <Paper elevation={0} sx={{ padding: 2, paddingTop: 0 }}>
      {
        loadingComments ?
          <CircularProgress sx={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }} />
          : null
      }
      {
        error ?
          <Alert severity="warning">{error}</Alert>
          : null
      }
      {
        commentsToShow < comments.length ?
          <Box sx={{ width: 1, textAlign: 'center' }}>
            <Link href="#" variant="body2" onClick={(event: any) => onShowMoreCommentsClick(event)}>Show previous</Link>
          </Box>
          : null
      }
      {
        commentsList
      }
    </Paper>
    : null
}