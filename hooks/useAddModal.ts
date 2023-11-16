
import { create } from 'zustand';

interface AddModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddModal = create<AddModalProps>((set) => ({
  isOpen: false,
  onOpen: () => {set({ isOpen: true });console.log("Opened")},
  onClose: () => {set({ isOpen: false });console.log("Closed")}
}));


export default useAddModal;
