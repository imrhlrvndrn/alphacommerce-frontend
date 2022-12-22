import { v4 } from 'uuid';
import { add_new_address } from '../../../http';

export async function create_new_address(event, args) {
    event.preventDefault();
    try {
        const {
            data: {
                success,
                data: { address },
                toast,
            },
        } = await add_new_address(args);

        if (success) this?.auth_dispatch({ type: 'ADD_ADDRESS', payload: { address } });
    } catch (error) {
        console.error(error);
    } finally {
        this?.hideModal();
    }
}

export function update_new_address_on_change(event) {
    this.setNewAddress((prevState) => ({
        ...prevState,
        [event?.target?.name]: event?.target?.value,
    }));
}

export function address_inputs(new_address) {
    return [
        {
            input: {
                id: v4(),
                required: true,
                value: new_address?.full_name,
                name: 'full_name',
                placeholder: 'Full name',
                style: { backgroundColor: this.theme?.light_background, color: this.theme?.color },
            },
            label: { style: { color: this.theme?.color } },
        },
        {
            input: {
                id: v4(),
                required: true,
                value: new_address?.address_line_1,
                name: 'address_line_1',
                placeholder: 'Flat, House no., Building, Company, Apartment',
                style: { backgroundColor: this.theme?.light_background, color: this.theme?.color },
            },
            label: { style: { color: this.theme?.color } },
        },
        {
            input: {
                id: v4(),
                required: true,
                value: new_address?.address_line_2,
                name: 'address_line_2',
                placeholder: 'Area, Street, Sector, Village',
                style: { backgroundColor: this.theme?.light_background, color: this.theme?.color },
            },
            label: { style: { color: this.theme?.color } },
        },
        {
            input: {
                id: v4(),
                required: true,
                value: new_address?.pincode,
                name: 'pincode',
                placeholder: 'Pincode',
                style: { backgroundColor: this.theme?.light_background, color: this.theme?.color },
            },
            label: { style: { color: this.theme?.color } },
        },
        {
            input: {
                id: v4(),
                required: true,
                value: new_address?.state,
                name: 'state',
                placeholder: 'State',
                style: { backgroundColor: this.theme?.light_background, color: this.theme?.color },
            },
            label: { style: { color: this.theme?.color } },
        },
        {
            input: {
                id: v4(),
                required: true,
                value: new_address?.country,
                name: 'country',
                placeholder: 'Country',
                style: { backgroundColor: this.theme?.light_background, color: this.theme?.color },
            },
            label: { style: { color: this.theme?.color } },
        },
        {
            input: {
                id: v4(),
                required: true,
                value: new_address?.phone_number,
                type: 'number',
                name: 'phone_number',
                placeholder: 'Mobile number with country code',
                style: { backgroundColor: this.theme?.light_background, color: this.theme?.color },
            },
            label: { style: { color: this.theme?.color } },
        },
    ];
}
