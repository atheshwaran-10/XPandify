
import { create } from 'zustand';

interface EditModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCommunityEditModal = create<EditModalStore>((set) => ({
  isOpen: false,
   onOpen: () => {set({ isOpen: true });console.log("Opened")},
  onClose: () => {set({ isOpen: false });console.log("Closed")}
}));


export default useCommunityEditModal;
