import { createContext, useContext, useState } from 'react';
import { AuthModal, VariantModal, AddToWishlistModal, NewWishlistModal } from '../../components';

const ModalContext = createContext();

export const MODAL_TYPES = {
    VARIANT_MODAL: VariantModal,
    WISHLIST_MODAL: AddToWishlistModal,
    AUTH_MODAL: AuthModal,
    NEW_WISHLIST_MODAL: NewWishlistModal,
};

export const useModalManager = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [modal, setModal] = useState({ type: '', props: {} });
    const { type, props } = modal;

    const showModal = (type = '', props = {}) => {
        setModal({
            ...modal,
            type,
            props,
        });
    };

    const hideModal = () => {
        setModal({
            ...modal,
            type: '',
            props: {},
        });
    };

    const renderModal = () => {
        const ModalComponent = MODAL_TYPES[type];
        if (!type || !ModalComponent) {
            return null;
        }
        return <ModalComponent id='global-modal' {...props} />;
    };

    return (
        <ModalContext.Provider value={{ showModal, hideModal, modal }}>
            {renderModal()}
            {children}
        </ModalContext.Provider>
    );
};
