import { Modal } from "@mantine/core";

interface PopoverSettingProps {
  opened: boolean;
  onClose(): void;
}

export default function PopoverSetting({opened, onClose}: PopoverSettingProps) {
  return (
    <Modal opened={opened} onClose={onClose}       transitionProps={{ duration: 10 }}>

    </Modal>
  )
  
};
