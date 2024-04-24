import { create } from 'zustand';

interface RegisterModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useRegisterModal = create<RegisterModalStore>((set) => ({
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



export default useRegisterModal;