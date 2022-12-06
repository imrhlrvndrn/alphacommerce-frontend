import { useTheme } from '../../context';

// styles
import './modal.styles.scss';

export const Modal = ({ setIsModalActive, children }) => {
    const { theme } = useTheme();

    return (
        <>
            <div
                className='modal-underlay'
                onClick={() =>
                    setIsModalActive((prevState) => ({
                        ...prevState,
                        isActive: !prevState.isActive,
                    }))
                }
            ></div>
            <div
                className='modal'
                style={{ backgroundColor: theme.dark_background, color: theme.color }}
            >
                {children}
            </div>
        </>
    );
};
