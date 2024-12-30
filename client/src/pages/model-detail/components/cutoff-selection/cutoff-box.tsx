import { useEffect, useState } from 'react';
import { Tooltip, useDisclosure, Slider, type SliderValue } from '@nextui-org/react';

import { Box, Card, Typography, CardContent } from '@mui/material';

import { useAppSelector } from 'src/store/hooks';

import { Iconify } from 'src/components/iconify';

import CutoffModal from './cutoff-modal';
import { selectModel } from '../../slice/selectors';

// ----------------------------------------------------------------------

interface CutoffBoxProps {
  _cutoffValue: number;
}

interface ConfusionMatrix {
  tp: number;
  tn: number;
  fp: number;
  fn: number;
}

export default function CutoffBox({ _cutoffValue }: CutoffBoxProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [cutoffValue, setCutoffValue] = useState<SliderValue>(_cutoffValue);
  const [confusionMatrix, setConfusionMatrix] = useState<ConfusionMatrix>({
    tp: 0,
    tn: 0,
    fp: 0,
    fn: 0,
  });
  const { dataModel } = useAppSelector(selectModel);

  useEffect(() => {
    if (!dataModel || !dataModel.attributes) return;
    const { y_test, y_pred } = dataModel.attributes;
    if (!y_test || !y_pred || typeof cutoffValue !== 'number') return;

    let tp = 0;
    let tn = 0;
    let fp = 0;
    let fn = 0;
    for (let i = 0; i < y_test.length; i += 1) {
      if (y_pred[i] >= cutoffValue && y_test[i] === 1) {
        tp += 1;
      } else if (y_pred[i] >= cutoffValue && y_test[i] === 0) {
        fp += 1;
      } else if (y_pred[i] < cutoffValue && y_test[i] === 0) {
        tn += 1;
      } else {
        fn += 1;
      }
    }

    setConfusionMatrix({ tp, tn, fp, fn });
  }, [cutoffValue, dataModel]);

  if (!dataModel) {
    return null;
  }

  const { attributes } = dataModel;

  return (
    <>
      <Card sx={{ pb: '6px' }}>
        <CardContent>
          <Box sx={{ display: 'flex', '& > :nth-of-type(2)': { color: 'grey.700' } }}>
            <Typography variant="h6">Cutoff selection</Typography>
            <Typography variant="h6" sx={{ ml: 2 }}>
              {Number(cutoffValue).toFixed(2)}
            </Typography>
          </Box>

          <Box sx={{ my: 1 }}>
            <Slider
              aria-label="cutoff selection"
              step={0.01}
              minValue={0}
              maxValue={1}
              value={cutoffValue}
              onChange={setCutoffValue}
              disableThumbScale
              classNames={{
                // base: 'max-w-md gap-3',
                track: 'border-s-yellow-100 border-x-[6px]',
                filler: 'bg-gradient-to-r from-yellow-100 to-green-500',
              }}
              renderThumb={(props) => (
                <div
                  {...props}
                  className="group top-1/2 rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                >
                  <span className="transition-transform bg-blue-600 shadow-small rounded-full w-3 h-3 block group-data-[dragging=true]:scale-100 mt-[1px]" />
                </div>
              )}
            />
          </Box>

          <Box sx={{ color: 'text.secondary' }}>
            <Typography variant="body2" component="span" sx={{ fontSize: 13, mr: 1 }}>
              Total applications count: {attributes?.test_records}
            </Typography>
            <Tooltip
              className="max-w-48"
              placement="bottom-start"
              closeDelay={200}
              content="Total number of records Machine sets aside to validate the quality of the model and calculate the Score Index"
            >
              <Iconify width={14} icon="eva:question-mark-circle-outline" />
            </Tooltip>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 1.5,
              '& > div': {
                '& > :first-child': { mb: 0.5 },
                '& > :not(:first-child)': { color: 'text.secondary', lineHeight: 1 },
              },
            }}
          >
            <Box sx={{ width: '49%' }}>
              <Typography variant="h6">{confusionMatrix.tp + confusionMatrix.fp}</Typography>
              <Typography variant="body2">will exit</Typography>
              <Typography variant="body2" component="span" sx={{ mr: 1 }}>
                {confusionMatrix.tp} / {confusionMatrix.fp}
              </Typography>
              <Tooltip
                className="max-w-52"
                placement="bottom-start"
                content="Ratio of correctly exited to incorrectly exited"
              >
                <Iconify width={14} icon="eva:question-mark-circle-outline" />
              </Tooltip>
            </Box>
            <Box sx={{ width: '49%' }}>
              <Typography variant="h6">{confusionMatrix.tn + confusionMatrix.fn}</Typography>
              <Typography variant="body2">will stay</Typography>
              <Typography variant="body2" component="span" sx={{ mr: 1 }}>
                {confusionMatrix.tn} / {confusionMatrix.fn}
              </Typography>
              <Tooltip
                className="max-w-52"
                placement="bottom-start"
                content="Ratio of correctly stayed to incorrectly stayed"
              >
                <Iconify width={14} icon="eva:question-mark-circle-outline" />
              </Tooltip>
            </Box>
          </Box>

          <Box sx={{ mt: '37px' }}>
            <Typography
              variant="body2"
              onClick={onOpen}
              sx={{
                color: 'primary.main',
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              How it works
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <CutoffModal
        isOpen={isOpen}
        cutoffValue={cutoffValue as number}
        onOpenChange={onOpenChange}
      />
    </>
  );
}
