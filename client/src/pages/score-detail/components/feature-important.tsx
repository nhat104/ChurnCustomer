import { Divider, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';

import { Box, Typography } from '@mui/material';

// ----------------------------------------------------------------------

interface FeatureImportantProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export function FeatureImportant({ isOpen, onOpenChange }: FeatureImportantProps) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="max-w-2xl"
      scrollBehavior="outside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Scoring details row #1</ModalHeader>
            <ModalBody>
              <Box
                sx={{
                  display: 'flex',
                  '& p': { color: 'text.secondary' },
                  px: 2,
                  mb: 1,
                }}
              >
                <Box sx={{ width: '50%' }}>
                  <Typography variant="h3">0.99840</Typography>
                  <Typography variant="body1">Score</Typography>
                </Box>
                <Box>
                  <Typography variant="h3">Approve</Typography>
                  <Typography variant="body1">Decision</Typography>
                </Box>
              </Box>

              <Divider />

              <Box
                sx={{
                  display: 'flex',
                  mt: 2,
                  px: 2,
                  '& p': {
                    fontSize: '0.875rem',
                    mb: 2,
                  },
                }}
              >
                <Box sx={{ width: '50%' }}>
                  <Typography>0.01843</Typography>
                  <Typography>0.006</Typography>
                  <Typography>0.0062</Typography>
                  <Typography>0.0066</Typography>
                  <Typography>0.0182</Typography>
                  <Typography>0.0209</Typography>
                  <Typography>0</Typography>
                  <Typography>0</Typography>
                  <Typography>-0.002</Typography>
                  <Typography>-0.002</Typography>
                  <Typography>-0.01</Typography>
                </Box>
                <Box sx={{ width: '50%' }}>
                  <Typography>Other good</Typography>
                  <Typography>verificator_id</Typography>
                  <Typography>pension_contributions</Typography>
                  <Typography>had_credits_before</Typography>
                  <Typography>credit_product_id</Typography>
                  <Typography>amount</Typography>
                  <Typography>Other bad</Typography>
                  <Typography>add_income_pension</Typography>
                  <Typography>marital_status</Typography>
                  <Typography>term</Typography>
                  <Typography>occupation_type</Typography>
                </Box>
              </Box>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
