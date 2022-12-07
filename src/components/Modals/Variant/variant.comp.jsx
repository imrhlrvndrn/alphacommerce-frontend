import { useEffect } from 'react';
import axios from '../../../axios';
import { useTheme, useDataLayer, useModalManager } from '../../../context';

// styles
import './variant.styles.scss';

// components
import { Modal } from '../../';

export const VariantModal = ({}) => {
    const { modal, hideModal } = useModalManager();
    const { theme } = useTheme();
    const [{ cart }, dataDispatch] = useDataLayer();
    const {
        state: {
            variants,
            selectedVariant: { cartItemId, bookId, variant },
        },
    } = modal?.props;

    const updateVariant = async (variant) => {
        try {
            const {
                data: { success, data, toast },
            } = await axios.post(`carts/${cart._id}`, {
                type: 'UPDATE_VARIANT',
                variant,
                bookId,
                cartItemId,
                cart: cart._id === 'guest' ? cart : null,
            });
            if (success) {
                dataDispatch({
                    type: 'UPDATE_CART_ITEM',
                    payload: {
                        _id: bookId,
                        updatedItem: data.updatedItem,
                        checkout: data.checkout,
                    },
                });
                dataDispatch({ type: 'SET_TOAST', payload: { data: toast } });
            }
            hideModal();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {}, [cart]);

    return (
        <Modal>
            <div className='variant-modal' style={{ color: theme?.color }}>
                <h1 className='font-lg'>Select a variant</h1>
                {variants?.map((item) => (
                    <div
                        className='variant-option'
                        key={item?._id}
                        style={{
                            backgroundColor:
                                variant?.type === item?.type
                                    ? theme?.light_background
                                    : 'transparent',
                        }}
                        onClick={() => updateVariant(item)}
                    >
                        {item?.type}
                    </div>
                ))}
            </div>
        </Modal>
    );
};

const EnhancedVariantModal = '';
export { EnhancedVariantModal };
