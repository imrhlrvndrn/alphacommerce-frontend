import { v4 } from 'uuid';
import { useState } from 'react';
import {
    address_inputs,
    create_new_address,
    update_new_address_on_change,
} from './addressmodal.util';
import { useAuth, useModalManager, useTheme } from '../../../context';

// styles
import './addressmodal.styles.scss';

// components
import { Checkbox, InputGroup, Modal } from '../..';

export const AddressModal = () => {
    const { theme } = useTheme();
    const { hideModal } = useModalManager();
    const [{ currentUser }, auth_dispatch] = useAuth();
    const [default_flag, setDefaultFlag] = useState(false);
    const [new_address, setNewAddress] = useState({
        full_name: 'Rahul Ravindran',
        address_line_1: 'new_address.address_line_1',
        address_line_2: 'new_address.address_line_2',
        pincode: '382393',
        state: 'Uttar Pradesh',
        country: 'India',
        phone_number: 99474619,
        is_default: false,
    });

    const render_address_inputs = address_inputs.bind({ theme });
    const add_new_address = create_new_address.bind({
        auth_dispatch,
        hideModal,
    });
    const update_new_address = update_new_address_on_change.bind({ setNewAddress });

    return (
        <Modal>
            <div style={{ width: '400px' }}>
                <h2>Add new delivery address</h2>
                <form
                    onSubmit={(event) =>
                        add_new_address(event, { user_id: currentUser?._id, address: new_address })
                    }
                    style={{ display: 'flex', flexDirection: 'column' }}
                >
                    {render_address_inputs(new_address)?.map((input) => (
                        <InputGroup
                            onChange={update_new_address}
                            data={{ input: input?.input, label: input?.label }}
                        />
                    ))}
                    <Checkbox
                        options={{
                            name: 'Make this default address',
                            event_handler: () => {
                                setDefaultFlag((prevState) => !prevState);
                            },
                            is_checked: default_flag,
                        }}
                    />
                    <button
                        type='submit'
                        style={{
                            margin: '0 auto',
                            backgroundColor: theme?.constants?.primary,
                            color: theme?.constants?.dark,
                        }}
                    >
                        Save & use this address
                    </button>
                </form>
            </div>
        </Modal>
    );
};
