/**
 *
 * Loading
 *
 */
import { Backdrop, CircularProgress } from '@mui/material';

interface Props {}

export const Loading = (props: Props) => {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
