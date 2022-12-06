import { useEffect, useState } from 'react';
import { useCart } from '../../hooks';
import { useAuth, useTheme, useDataLayer } from '../../context';

// styles
import './cartpage.styles.scss';

// React components
import { WishlistModal, Modal, CartItemsContainer, CartCheckout } from '../../components';

export const CartPage = () => {
    const { theme } = useTheme();
    const [{ currentUser }] = useAuth();
    const { fetchCart } = useCart();
    const [{ cart }] = useDataLayer();
    const [wishlistModal, setWishlistModal] = useState({ isActive: false });

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
                <CartCheckout setWishlistModal={setWishlistModal} />
            </div>
            {wishlistModal.isActive && (
                <Modal setIsModalActive={setWishlistModal}>
                    <WishlistModal
                        setIsModalActive={setWishlistModal}
                        productIds={cart?.data?.map((item) => ({
                            id: item.id,
                            totalPrice: item.totalPrice,
                        }))}
                    />
                </Modal>
            )}
        </>
    );
};
