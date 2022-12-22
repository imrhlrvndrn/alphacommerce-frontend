import { useTheme } from '../../context';
import { EditIcon } from '../../react_icons';

// styles
import './address.styles.scss';

export const Address = ({ address, update_function, checkout_address_id }) => {
    const { theme } = useTheme();
    const {
        receiver_name = 'Rahul Ravindran',
        full_address = `${address?.address_line_1}, ${address?.address_line_2}, `,
        pincode,
        state,
        country,
        is_default,
        _id,
    } = address;
    const is_selected = checkout_address_id === _id;

    return (
        <div
            className={`address ${is_selected ? 'active' : ''}`}
            style={{
                color: theme?.color,
            }}
            onClick={() =>
                update_function((prevState) => {
                    console.log('checkout state => ', prevState);
                    return { ...prevState, address };
                })
            }
        >
            <div className='address_content'>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ marginRight: '1rem' }}>{receiver_name}</h4>
                    {is_default && <p className='default_tag'>Default</p>}
                </div>
                <p className='inline_address'>{full_address}</p>
                <p className='inline_address'> {pincode}, </p>
                <p className='inline_address'>{state}, </p>
                <p className='inline_address'>{country}</p>
            </div>
            <EditIcon fill={theme?.color} />
        </div>
    );
};
