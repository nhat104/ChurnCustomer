import { useState } from 'react';
import { Tooltip, useDisclosure, Slider, type SliderValue } from '@nextui-org/react';

import { Box, Card, Typography, CardContent } from '@mui/material';

import { Iconify } from 'src/components/iconify';

import CutoffModal from './cutoff-modal';

// ----------------------------------------------------------------------

interface CutoffBoxProps {
  _cutoffValue: number;
}

export default function CutoffBox({ _cutoffValue }: CutoffBoxProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [cutoffValue, setCutoffValue] = useState<SliderValue>(_cutoffValue);

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
            <Typography variant="body2" component="span" sx={{ mr: 1 }}>
              Total applications count: 300
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
              <Typography variant="h6">295</Typography>
              <Typography variant="body2">to be approved</Typography>
              <Typography variant="body2" component="span" sx={{ mr: 1 }}>
                297 / 22
              </Typography>
              <Tooltip
                className="max-w-52"
                placement="bottom-start"
                content="Ratio of correctly approved to incorrectly approved"
              >
                <Iconify width={14} icon="eva:question-mark-circle-outline" />
              </Tooltip>
            </Box>
            <Box sx={{ width: '49%' }}>
              <Typography variant="h6">5</Typography>
              <Typography variant="body2">to be rejected</Typography>
              <Typography variant="body2" component="span" sx={{ mr: 1 }}>
                5 / 0
              </Typography>
              <Tooltip
                className="max-w-52"
                placement="bottom-start"
                content="Ratio of correctly refused to incorrectly refused"
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
