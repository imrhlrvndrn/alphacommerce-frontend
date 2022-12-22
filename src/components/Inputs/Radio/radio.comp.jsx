import { useTheme } from '../../../context';

export const Radio = ({ options }) => {
    const { theme } = useTheme();
    const {
        name = 'label for radio button',
        is_checked = false,
        event_handler = () => {},
    } = options;

    return (
        <div
            className='input-radio'
            style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}
        >
            <span
                tabIndex='0'
                aria-label={`${name}`}
                className='dup-radio'
                style={{
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                    marginRight: '1rem',
                    borderRadius: '50%',
                    backgroundColor: is_checked ? theme?.constants?.primary : theme?.color,
                }}
                onKeyDown={(event) => event_handler(event, name)}
                onClick={(event) => event_handler(event, name)}
            ></span>
            <label
                onClick={(event) => event_handler(event, name)}
                style={{
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                }}
            >
                {name}
            </label>
        </div>
    );
};

// ```
// data = [{
//     id: "1",
//     isChecked: false,
//     name: 'price-sort',
// }]
// ```;
