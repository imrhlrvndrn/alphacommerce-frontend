import { useState } from 'react';
import axios from '../../axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useTheme, useDataLayer, useModalManager } from '../../context';

// styles
import './nav.scss';

// components
import {
    UserIcon,
    LightModeIcon,
    WishListIcon,
    DarkModeIcon,
    LightLogo,
    DarkLogo,
    CartIcon,
} from '../../react_icons';

export const Nav = () => {
    const navigate = useNavigate();
    const { showModal } = useModalManager();
    const [{ cart }, dataDispatch] = useDataLayer();
    const [{ currentUser }, authDispatch] = useAuth();
    const { theme, isLightTheme, setTheme } = useTheme();
    // const [authModal, setAuthModal] = useState({ isActive: false, authState: 'signup' });

    const toggleTheme = () => setTheme((prevState) => !prevState);

    const logout = async () => {
        try {
            const response = await axios.get('/auth/logout');
            if (response.data.success) {
                authDispatch({ type: 'LOGOUT' });
                dataDispatch({
                    type: 'SET_CART',
                    payload: {
                        cart: {
                            _id: 'guest',
                            user: 'guest',
                            data: [],
                            checkout: { subtotal: 0, total: 0 },
                        },
                    },
                });
                dataDispatch({
                    type: 'SET_WISHLISTS',
                    payload: {
                        wishlists: [],
                    },
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <NavBar
            logo={
                isLightTheme ? (
                    <DarkLogo onClick={() => navigate('/')} />
                ) : (
                    <LightLogo onClick={() => navigate('/')} />
                )
            }
        >
            <NavItem icon={<UserIcon fill={theme?.color} />}>
                <DropdownMenu>
                    {currentUser._id === 'guest' ? (
                        <>
                            <DropdownItem
                                title={'Login'}
                                onClick={() =>
                                    showModal('AUTH_MODAL', {
                                        state: { authState: 'login' },
                                    })
                                }
                            />
                            <DropdownItem
                                title={'Signup'}
                                onClick={() =>
                                    showModal('AUTH_MODAL', {
                                        state: { authState: 'signup' },
                                    })
                                }
                            />
                        </>
                    ) : (
                        <>
                            <DropdownItem title={'My orders'} onClick={() => navigate('/orders')} />
                            <DropdownItem title={'Logout'} onClick={logout} />
                        </>
                    )}
                </DropdownMenu>
            </NavItem>
            <NavItem icon={<WishListIcon fill={theme?.color} />} to={`/wishlists`} />
            <NavItem
                to={`/cart`}
                icon={<CartIcon fill={theme?.color} />}
                badge_counter={cart?.data?.length}
            />
            <NavItem
                icon={
                    isLightTheme ? (
                        <DarkModeIcon fill={theme?.color} />
                    ) : (
                        <LightModeIcon fill={theme?.color} />
                    )
                }
                event_function={toggleTheme}
            />
        </NavBar>
    );
};

export const NavBar = ({ children, logo }) => {
    const { theme } = useTheme();

    return (
        <nav className='navbar' style={{ color: theme?.color }}>
            {logo}
            <div className='navbar_items'>{children}</div>
        </nav>
    );
};

export const NavItem = ({ children, icon = null, to = '', event_function, badge_counter = 0 }) => {
    const { theme } = useTheme();
    const [open, setOpen] = useState(false);
    event_function = event_function ? event_function : () => !to && setOpen(!open);

    const NavItemWrapper = ({ children }) =>
        to ? (
            <Link to={to} className='nav_item' onClick={event_function}>
                {children}
            </Link>
        ) : (
            <div className='nav_item' onClick={event_function}>
                {children}
            </div>
        );

    return (
        <NavItemWrapper>
            <div className='icon' style={{ backgroundColor: theme?.dark_background }}>
                {icon}
            </div>
            {badge_counter > 0 && (
                <div
                    className='badge-floating rounded-full flex items-center justify-center'
                    style={{
                        backgroundColor: theme.constants.primary,
                        color: theme.constants.dark,
                    }}
                >
                    {badge_counter}
                </div>
            )}
            {open && children}
        </NavItemWrapper>
    );
};

export const DropdownMenu = ({ children }) => {
    const { theme } = useTheme();

    return (
        <div className='dropdown' style={{ backgroundColor: theme?.light_background }}>
            {children}
        </div>
    );
};

export const DropdownItem = ({ icon = null, title = 'dropdown item', onClick = () => {} }) => {
    const { theme } = useTheme();
    const click_action = onClick;

    return (
        <div
            className='dropdown_item'
            style={{ backgroundColor: theme?.dark_background }}
            onClick={click_action}
        >
            {icon && <div className='icon'>{icon}</div>}
            <p>{title}</p>
        </div>
    );
};
