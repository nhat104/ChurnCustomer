import { Box, Button, Typography } from '@mui/material';

import { useAppSelector } from 'src/store/hooks';
import { selectAuth } from 'src/pages/sign-in/slice/selectors';

import { selectModel } from '../slice/selectors';

export const ModelError = () => {
  const { dataModel } = useAppSelector(selectModel);
  const { dataAuth } = useAppSelector(selectAuth);

  return (
    <Box>
      <Typography variant="h4">{dataModel?.name}</Typography>

      <Box
        sx={{
          '& > div': {
            display: 'flex',
            // justifyContent: 'start',
            my: 2,
            '& p:nth-of-type(1)': {
              width: 400,
              color: 'text.secondary',
            },
            '& p:nth-of-type(2)': {
              width: 'calc(100% - 400px)',
            },
          },
        }}
      >
        <Box>
          <Typography>Built by</Typography>
          <Typography>{dataAuth?.user?.email}</Typography>
        </Box>
        <Box>
          <Typography>Model name</Typography>
          <Typography>{dataModel?.name}</Typography>
        </Box>
        <Box>
          <Typography>Filename</Typography>
          <Typography>{dataModel?.filename}</Typography>
        </Box>
        <Box>
          <Typography>Error</Typography>
          <Typography>{dataModel?.status}</Typography>
        </Box>
        <Box>
          <Typography>Status</Typography>
          <Typography>Canceled</Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="error">
          Delete
        </Button>
        <Button variant="contained" color="primary" sx={{ mx: 3 }}>
          Rebuild 70/30
        </Button>
        <Button variant="contained" color="primary">
          Rebuild 90/10
        </Button>
      </Box>
    </Box>
  );
};
