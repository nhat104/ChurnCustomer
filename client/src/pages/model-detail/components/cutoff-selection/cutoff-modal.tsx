import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
} from '@nextui-org/react';

import { Box, Button, Card, Typography } from '@mui/material';

import { useAppSelector } from 'src/store/hooks';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

import { selectModel } from '../../slice/selectors';

// ----------------------------------------------------------------------

interface StatisticModalProps {
  isOpen: boolean;
  cutoffValue: number;
  onOpenChange: () => void;
}

export default function CutoffModal({ isOpen, cutoffValue, onOpenChange }: StatisticModalProps) {
  const { dataModel } = useAppSelector(selectModel);
  if (!dataModel) {
    return null;
  }

  const { attributes } = dataModel;

  return (
    <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="outside">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-blue-600 text-xl px-8 pb-2">How it works</ModalHeader>
            <ModalBody className="px-8">
              <Box
                sx={{
                  '& p': {
                    color: 'text.secondary',
                    '& span': {
                      color: 'text.primary',
                    },
                  },
                }}
              >
                <Typography component="h4" sx={{ fontSize: 40, fontWeight: 600, mb: 2 }}>
                  Cutoff selection
                </Typography>
                <Typography>
                  The model assigns to each applicant a score from 0.0 to 1.0. A higher score
                  indicates a lower probability of default. Applications with a{' '}
                  <span>score below</span> the selected cutoff value are classified as default and
                  are recommended to be rejected. While requests with a <span>score above</span> the
                  value are considered as non-default and can be stayed.
                </Typography>

                <Box sx={{ textAlign: 'center', my: 4 }}>
                  <Typography variant="h4">{attributes?.test_records}</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 1,
                      color: 'text.secondary',
                    }}
                  >
                    <Typography variant="body2">Total applicant count</Typography>
                    <Tooltip
                      className="max-w-48"
                      placement="bottom-start"
                      closeDelay={200}
                      content="Total number of records Machine sets aside to validate the quality of the model and calculate the Score Index"
                    >
                      <Iconify width={14} icon="eva:question-mark-circle-outline" />
                    </Tooltip>
                  </Box>
                  <Box sx={{ height: 28 }}>
                    <SvgColor
                      color="text.secondary"
                      width="100%"
                      height="100%"
                      src="/assets/icons/bracket-curly.svg"
                    />
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mx: 0.75,
                      my: 4,
                      '& h3': {
                        lineHeight: 1.2,
                      },
                    }}
                  >
                    <Card
                      sx={{
                        width: '48%',
                        bgcolor: 'background.neutral',
                        overflow: 'visible',
                        p: '0 20px 30px',
                      }}
                    >
                      <Box sx={{ position: 'relative', bottom: 14 }}>
                        <Iconify width={30} color="error.main" icon="solar:close-circle-bold" />
                      </Box>
                      <Typography variant="h3" sx={{ fontWeight: 600 }}>
                        {attributes?.exit_count}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        to be rejected
                      </Typography>

                      <Divider />

                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          textAlign: 'left',
                          mt: 2,
                        }}
                      >
                        <Box sx={{ width: '49%' }}>
                          <Typography variant="h3" sx={{ fontWeight: 600 }}>
                            5
                          </Typography>
                          <Typography variant="body1" sx={{ lineHeight: 1.2 }}>
                            performing applications
                          </Typography>
                        </Box>
                        <Box sx={{ width: '49%' }}>
                          <Typography variant="h3" sx={{ fontWeight: 600 }}>
                            0
                          </Typography>
                          <Typography variant="body1" sx={{ lineHeight: 1.2 }}>
                            non-performing applications
                          </Typography>
                        </Box>
                      </Box>
                    </Card>

                    <Card
                      sx={{
                        width: '48%',
                        bgcolor: 'background.neutral',
                        overflow: 'visible',
                        p: '0 20px 30px',
                      }}
                    >
                      <Box sx={{ position: 'relative', bottom: 14 }}>
                        <Iconify width={30} color="primary.main" icon="solar:check-circle-bold" />
                      </Box>

                      <Typography variant="h3" sx={{ fontWeight: 600 }}>
                        {attributes?.stay_count}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        stayed
                      </Typography>

                      <Divider />

                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          textAlign: 'left',
                          mt: 2,
                        }}
                      >
                        <Box sx={{ width: '49%' }}>
                          <Typography variant="h3" sx={{ fontWeight: 600 }}>
                            273
                          </Typography>
                          <Typography variant="body1" sx={{ lineHeight: 1.2 }}>
                            performing applications
                          </Typography>
                        </Box>
                        <Box sx={{ width: '49%' }}>
                          <Typography variant="h3" sx={{ fontWeight: 600 }}>
                            22
                          </Typography>
                          <Typography variant="body1" sx={{ lineHeight: 1.2 }}>
                            non-performing applications
                          </Typography>
                        </Box>
                      </Box>
                    </Card>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Typography>
                      Rejection rate: <span className="font-semibold">2%</span>
                    </Typography>
                    <Typography>
                      Acceptance rate: <span className="font-semibold">98%</span>
                    </Typography>
                  </Box>
                </Box>

                <Typography>
                  Based on self-test results, System determines the number of right and wrong
                  predictions. Four decision results — performing and non-performing applications —
                  stand for a possible prediction error.
                </Typography>
              </Box>
            </ModalBody>
            <ModalFooter className="justify-center">
              <Button size="large" variant="contained" onClick={onClose} sx={{ width: 200 }}>
                Ok
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
