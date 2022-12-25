import { v4 } from 'uuid';
import { Address, CartItem } from '../../components';
import { checkout } from '../../http';

// ! figure out the arrangement of these methods & constants so that everything is smooth
export const update_checkout_accordion = function ({ id, multi }) {
    this.update_function((prevState) =>
        prevState?.map((item) =>
            item?.id === id
                ? { ...item, is_active: !item?.is_active }
                : multi
                ? item
                : { ...item, is_active: false }
        )
    );
};

export function render_addresses({ addresses = [] }) {
    return (
        <div style={{ border: `1px solid ${this?.theme?.color}`, padding: '1rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Your addresses</h3>
            <>
                {addresses?.length > 0 ? (
                    addresses?.map((address) => (
                        <Address
                            key={address?._id}
                            address={address}
                            update_function={this?.update_function}
                            checkout_address_id={this?.checkout_address_id}
                        />
                    ))
                ) : (
                    <div>No address</div>
                )}
                <p
                    style={{ margin: '1rem 0 0 1rem', cursor: 'pointer' }}
                    onClick={() => this?.showModal('NEW_ADDRESS_MODAL', {})}
                >
                    Add new address
                </p>
            </>
        </div>
    );
}

export function render_order_items({ order_items, user }) {
    const initiate_checkout = async (event) => {
        // Transforming the order items into an object that can be passed to the Stripe API
        order_items = order_items?.map((item) => ({
            product_data: {
                name: item?.book?.name,
                images: [item?.book?.cover_image?.url],
                metadata: {
                    book_id: item?.book?._id,
                    user_id: user?.id,
                    user_email: user?.email,
                },
            },
            unit_amount: Math.round(
                (item?.variant?.price + (item?.variant?.price * 18) / 100) * 100
            ),
            quantity: item?.quantity,
        }));

        event.preventDefault();
        const {
            data: {
                success,
                data: { redirect_url },
            },
        } = await checkout({ order_items, user });

        // This URL redirects to the Stripe pre-built checkout page
        if (success && redirect_url) window.location.href = redirect_url;
    };

    return (
        <div className='cart-items' style={{ color: this?.theme?.color }}>
            {order_items?.map((order_item) => (
                <CartItem key={order_item?.book?._id} item={order_item} />
            ))}
            <form onSubmit={initiate_checkout}>
                <button type='submit'>Proceed to buy</button>
            </form>
        </div>
    );
}

export const checkout_accordions = [
    {
        heading: 'Select a delivery address',
        is_active: true,
        edit: false,
        id: v4(),
        render_content: render_addresses,
    },
    {
        heading: 'Review & place your order',
        is_active: false,
        edit: false,
        id: v4(),
        render_content: render_order_items,
    },
];
