import React from 'react';
import { Modal, Button, Placeholder } from '@telegram-apps/telegram-ui';
import { ModalClose } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalClose/ModalClose';
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';
import { Close } from '@mui/icons-material';

const CustomModal: React.FC = () => {
  return (
    <Modal
      header={<ModalHeader after={<ModalClose><Close style={{ color: 'var(--tgui--plain_foreground)' }} /></ModalClose>}>Only iOS header</ModalHeader>}
      trigger={<Button size="m">Open modal</Button>}
    >
      <Placeholder
        description="Description"
        header="Title"
      >
        <img
          alt="Telegram sticker"
          src="https://xelene.me/telegram.gif"
          style={{
            display: 'block',
            height: '144px',
            width: '144px'
          }}
        />
      </Placeholder>
    </Modal>
  );
};

export default CustomModal;
