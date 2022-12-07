import { v4 } from 'uuid';
import axios from '../axios';
import { useToast } from './';
import { useDataLayer, useAuth, useModalManager } from '../context';

export const useWishlist = () => {
    const { setToast } = useToast();
    // const [{ wishlist }, modalDispatch] = useModal();
    const { modal, hideModal } = useModalManager();
    const [_, dataDispatch] = useDataLayer();
    const [{ currentUser }] = useAuth();

    const addToWishlist = async (wishlistId, setDisabled) => {
        try {
            const {
                data: { success, data, toast, statusCode, message, status },
            } = await axios.post(`/wishlists/${wishlistId}`, {
                // * The below line takes the wishlist obj from the state of the wishlist modal (props)
                // ! wishlistItem: wishlist.state[0],
                wishlistItem: modal?.props?.[0],
                type: 'ADD_TO_WISHLIST',
            });

            console.log('API add to wishlist => ', data);

            if (success) {
                setToast({ ...toast, _id: v4() });
                dataDispatch({
                    type: 'ADD_TO_WISHLIST',
                    payload: {
                        wishlistId: wishlistId,
                        data: [{ book: data?.wishlist }],
                        estimated_price: data?.estimated_price,
                    },
                });
            } else if (statusCode === 209) {
                setToast({ status, message, _id: v4() });
            }
        } catch (error) {
            setToast({
                _id: v4(),
                status: 'failed',
                message: `Couldn't add to wishlist. Please try again`,
            });
            console.error(error);
        } finally {
            setDisabled(false);
            hideModal();
        }
    };

    const createWishlist = async (wishlist_name) => {
        try {
            if (!wishlist_name)
                return setToast({
                    _id: v4(),
                    status: 'failed',
                    message: `Wishlist name can't be empty`,
                });

            const {
                data: { success, data, toast },
            } = await axios.post(`/wishlists`, {
                type: 'CREATE_WISHLIST',
                wishlists: [
                    {
                        user: currentUser?._id,
                        name: { name: wishlist_name },
                        data: [],
                    },
                ],
            });

            if (success) {
                setToast({ ...toast, _id: v4() });
                dataDispatch({
                    type: 'CREATE_WISHLIST',
                    payload: data?.wishlists,
                });
            }
        } catch (error) {
            setToast({
                _id: v4(),
                status: 'failed',
                message: `Couldn't create new wishlist. Please try again`,
            });
            console.error(error);
        }
    };

    return { addToWishlist, createWishlist };
};
