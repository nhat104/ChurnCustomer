import type { FormEvent, DragEvent, ChangeEvent } from 'react';

import { useParams } from 'react-router-dom';

import { Box, Card, Input, Button, Typography, CardContent } from '@mui/material';

import { useAppDispatch } from 'src/store/hooks';
import { dashboardActions } from 'src/pages/dashboard/slice';

// ----------------------------------------------------------------------

export default function PredictBox() {
  const { modelId } = useParams<{ modelId: string }>();

  const dispatch = useAppDispatch();

  const onUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    const formData = new FormData();
    if (file && modelId) {
      formData.append('data_file', file);
      dispatch(
        dashboardActions.predictRequest({
          modelId,
          body: formData,
        })
      );
    }
    input.value = '';
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const droppedFiles = event.dataTransfer.files;

    if (droppedFiles.length > 0) {
      const newFile = droppedFiles[0];
      if (
        newFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        newFile.type === 'text/csv'
      ) {
        console.log(newFile.name.split('.').slice(0, -1).join('.'));
      } else {
        console.error('Invalid file type');
      }
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Card onDrop={handleDrop} onDragOver={(event) => event.preventDefault()}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Start Predicting
        </Typography>

        <Box sx={{ mt: 9, mb: 4 }}>
          <form onSubmit={handleSubmit}>
            {/* <input type="hidden" name='_csrf' /> */}

            <Button
              component="label"
              variant="contained"
              fullWidth
              size="large"
              sx={{ fontSize: 16, maxWidth: 200 }}
            >
              Upload Data
              <Input
                type="file"
                onChange={onUploadFile}
                inputProps={{
                  accept:
                    'text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                }}
                sx={{ display: 'none' }}
              />
            </Button>

            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
              or drag and drop a file
              <br />
              xlsx or tab-delimited csv only
            </Typography>
          </form>
        </Box>
      </CardContent>
    </Card>
  );
}
