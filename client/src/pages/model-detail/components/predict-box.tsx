import type { FormEvent, DragEvent, ChangeEvent } from 'react';

import { useParams } from 'react-router-dom';

import { Box, Card, Input, Button, Typography, CardContent } from '@mui/material';

import { useAppDispatch } from 'src/store/hooks';
import { dashboardActions } from 'src/pages/dashboard/slice';

// ----------------------------------------------------------------------

interface PredictBoxProps {
  cutoffValue: number;
}

export default function PredictBox({ cutoffValue }: PredictBoxProps) {
  const { modelId } = useParams<{ modelId: string }>();

  const dispatch = useAppDispatch();

  const onUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    const formData = new FormData();
    if (file && modelId) {
      formData.append('data_file', file);
      formData.append('cutoff_selection', cutoffValue.toString());
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
        const formData = new FormData();
        formData.append('data_file', newFile);
        dispatch(
          dashboardActions.predictRequest({
            modelId: Number(modelId),
            body: formData,
          })
        );
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
        <Typography variant="h6" sx={{ mb: 2.5 }}>
          Start Predicting
        </Typography>

        <Box>
          <form onSubmit={handleSubmit}>
            {/* <input type="hidden" name='_csrf' /> */}
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              The system will use the left
              <br />
              cutoff selection as the
              <br />
              prediction threshold
            </Typography>

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
