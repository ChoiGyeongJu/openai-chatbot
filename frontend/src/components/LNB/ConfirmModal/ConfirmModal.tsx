import { Box, Button, Modal, Typography } from '@mui/material';

const ConfirmDeleteModal = ({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => (
  <Modal open={open} onClose={onClose}>
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography variant="h6" component="h2" gutterBottom>
        채팅을 삭제하시겠습니까?
      </Typography>
      <Box display="flex" justifyContent="center" gap={4} mt={2}>
        <Button variant="outlined" fullWidth onClick={onClose}>
          취소
        </Button>
        <Button variant="contained" color="error" fullWidth onClick={onConfirm}>
          삭제
        </Button>
      </Box>
    </Box>
  </Modal>
);

export default ConfirmDeleteModal;
