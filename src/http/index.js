import axios from '../axios';

// User address requests
export const add_new_address = async ({ user_id = '', address = {} }) =>
    await axios.post(`/users/${user_id}/address/new`, { address });

export const edit_address = async ({ user_id = '', updated_address = {} }) =>
    await axios.post(`/users/${user_id}/address/edit`, { updated_address });

export const delete_address = async ({ user_id = '', address_id = '' }) =>
    await axios.post(`/users/${user_id}/address/delete`, { address_id });

export const get_all_addresses = async ({ user_id = '' }) =>
    await axios.post(`/users/${user_id}/address/all`);

// Checkout requests
export const checkout = async ({ order_items = [], user: { id, email, address } }) =>
    await axios.post(`/stripe/checkout`, { order_items, user: { id, email, address } });

// Cart requests
export const fetch_user_cart = async ({ cart_id, action_type, populate, select }) =>
    await axios.post(`/carts/${cart_id}`, {
        type: action_type,
        populate,
        select,
    });

export const update_cart = async ({
    cart,
    book: { id, variant, inc },
    action_type = 'UPDATE_QUANTITY',
}) =>
    await axios.post(`/carts/${cart?._id}`, {
        _id: id,
        variant,
        inc,
        cart: cart?._id === 'guest' ? cart : null,
        type: action_type,
    });

export const remove_from_cart = async ({
    cart,
    action_type = 'REMOVE_FROM_CART',
    book: { variant, id },
}) =>
    await axios.post(`/carts/${cart?._id}`, {
        variant,
        _id: id,
        type: action_type,
        cart: cart?._id === 'guest' ? cart : null,
    });

export const add_to_cart = async ({ cart, action_type = 'ADD_TO_CART', multi, items }) =>
    await axios.post(`/carts/${cart?._id}`, {
        multi,
        data: [...items],
        type: action_type,
        cart: cart?._id === 'guest' ? cart : null,
    });

// Order requests
export const fetch_all_orders = async ({ user_id }) => {
    return await axios.get(`/orders/${user_id}`);
};
