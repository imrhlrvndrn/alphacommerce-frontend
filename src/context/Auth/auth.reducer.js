import Cookies from 'js-cookie';
import { getDataFromLocalStorage, saveDataToLocalStorage } from '../../hooks/useLocalStorage';

export const initial_auth_state = {
    currentUser: getDataFromLocalStorage('currentUser') || {
        _id: 'guest',
        email: null,
        password: null,
        full_name: 'Guest User',
        avatar: { url: '' },
    },
};

export const auth_reducers = (state, { type, payload }) => {
    console.log('auth dispatch:', { type, payload });

    switch (type) {
        case 'SIGNUP': {
            // * Setting up the new user
            saveDataToLocalStorage('currentUser', {
                ...payload,
            });

            return {
                ...state,
                currentUser: {
                    ...payload,
                },
            };
        }

        case 'LOGIN': {
            // * const cookie = Cookies.get('userId');
            // saveDataToLocalStorage(
            //     'currentUser',
            //     validUser.length === 0 ? 'guest' : validUser[0]._id
            // );
            saveDataToLocalStorage('currentUser', {
                ...payload,
            });
            // * saveDataToLocalStorage('currentUser', cookie ? cookie : 'guest');
            // saveDataToLocalStorage('cart', [getDataFromLocalStorage('cart')]);
            // ! Make a transferData function to transfer all the Guest account data into a verified
            // ! user account
            // The function call goes here
            // console.log(validUser);
            return {
                ...state,
                currentUser: {
                    ...payload,
                },
            };

            // * return {
            // *    ...state,
            // *    currentUser: cookie ? cookie : 'guest',
            // * };
        }

        case 'LOGOUT': {
            saveDataToLocalStorage('currentUser', {
                _id: 'guest',
                email: null,
                password: null,
                full_name: 'Guest User',
                avatar: { url: '' },
            });

            return {
                ...state,
                currentUser: {
                    _id: 'guest',
                    email: null,
                    password: null,
                    full_name: 'Guest User',
                    avatar: { url: '' },
                },
            };
        }

        case 'SET_ADDRESSES': {
            saveDataToLocalStorage('currentUser', {
                ...state?.currentUser,
                addresses: payload?.updated_addresses,
            });

            return {
                ...state,
                currentUser: {
                    ...state?.currentUser,
                    addresses: payload?.updated_addresses,
                },
            };
        }

        case 'ADD_ADDRESS': {
            saveDataToLocalStorage('currentUser', {
                ...state?.currentUser,
                addresses: [...state?.currentUser?.addresses, payload?.address],
            });

            return {
                ...state,
                currentUser: {
                    ...state?.currentUser,
                    addresses: [...state?.currentUser?.addresses, payload?.address],
                },
            };
        }

        case 'EDIT_ADDRESS': {
            const updated_addresses = {
                ...state?.currentUser,
                addresses: state?.currentUser?.addresses?.map((address) =>
                    address?._id === payload?.address?._id ? payload?.address : address
                ),
            };
            saveDataToLocalStorage('currentUser', updated_addresses);
            return {
                ...state,
                currentUser: updated_addresses,
            };
        }

        case 'DELETE_ADDRESS': {
            const updated_addresses = state?.currentUser?.addresses?.filter(
                (address) => address?._id !== payload?.address_id
            );
            saveDataToLocalStorage('currentUser', {
                ...state?.currentUser,
                addresses: updated_addresses,
            });
            return {
                ...state,
                currentUser: {
                    ...state?.currentUser,
                    addresses: updated_addresses,
                },
            };
        }

        case 'UPDATE_DEFAULT_ADDRESS': {
            const updated_addresses = state?.currentUser?.addresses?.map((address) =>
                address._id === payload?.address_id
                    ? { ...address, is_default: true }
                    : { ...address, is_default: false }
            );
            saveDataToLocalStorage('currentUser', {
                ...state?.currentUser,
                addresses: updated_addresses,
            });
            return {
                ...state,
                currentUser: {
                    ...state?.currentUser,
                    addresses: updated_addresses,
                },
            };
        }

        default:
            return state;
    }
};
