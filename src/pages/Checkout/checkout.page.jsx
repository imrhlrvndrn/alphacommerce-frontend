import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, CartCheckout } from '../../components';
import { useAuth, useDataLayer, useModalManager, useTheme } from '../../context';
import { get_all_addresses } from '../../http';

// styles
import './checkout.styles.scss';
import { checkout_accordions, update_checkout_accordion } from './checkout.util';

export const CheckoutPage = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const { showModal } = useModalManager();
    const [{ cart }] = useDataLayer();
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

        setCheckoutState((prevState) => ({
            ...prevState,
            order: {
                items: cart?.data,
            },
        }));

        (async () => (cart?.data?.length > 0 ? await fetch_all_addresses() : navigate(-1)))();
    }, []);

    return (
        <div
            className='checkout'
            style={{ backgroundColor: theme?.dark_background, color: theme?.color }}
        >
            <div className='accordion_container'>
                {accordions?.map(({ heading, is_active, id, is_locked, render_content }) => {
                    const content_render = render_content?.bind({
                        showModal,
                        theme,
                        update_function: setCheckoutState,
                        checkout_address_id: checkout_state?.address?._id,
                        navigate,
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
                                order_items: cart?.data,
                                user: {
                                    id: currentUser?._id,
                                    email: currentUser?.email,
                                    address: checkout_state?.address,
                                },
                            })}
                        </Accordion>
                    );
                })}
            </div>
            <CartCheckout />
        </div>
    );
};
