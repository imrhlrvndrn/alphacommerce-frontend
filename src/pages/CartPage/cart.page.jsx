import { useEffect, useState } from 'react';
import { useCart } from '../../hooks';
import { useAuth, useTheme, useDataLayer } from '../../context';

// styles
import './cartpage.styles.scss';

// React components
import { CartItemsContainer, CartCheckout } from '../../components';

export const CartPage = () => {
    const { theme } = useTheme();
    const [{ currentUser }] = useAuth();
    const { fetchCart } = useCart();
    const [{ cart }] = useDataLayer();

    // Determining the cart values based on authentication

    useEffect(() => {}, [cart.checkout, currentUser]);

    useEffect(() => {
        fetchCart({
            populate: {
                path: 'data.book',
            },
        });
    }, []);

    return (
        <>
            <div className='cart-wrapper' style={{ backgroundColor: theme.dark_background }}>
                <CartItemsContainer />
                <CartCheckout />
            </div>
        </>
    );
};
