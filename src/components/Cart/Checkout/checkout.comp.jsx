import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDataLayer, useTheme } from '../../../context';
import { calculateSubTotal, calculateTax, calculateTotal, fixedTo } from '../../../utils';

export const CartCheckout = ({ setWishlistModal }) => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [{ cart }, data_dispatch] = useDataLayer();

    console.log('location => ', location);

    useEffect(() => {
        data_dispatch({
            type: 'SET_CART',
            payload: {
                cart: {
                    ...cart,
                    checkout: {
                        subtotal: calculateSubTotal(cart?.data),
                        total: fixedTo(
                            calculateTotal(
                                calculateSubTotal(cart?.data),
                                calculateTax(calculateSubTotal(cart?.data))
                            ),
                            2
                        ),
                    },
                },
            },
        });
    }, []);

    return (
        <div
            className='cart-checkout p-8 h-max'
            style={{ backgroundColor: theme?.light_background, color: theme?.color }}
        >
            <h2 className='text-lg m-0'>Price summary</h2>
            <div className='checkout-group pt-4 pb-4'>
                <div className='checkout-group-row flex justify-between mb-4'>
                    <div className='heading'>Sub-total</div>
                    <div className='price'>₹ {fixedTo(calculateSubTotal(cart?.data), 2)}</div>
                </div>
                <div className='checkout-group-row flex justify-between mb-4'>
                    <div className='heading'>GST</div>
                    <div className='price'>
                        ₹ {fixedTo(calculateTax(calculateSubTotal(cart?.data)), 2)}
                    </div>
                </div>
            </div>
            <div className='cart-checkout-cta' style={{ backgroundColor: theme?.light_background }}>
                <div className='total-amount'>
                    <div className='heading'>Total</div>
                    <div className='price'>
                        ₹{' '}
                        {fixedTo(
                            calculateTotal(
                                calculateSubTotal(cart?.data),
                                calculateTax(calculateSubTotal(cart?.data))
                            ),
                            2
                        )}
                    </div>
                </div>
                {location?.pathname === '/cart' && (
                    <button
                        className='w-full text-align-center font-semibold'
                        style={{
                            backgroundColor: theme?.constants?.primary,
                            color: theme?.constants?.dark,
                        }}
                        onClick={() => navigate('/checkout')}
                    >
                        Checkout
                    </button>
                )}
            </div>
        </div>
    );
};
