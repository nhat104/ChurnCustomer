import { useState, type DragEvent, type ChangeEvent, useEffect } from 'react';

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

import { modelsActions } from 'src/pages/models/slice';
import { selectModels } from 'src/pages/models/slice/selectors';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import { Iconify } from 'src/components/iconify';

import { dashboardActions } from '../slice';

// ----------------------------------------------------------------------

export default function PredictBox() {
  const [selectModel, setSelectModel] = useState<string>('0');

  const { dataModels } = useAppSelector(selectModels);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(modelsActions.modelsRequest({ offset: 0, limit: 100 }));
  }, [dispatch]);

  const handleSelectModel = (event: SelectChangeEvent<string>) => {
    setSelectModel(event.target.value);
  };

  const onUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = (e.target as HTMLInputElement).files?.[0];
    const formData = new FormData();
    if (file) {
      formData.append('data_file', file);
      dispatch(
        dashboardActions.predictRequest({
          modelId: selectModel,
          body: formData,
        })
      );
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (selectModel === '0') {
      return;
    }

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
            modelId: selectModel,
            body: formData,
          })
        );
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
                value={selectModel}
                aria-label="Model"
                onChange={handleSelectModel}
                IconComponent={() => <Iconify width={12} mr={1} icon="ep:arrow-down-bold" />}
                sx={{ mb: 4, textAlign: 'left' }}
              >
                <MenuItem value={0} sx={{ display: 'none' }}>
                  Choose existing model
                </MenuItem>
                {dataModels ? (
                  dataModels.map((model) => (
                    <MenuItem value={model.id} key={model.id}>
                      {model.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="">None</MenuItem>
                )}
              </Select>
            </FormControl>

            <Button
              component="label"
              variant="contained"
              disabled={selectModel === '0'}
              fullWidth
              size="large"
              sx={{ fontSize: 16 }}
            >
              Upload Data
              <Input
                type="file"
                // disabled={selectModel === '0'}
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
