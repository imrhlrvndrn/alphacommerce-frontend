// styles
import './inputgroup.styles.scss';

export const InputGroup = ({ onChange, data }) => {
    const {
        label = {
            style: {},
        },
        input = {
            autoFocus: false,
            required: false,
            value: '',
            onChange: () => {},
            style: {},
            type: 'text',
            name: 'input',
            id: 'input',
            placeholder: 'input',
        },
    } = data;

    return (
        <div className='input-group'>
            <label style={label?.style} htmlFor={input?.name}>
                {input?.placeholder}
            </label>
            <input
                autoFocus={input?.autoFocus}
                value={input?.value}
                onChange={onChange}
                style={input?.style}
                type={input?.type}
                name={input?.name}
                id={input?.name}
                placeholder={input?.placeholder}
                autoComplete='off'
                required={input?.required}
            />
        </div>
    );
};
