import { v4 } from 'uuid';
import { Address } from '../../components';

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

export const checkout_accordions = [
    {
        heading: 'Select a delivery address',
        is_active: true,
        edit: false,
        id: v4(),
        render_content: render_addresses,
    },
    {
        heading: 'Payment method',
        is_active: false,
        edit: false,
        id: v4(),
        render_content: () => {},
    },
    {
        heading: 'Review & place your order',
        is_active: false,
        edit: false,
        id: v4(),
        render_content: () => {},
    },
];
