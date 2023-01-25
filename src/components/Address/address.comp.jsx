import { v4 } from 'uuid';
import { useToast } from '../../hooks';
import { delete_address } from '../../http';
import { useAuth, useModalManager, useTheme } from '../../context';
import { EditIcon, TrashIcon } from '../../react_icons';

// styles
import './address.styles.scss';

export const Address = ({ address, update_function, checkout_address_id }) => {
    const { theme } = useTheme();
    const { setToast } = useToast();
    const { showModal } = useModalManager();
    const [{ currentUser }, auth_dispatch] = useAuth();
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

    const remove_address = async () => {
        try {
            const {
                data: { success, toast },
            } = await delete_address({ user_id: currentUser?._id, address_id: _id });
            if (success) {
                auth_dispatch({ type: 'DELETE_ADDRESS', payload: { address_id: _id } });
                setToast({ ...toast, _id: v4() });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            className={`address ${is_selected ? 'active' : ''}`}
            style={{
                color: theme?.color,
            }}
            onClick={() =>
                update_function((prevState) => {
                    return { ...prevState, address };
                })
            }
        >
            <div className='address_content'>
                <div className='receiver'>
                    <h4>{receiver_name}</h4>
                    {is_default && <p className='default_tag'>Default</p>}
                </div>
                <p className='inline_address'>{full_address}</p>
                <p className='inline_address'> {pincode}, </p>
                <p className='inline_address'>{state}, </p>
                <p className='inline_address'>{country}</p>
            </div>
            <div className='address_actions'>
                <EditIcon
                    fill={theme?.color}
                    style={{ marginLeft: 'auto' }}
                    onClick={() => showModal('NEW_ADDRESS_MODAL', { address })}
                />
                <TrashIcon fill={theme?.color} size={26} onClick={() => remove_address()} />
            </div>
        </div>
    );
};
