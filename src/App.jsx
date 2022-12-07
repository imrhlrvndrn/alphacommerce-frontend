import axios from './axios';
import { useEffect } from 'react';
import { useLocalStorage } from './hooks';
import { useDataLayer } from './context';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Styles
import './global.scss';

// React components
import { HomePage, CartPage, ListingPage, ProductPage, WishlistPage } from './pages';
import { Nav, Toast } from './components';

export const App = () => {
    const [{ books, toasts }, dataDispatch] = useDataLayer();
    const [saveToLocalStorage, getFromLocalStorage] = useLocalStorage();

    const getBooks = async () => {
        try {
            if (books?.length === 0) {
                const {
                    data: { success, books },
                } = await axios.get('/books');

                if (success) {
                    dataDispatch({
                        type: 'STOREBOOKS',
                        payload: books?.map((book) => ({
                            ...book,
                            variants: book?.variants?.map((variant) =>
                                variant?.type === 'paperback'
                                    ? { ...variant, isSelected: true }
                                    : { ...variant, isSelected: false }
                            ),
                        })),
                    });
                }
            }
            dataDispatch({
                type: 'SET_AUTHORS',
                payload: books?.reduce((acc, curVal) => [...acc, ...curVal?.authors], []),
            });
            dataDispatch({
                type: 'SET_GENRES',
                payload: books?.reduce((acc, curVal) => [...acc, ...curVal?.genres], []),
            });
        } catch (error) {
            console.error(error);
            console.log(error.response);
        }
    };

    // const getUser = async () => {
    //     const userId = Cookies.get('userId');
    //     try {
    //         const {
    //             data: { success, user },
    //         } = await axios.get(`/users/${userId}`);
    //         console.log('USER DATA => ', { success, user, cookie: userId });

    //         if (success) {
    //             authDispatch({ type: 'LOGIN', payload: user });
    //             const {
    //                 data: { success, data, toast },
    //             } = await axios.get(`/carts/${user.cart._id}`);

    //             console.log('CART DATA => ', { success, data });
    //             if (success) dataDispatch({ type: 'SET_CART', payload: { cart: data.cart } });
    //             dataDispatch({ type: 'SET_WISHLISTS', payload: { wishlists: user.wishlists } });
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    useEffect(() => {
        // getUser();
        if (!getFromLocalStorage('currentUser'))
            saveToLocalStorage('currentUser', {
                _id: 'guest',
                email: null,
                password: null,
                full_name: 'Guest User',
                avatar: { url: '' },
            });
        if (!getFromLocalStorage('cart'))
            saveToLocalStorage('cart', {
                _id: 'guest',
                user: 'guest',
                data: [],
                checkout: { subtotal: 0, total: 0 },
            });
        if (!getFromLocalStorage('wishlists')) saveToLocalStorage('wishlists', []);

        getBooks();
    }, []);

    return (
        <>
            <Router>
                <Nav />
                <Routes>
                    <Route exact path='/' element={<HomePage />} />
                    <Route exact path='/p' element={<ListingPage />} />
                    <Route exact path='/p/:id' element={<ProductPage />} />
                    <Route exact path='/cart' element={<CartPage />} />
                    <Route exact path='/wishlists' element={<WishlistPage />} />
                    <Route exact path='/wishlists/:id' element={<WishlistPage />} />
                </Routes>
            </Router>
            {toasts?.length > 0 && <Toast />}
        </>
    );
};
