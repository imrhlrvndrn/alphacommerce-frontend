import { useEffect, useState } from 'react';
import { useWindowSize } from '../../hooks';
import { useAuth, useTheme, useDataLayer } from '../../context';

// styles
import './nav.scss';

// React components
import { MobileNav, DesktopNav, AuthModal, Modal } from '../';

export const Nav = () => {
    const _window = useWindowSize();
    const [_, dataDispatch] = useDataLayer();
    const { theme, isLightTheme, setTheme } = useTheme();
    const [{ currentUser }, authDispatch] = useAuth();
    const [authModal, setAuthModal] = useState({ isActive: false, authState: 'signup' });

    const toggleTheme = () => setTheme((prevState) => !prevState);

    useEffect(() => {
        // dataDispatch({ type: 'TRANSFER_GUEST_DATA_TO_USER', payload: { currentUser } });
        console.log('Re-render because of change in currentUser (NavComp)', currentUser);
    }, [currentUser]);

    return (
        <>
            {/* <MobileNav /> */}
            <DesktopNav />
        </>
    );
};

export { DesktopNav } from './DesktopNav/desktopnav.comp';
export { MobileNav } from './MobileNav/mobilenav.comp';
