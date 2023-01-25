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

            return {
                ...state,
                currentUser: {
                    ...payload,
                },
            };
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
            let updated_addresses;
            if (payload?.address?.is_default)
                updated_addresses = [
                    ...state?.currentUser?.addresses?.map((address) => ({
                        ...address,
                        is_default: false,
                    })),
                    payload?.address,
                ];
            else if (state?.currentUser?.addresses?.length === 0)
                updated_addresses = [{ ...payload?.address, is_default: true }];
            else updated_addresses = [...state?.currentUser?.addresses, payload?.address];

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

        case 'EDIT_ADDRESS': {
            const updated_addresses = {
                ...state?.currentUser,
                addresses: state?.currentUser?.addresses?.map((address) =>
                    address?._id === payload?.address?._id
                        ? payload?.address
                        : payload?.address?.is_default
                        ? { ...address, is_default: false }
                        : address
                ),
            };
            saveDataToLocalStorage('currentUser', updated_addresses);
            return {
                ...state,
                currentUser: updated_addresses,
            };
        }

        case 'DELETE_ADDRESS': {
            let updated_addresses = [],
                address_to_delete = state?.currentUser?.addresses?.filter(
                    (address) => address?._id === payload?.address_id
                )[0];
            if (address_to_delete?.is_default) {
                updated_addresses = state?.currentUser?.addresses
                    ?.filter(
                        (address) => address._id.toString() !== payload?.address_id?.toString()
                    )
                    ?.map((address, index) =>
                        index === 0
                            ? { ...address, is_default: true }
                            : { ...address, is_default: false }
                    );
            } else
                updated_addresses = state?.currentUser?.addresses?.filter(
                    (address) => address._id.toString() !== payload?.address_id?.toString()
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
