import { Modal, ModalBody, ModalContent } from '@nextui-org/react';

import { Box, Button, Typography } from '@mui/material';

import { RocAuc } from './roc-auc';
import { KSScore } from './ks-score';
import { ModelOverview } from './model-overview';
import { ProfitForecast } from './profit-forecast';
import { DensityDistribution } from './density-distribution';

// ----------------------------------------------------------------------

interface StatisticModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function StatisticModal({ isOpen, onOpenChange }: StatisticModalProps) {
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
            <Typography variant="h4">credits_data_gm</Typography>
            <Box sx={{ display: 'flex' }}>
              <Typography>
                credits_data_gm.xlsx by mmnhat666@gmail.com , 18 October 2024 05:10:20
              </Typography>
              <Typography sx={{ ml: 4 }}>Time taken 8.57 s.</Typography>
            </Box>
            <Button variant="contained" size="large" sx={{ width: 300 }}>
              Download evaluation report
            </Button>

            <ModelOverview />

            <Box sx={{ mt: 6 }}>
              <Typography variant="h5">Dataset statistics</Typography>
              <DensityDistribution
                title="Density distribution by classes"
                chart={{
                  series: [
                    {
                      name: 'Good',
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
                    {
                      name: 'Bad',
                      data: [
                        [0, 0.01],
                        [2, 0.1],
                        [4, 0.8],
                        [6, 1],
                        [7, 1.3],
                        [8, 1.8],
                        [10, 1.7],
                        [12, 0.2],
                      ],
                    },
                  ],
                }}
                mt={2}
              />

              <KSScore
                title="K-S Score"
                chart={{
                  series: [
                    {
                      name: 'Good',
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
                    {
                      name: 'Bad',
                      data: [
                        [0, 0.01],
                        [2, 0.1],
                        [4, 0.8],
                        [6, 1],
                        [7, 1.3],
                        [8, 1.8],
                        [10, 1.7],
                        [12, 0.2],
                      ],
                    },
                  ],
                }}
                mt={2}
              />

              <RocAuc
                title="ROC AUC chart"
                chart={{
                  series: [
                    {
                      name: 'ROC AUC',
                      data: [
                        [0, 0],
                        [0.1, 0.1],
                        [0.2, 0.2],
                        [0.3, 0.3],
                        [0.4, 0.4],
                        [0.5, 0.5],
                        [0.6, 0.6],
                        [0.7, 0.7],
                        [0.8, 0.8],
                        [0.9, 0.9],
                        [1, 1],
                      ],
                    },
                  ],
                }}
                mt={2}
              />

              <ProfitForecast
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
              />
            </Box>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
}
