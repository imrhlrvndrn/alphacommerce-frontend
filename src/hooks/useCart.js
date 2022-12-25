import { v4 } from 'uuid';
import axios from '../axios';
import { useDataLayer } from '../context';
import { add_to_cart, fetch_user_cart, remove_from_cart, update_cart } from '../http';
import { useToast } from './';

export const useCart = () => {
    const [{ cart }, dataDispatch] = useDataLayer();
    const { setToast } = useToast();

    const addToCart = async ({ items = [], multi = false }) => {
        try {
            const {
                data: { success, data, toast },
            } = await add_to_cart({ cart, action_type: 'ADD_TO_CART', multi, items });
            if (success) {
                dispatchNewCartItem(data);
                setToast({ ...toast, _id: v4() });
            }
        } catch (error) {
            setToast({
                _id: v4(),
                status: error?.response?.data?.status || 'failed',
                message: error?.response?.data?.message || `Couldn't add to cart`,
            });
            console.error(error);
        }
    };

    const dispatchNewCartItem = async (data) => {
        dataDispatch({ type: 'ADD_TO_CART', payload: { ...data } });
    };

    const dispatchRemovedCartItem = (data) => {
        dataDispatch({
            type: 'REMOVE_FROM_CART',
            payload: data,
        });
    };

    const removeFromCart = async ({ id, variant }) => {
        try {
            const {
                data: {
                    success,
                    data: { _id, variant: variantResponse, checkout },
                    toast,
                },
            } = await remove_from_cart({
                cart,
                action_type: 'REMOVE_FROM_CART',
                book: { id, variant },
            });
            if (success) {
                dispatchRemovedCartItem({
                    _id,
                    variant: variantResponse,
                    checkout,
                });
                setToast({ ...toast, _id: v4() });
            }
        } catch (error) {
            setToast({
                _id: v4(),
                status: error?.response?.data?.status || 'failed',
                message: error?.response?.data?.message || `Couldn't remove from cart`,
            });
            console.error(error);
        }
    };

    const dispatchCartItem = (data) => {
        dataDispatch({
            type: 'UPDATE_CART_ITEM',
            payload: data,
        });
    };

    const updateCart = async ({ id, variant, inc = false }) => {
        try {
            const {
                data: {
                    success,
                    data: { _id, updatedItem, checkout },
                    toast,
                },
            } = await update_cart({
                cart,
                book: { id, variant, inc },
                action_type: 'UPDATE_QUANTITY',
            });

            if (success) {
                dispatchCartItem({
                    _id,
                    updatedItem,
                    checkout,
                });
                setToast({ ...toast, _id: v4() });
            }
        } catch (error) {
            setToast({
                _id: v4(),
                status: error?.response?.data?.status || 'failed',
                message: error?.response?.data?.message || `Couldn't update cart item`,
            });
        }
    };

    const fetchCart = async ({ populate = '', select = [] }) => {
        try {
            if (cart._id !== 'guest') {
                const {
                    data: { success, data, toast },
                } = await fetch_user_cart({
                    cart_id: cart?._id,
                    action_type: 'FETCH_DETAILS',
                    populate,
                    select,
                });
                if (success) {
                    dataDispatch({ type: 'SET_CART', payload: { cart: data.cart } });
                }
            } else {
                dataDispatch({ type: 'SET_CART', payload: { cart } });
            }
        } catch (error) {
            setToast({
                _id: v4(),
                status: error?.response?.data?.status || 'failed',
                message: error?.response?.data?.message || `Couldn't fetch cart details`,
            });
            console.error(error);
        }
    };

    return {
        addToCart,
        fetchCart,
        updateCart,
        removeFromCart,
        dispatchCartItem,
        dispatchNewCartItem,
        dispatchRemovedCartItem,
    };
};
