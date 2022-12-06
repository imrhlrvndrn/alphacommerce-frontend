// styles
import './address.styles.scss';

export const Address = () => {
    const add_new_address = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <h1>Add new delivery address</h1>
            <form onSubmit={() => add_new_address}>
                <input type='text' name='Country' value='India' readOnly id='' />
                <input type='text' name='Full name' id='' />
                <input type='text' name='Mobile number' id='' />
                <input type='text' name='Pincode' id='' />
                <input type='text' name='Flat, House no., Building, Company, Apartment' id='' />
                <input type='text' name='Area, Street, Sector, Village' id='' />
                <input type='text' name='Landmark (optional)' id='' />
                <input type='text' name='Town/City' id='' />
                <input type='text' name='State' id='' />
                <input type='checkbox' name='default_address' id='' />
                <button type='submit'>Save & use this address</button>
            </form>
        </div>
    );
};
