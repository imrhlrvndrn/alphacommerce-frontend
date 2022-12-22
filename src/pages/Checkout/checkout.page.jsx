import { useState, useEffect } from 'react';
import { Accordion } from '../../components';
import { useAuth, useModalManager, useTheme } from '../../context';
import { get_all_addresses } from '../../http';

// styles
import './checkout.styles.scss';
import { checkout_accordions, update_checkout_accordion } from './checkout.util';

export const CheckoutPage = () => {
    const { theme } = useTheme();
    const { showModal } = useModalManager();
    const [{ currentUser }, auth_dispatch] = useAuth();

    const [accordions, setAccordions] = useState(checkout_accordions);
    const [checkout_state, setCheckoutState] = useState({
        address: {},
        payment: {
            type: 'card',
            details: {
                name_on_card: 'Rahul Ravindran',
                card_number: '424242424242',
                security_code: '824',
            },
        },
        order: {}, // A separate product list from the cart items
    });

    useEffect(() => {
        const fetch_all_addresses = async () => {
            try {
                const {
                    data: {
                        success,
                        data: { addresses: updated_addresses },
                    },
                } = await get_all_addresses({ user_id: currentUser?._id });
                console.log('new addresses => ', { updated_addresses, success });
                if (success) {
                    auth_dispatch({ type: 'SET_ADDRESSES', payload: { updated_addresses } });
                    setCheckoutState((prevState) => ({
                        ...prevState,
                        address: updated_addresses?.filter((address) => address?.is_default)[0],
                    }));
                }
            } catch (error) {
                console.error(error);
            }
        };

        (async () => await fetch_all_addresses())();
    }, []);

    return (
        <div
            className='checkout'
            style={{ backgroundColor: theme?.dark_background, color: theme?.color }}
        >
            <div className='accordion_container'>
                {accordions?.map(({ heading, is_active, id, is_locked, render_content }) => {
                    const content_render = render_content.bind({
                        showModal,
                        theme,
                        update_function: setCheckoutState,
                        checkout_address_id: checkout_state?.address?._id,
                    });
                    return (
                        <Accordion
                            key={id}
                            options={{ heading, is_active, id, is_locked }}
                            updateAccordion={update_checkout_accordion.bind({
                                update_function: setAccordions,
                            })}
                        >
                            {content_render({
                                addresses: currentUser?.addresses || [{}, {}],
                            })}
                        </Accordion>
                    );
                })}
            </div>
        </div>
    );
};
