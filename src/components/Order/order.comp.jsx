import { useTheme } from '../../context';
import { CartItem } from '../Cart/CartItem/cartitem.comp';

//styles
import './order.styles.scss';

export const Order = ({ order }) => {
    const { theme } = useTheme();
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const transform_date = (date) => {
        const [year, month, day] = date?.split('T')[0]?.split('-');
        return `${day} ${months[month - 1]} ${year}`;
    };

    return (
        <div className='order_container' style={{ border: `2px solid ${theme?.light_background}` }}>
            <div className='order_excerpt' style={{ backgroundColor: theme?.light_background }}>
                <div className='order_date'>
                    <p className='text_sm'>Order placed on</p>
                    <p>{transform_date(order?.createdAt)}</p>
                </div>
                <div className='order_total'>
                    <p className='text_sm'>Total</p>
                    <p>₹ {order?.total}</p>
                </div>
                <div className='order_shipping'>
                    <p className='text_sm'>Shipping to</p>
                    <p>{order?.shipping?.receiver_name}</p>
                </div>
            </div>
            <div className='order_items'>
                {order?.items?.map((item) => {
                    const { image, book_id, name } = item;
                    return (
                        <div key={book_id}>
                            <img src={image} alt={name} />
                            <div>
                                <h2>{name}</h2>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
