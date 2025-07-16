import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const MyModal = ({ btntext, modalbtntxt, children, title, onConfirm }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);

    try {
      if (onConfirm) {
        const result = await onConfirm();

        // If onConfirm returns true or doesn't throw, close modal
        if (result !== false) {
          setOpen(false);
        }
      }
    } catch (error) {
      // Error already handled in onConfirm (like showing message.error)
      console.error(error);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {btntext}
      </Button>
      <Modal
        title={title}
        open={open}
        onOk={handleOk}
        okText={modalbtntxt}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    </>
  );
};

export default MyModal;
