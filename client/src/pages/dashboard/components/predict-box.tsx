import { useState, type DragEvent, type ChangeEvent } from 'react';

import {
  Box,
  Card,
  Input,
  Button,
  Select,
  MenuItem,
  Typography,
  FormControl,
  CardContent,
  type SelectChangeEvent,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function PredictBox() {
  const [model, setModel] = useState<string>('0');

  const handleSelectModel = (event: SelectChangeEvent<string>) => {
    setModel(event.target.value);
  };

  const onUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = (e.target as HTMLInputElement).files?.[0];
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
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
        console.log(newFile.name.split('.').slice(0, -1).join('.'));
      } else {
        console.error('Invalid file type');
      }
    }
  };

  return (
    <Card onDrop={handleDrop} onDragOver={(event) => event.preventDefault()}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ mt: 4, mb: 3, fontSize: '1.8rem !important' }}>
          Start Predicting
        </Typography>

        <Box sx={{ width: 250, mb: 6 }}>
          <form onSubmit={(e) => e.preventDefault()}>
            {/* <input type="hidden" name='_csrf' /> */}

            <FormControl fullWidth>
              <Select
                size="small"
                value={model}
                aria-label="Model"
                onChange={handleSelectModel}
                IconComponent={() => <Iconify width={12} mr={1} icon="ep:arrow-down-bold" />}
                sx={{ mb: 4, textAlign: 'left' }}
              >
                <MenuItem value={0} sx={{ display: 'none' }}>
                  Choose existing model
                </MenuItem>
                <MenuItem value={10}>Model 1</MenuItem>
                <MenuItem value={20}>Model 2</MenuItem>
                <MenuItem value={30}>Model 3</MenuItem>
              </Select>
            </FormControl>

            <Button
              component="label"
              variant="contained"
              fullWidth
              size="large"
              sx={{ fontSize: 16 }}
            >
              Upload Data
              <Input type="file" onChange={onUploadFile} sx={{ display: 'none' }} />
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
