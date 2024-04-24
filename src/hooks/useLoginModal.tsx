import { create } from 'zustand';

interface LoginModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useLoginModal = create<LoginModalStore>((set) => ({
    isOpen: false,
    onOpen: () => {
        // console.log('Opening modal');
        set({ isOpen: true })
    },
    onClose: () => {
        // console.log('closing modal')
        set({ isOpen: false })
    }
}));



export default useLoginModal;