import type { DragEvent, ChangeEvent } from 'react';

import { useRef } from 'react';

import { Box, Card, Input, Button, Typography, CardContent, OutlinedInput } from '@mui/material';

// ----------------------------------------------------------------------

export default function BuildModelBox() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileData = (e.target as HTMLInputElement).files?.[0];
    const formData = new FormData();
    if (fileData) {
      formData.append('file', fileData);
      inputRef.current!.value = fileData.name.split('.').slice(0, -1).join('.');
    }
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
        inputRef.current!.value = newFile.name.split('.').slice(0, -1).join('.');
      } else {
        console.error('Invalid file type');
      }
    }
  };

  return (
    <Card onDrop={handleDrop} onDragOver={(event) => event.preventDefault()}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ mt: 4, mb: 3, fontSize: '1.8rem !important' }}>
          Build a model
        </Typography>

        <Box sx={{ width: 250, mb: 6 }}>
          <form onSubmit={(e) => e.preventDefault()}>
            {/* <input type="hidden" name='_csrf' /> */}
            <OutlinedInput
              fullWidth
              size="small"
              name="modelName"
              inputProps={{
                minLength: 2,
                maxLength: 30,
              }}
              inputRef={inputRef}
              placeholder="Enter the model name"
              sx={{ mb: 4 }}
            />

            <Button
              component="label"
              variant="contained"
              fullWidth
              size="large"
              sx={{ fontSize: 16 }}
            >
              Upload Data
              <Input
                type="file"
                inputProps={{
                  accept:
                    'text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                }}
                onChange={onUploadFile}
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
