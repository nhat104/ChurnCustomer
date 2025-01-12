import { Modal, ModalBody, ModalContent } from '@nextui-org/react';

import { Box, Typography } from '@mui/material';

import { fDateTime } from 'src/utils/format-time';

import { useAppSelector } from 'src/store/hooks';
import { selectAuth } from 'src/pages/sign-in/slice/selectors';
import { selectModel } from 'src/pages/model-detail/slice/selectors';

import { RocAuc } from './roc-auc';
import { KSScore } from './ks-score';
import { ModelOverview } from './model-overview';
// import { ProfitForecast } from './profit-forecast';
import { DensityDistribution } from './density-distribution';

// ----------------------------------------------------------------------

interface StatisticModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function StatisticModal({ isOpen, onOpenChange }: StatisticModalProps) {
  const { dataModel } = useAppSelector(selectModel);
  const { dataAuth } = useAppSelector(selectAuth);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="max-w-6xl"
      scrollBehavior="outside"
    >
      <ModalContent>
        {(onClose) => (
          <ModalBody className="p-8">
            <Typography variant="h4">{dataModel?.name}</Typography>
            <Box sx={{ display: 'flex' }}>
              <Typography>
                {dataModel?.filename} by {dataAuth?.user?.email} ,{' '}
                {fDateTime(dataModel?.created_at)}
              </Typography>
              <Typography sx={{ ml: 4 }}>
                Time taken{' '}
                {(
                  Number(dataModel?.attributes?.preprocess_time) +
                  Number(dataModel?.attributes?.train_time)
                ).toFixed(2)}{' '}
                s.
              </Typography>
            </Box>
            {/* <Button variant="contained" size="large" sx={{ width: 300 }}>
              Download evaluation report
            </Button> */}

            <ModelOverview />

            <Box sx={{ mt: 6 }}>
              <Typography variant="h5">Dataset statistics</Typography>
              <DensityDistribution
                title="Density distribution by classes"
                chart={{
                  series: dataModel?.attributes?.density_distribution ?? [],
                }}
                mt={2}
              />

              <KSScore
                title="K-S Score"
                chart={{
                  series: dataModel?.attributes?.ks_score_series ?? [],
                  ksScoreAttr: dataModel?.attributes?.ks_score_attr,
                }}
                mt={2}
              />

              <RocAuc
                title="ROC AUC chart"
                chart={{
                  series: dataModel?.attributes?.roc_auc_series ?? [],
                }}
                auc_score={+(dataModel?.attributes?.roc_auc ?? 0)}
                mt={2}
              />

              {/* <ProfitForecast
                title="Profit forecast"
                chart={{
                  series: [
                    {
                      name: 'Profit',
                      data: [
                        [0, 0],
                        [2, 0.01],
                        [4, 0.01],
                        [6, 0.1],
                        [7, 0.2],
                        [8, 0.3],
                        [10, 10.8],
                        [12, 0.01],
                      ],
                    },
                  ],
                }}
                mt={2}
              /> */}
            </Box>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
}
