import { useNavigate } from 'react-router-dom';
import { useTheme, useDataLayer } from '../../../context';

// React components
import { CartItem } from '../../';

export const CartItemsContainer = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [{ cart }] = useDataLayer();

    return (
        <div className='cart'>
            <div className='text-md cart-heading' style={{ color: theme.color }}>
                My bag <span className='font-light'>{cart.data.length} item(s)</span>
            </div>
            {cart.data.length === 0 ? (
                <p style={{ color: theme.color }}>No items in cart</p>
            ) : (
                <div className='cart-items' style={{ color: theme.color }}>
                    {cart.data.map((cartItem) => (
                        <CartItem key={cartItem.book._id} item={cartItem} />
                    ))}
                </div>
            )}
            <button
                className='continue-shopping mt-8 mr-8 text-s'
                style={{
                    backgroundColor: theme.light_background,
                    color: theme.color,
                }}
                onClick={() => navigate('/')}
            >
                Continue Shopping
            </button>
        </div>
    );
};
