import { useTheme } from '../../context';

// Styles
import './accordion.styles.scss';

export const Accordion = ({ options, updateAccordion, children }) => {
    const { theme } = useTheme();
    const { heading, is_active, id, multi = false, edit } = options;

    return (
        <div
            className='accordion'
            style={{
                backgroundColor: theme?.light_background,
                color: theme?.color,
                padding: is_active ? '1.5rem 2rem' : '1rem 1.5rem',
            }}
        >
            <div
                className='accordion-heading'
                style={{
                    marginBottom: is_active ? '1rem' : '',
                    textTransform: edit ? 'capitalize' : 'none',
                }}
                onClick={() => updateAccordion({ id, multi })}
            >
                {heading} <span>{is_active ? '-' : '+'}</span>
            </div>
            <div
                className='accordion-content'
                style={{
                    overflowY: 'hidden',
                    height: is_active ? 'max-content' : '0',
                    opacity: is_active ? '1' : '0',
                    transition: '.4s all ease-in-out',
                }}
            >
                {children}
            </div>
        </div>
    );
};
