import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth, useTheme } from '../../context';
import { useCart } from '../../hooks';
import { fetch_all_orders } from '../../http';

// styles
import './orderpage.styles.scss';

// components
import { OrderContainer } from '../../components';

export const OrderPage = () => {
    const [{ currentUser }] = useAuth();
    const { theme } = useTheme();
    const [search_params] = useSearchParams(window.location.search);
    const checkout_status = search_params.get('checkout_status');
    const { fetchCart } = useCart();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        console.log('Search params =>', { search_params, checkout_status });
        if (checkout_status === 'completed') {
            // Make a call to retrieve the user's cart items & update the state & localStorage values
            fetchCart({
                populate: {
                    path: 'data.book',
                },
            });
        }
        (async () => {
            const {
                data: {
                    success,
                    data: { orders: all_orders },
                },
            } = await fetch_all_orders({ user_id: currentUser?._id });
            setOrders((prevState) => all_orders);
        })();
    }, []);

    console.log('Orders => ', orders);

    return (
        <div
            className='order'
            style={{ backgroundColor: theme?.dark_background, color: theme?.color }}
        >
            <h2>My Orders</h2>
            <div>
                {orders?.map((order) => (
                    <OrderContainer order={order} />
                ))}
            </div>
        </div>
    );
};
