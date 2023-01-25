import { v4 } from 'uuid';
import axios from '../axios';
import { useToast } from './';
import { useDataLayer, useAuth, useModalManager } from '../context';

export const useWishlist = () => {
    const { setToast } = useToast();
    // const [{ wishlist }, modalDispatch] = useModal();
    const { modal, hideModal } = useModalManager();
    const [{ wishlists }, dataDispatch] = useDataLayer();
    const [{ currentUser }] = useAuth();

    const addToWishlist = async (wishlist_id, setDisabled) => {
        // This method adds an item to the selected wishlist

        try {
            const {
                data: { success, data, toast, statusCode, message, status },
            } = await axios.post(`/wishlists/${wishlist_id}`, {
                // * The below line takes the wishlist obj from the state of the wishlist modal (props)
                // ! wishlistItem: wishlist.state[0],
                wishlistItem: modal?.props?.item,
                type: 'ADD_TO_WISHLIST',
            });

            if (success) {
                setToast({ ...toast, _id: v4() });
                dataDispatch({
                    type: 'ADD_TO_WISHLIST',
                    payload: {
                        wishlistId: wishlist_id,
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
        // This method creates a new wishlist

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
        } finally {
            hideModal();
        }
    };

    const moveWishlistItem = async ({ wishlist: { current, destination }, item }) => {
        // This methods ensures the transfer of the selected wishlist item to another wishlist

        /* {
            wishlist: {
                current: {_id: '', name:''},
                destination: {_id: '', name:''},
            },
            item: 'This will be the book obj'
        } */
        try {
            const {
                data: { success, data, toast },
            } = await axios.post(`/wishlists/${current?._id}`, {
                type: 'MOVE_WISHLIST_ITEM',
                wishlist: {
                    destination,
                },
                item,
            });

            if (success) {
                setToast({
                    _id: v4(),
                    status: 'success',
                    message: toast?.message,
                });
                // dataDispatch({
                //     type: 'MOVE_WISHLIST_ITEM',
                //     payload: {
                //         wishlist: { current, destination },
                //         item,
                //     },
                // });
                // window.location.reload(false);
                dataDispatch({ type: 'SET_WISHLISTS', payload: { wishlists: [...wishlists] } });
            }
        } catch (error) {
            setToast({
                _id: v4(),
                status: 'failed',
                message: `Couldn't move ${item?.name} to ${destination?.name}. Please try again`,
            });
            console.error(error);
        } finally {
            hideModal();
        }
    };

    const removeFromWishlist = async (wishlist_id, product) => {
        // This method removes the selected item from the wishlist

        const {
            data: { success, data, toast },
        } = await axios.post(`/wishlists/${wishlist_id}`, {
            type: 'REMOVE_FROM_WISHLIST',
            wishlistItem: product,
        });

        if (success) {
            dataDispatch({
                type: 'REMOVE_FROM_WISHLIST',
                payload: {
                    wishlistId: wishlist_id,
                    wishlistItem: data?.wishlistItem,
                    estimated_price: data?.estimated_price,
                },
            });
        }
    };

    return { addToWishlist, createWishlist, removeFromWishlist, moveWishlistItem };
};
