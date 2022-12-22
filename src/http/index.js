import axios from '../axios';

export const add_new_address = ({ user_id = '', address = {} }) =>
    axios.post(`/users/${user_id}/address/new`, { address });

export const edit_address = ({ user_id = '', updated_address = {} }) =>
    axios.post(`/users/${user_id}/address/edit`, { updated_address });

export const delete_address = ({ user_id = '', address_id = '' }) =>
    axios.post(`/users/${user_id}/address/delete`, { address_id });

export const get_all_addresses = ({ user_id = '' }) => axios.post(`/users/${user_id}/address/all`);
