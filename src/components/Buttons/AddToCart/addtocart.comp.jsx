import { useEffect, useState } from 'react';
import { useAuth, useTheme, useDataLayer } from '../../../context';

// React components
import { QuantityButtons } from '../../';
import { useCart } from '../../../hooks/useCart';

export const AddToCart = ({ item, variant, style }) => {
    const { theme } = useTheme();
    const [{ currentUser }] = useAuth();
    const { addToCart } = useCart();
    const [{ cart }] = useDataLayer();
    const [existsInCart, setExistsInCart] = useState(false);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        setExistsInCart((prevState) =>
            cart?.data?.findIndex(
                (cartItem) =>
                    cartItem?.book?._id === item?._id && cartItem?.variant?.type === variant?.type
            ) === -1
                ? false
                : true
        );
        setDisabled(false);
    }, [cart?.data, currentUser?._id, variant?.type]);

    const addItemToCart = () => {
        setDisabled(true);
        addToCart({
            items: [
                {
                    book: { ...item },
                    quantity: 1,
                    variant:
                        item?.variants[
                            item?.variants?.findIndex((item) => item?.type === variant?.type)
                        ],
                },
            ],
        });
    };

    return (
        <>
            {!existsInCart ? (
                <button
                    disabled={disabled}
                    style={{
                        backgroundColor: theme?.color,
                        color: theme?.dark_background,
                        ...style,
                    }}
                    className={`add-to-cart mt-8 font-semibold text-s ${
                        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
                    }`}
                    onClick={addItemToCart}
                >
                    {disabled ? 'Adding to cart...' : 'Add to cart'}
                </button>
            ) : (
                <QuantityButtons productId={item?._id} variant={variant} />
            )}
        </>
    );
};
