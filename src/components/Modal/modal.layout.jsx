import { useModalManager, useTheme } from '../../context';

// styles
import './modal.styles.scss';

export const Modal = ({ setIsModalActive = () => {}, children }) => {
    const { theme } = useTheme();
    const { hideModal } = useModalManager();

    return (
        <div className='modal_wrapper'>
            <div className='modal_underlay' onClick={hideModal}></div>
            <div
                className='modal'
                style={{ backgroundColor: theme.dark_background, color: theme.color }}
            >
                {children}
            </div>
        </div>
    );
};
