import axios from '../../axios';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDataLayer, useAuth, useTheme, useModalManager } from '../../context';

// React Components
import { WishlistCard, WishlistItem } from '../../components';
import { maxWords } from '../../utils';

export const WishlistPage = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const urlParams = useParams();
    const { showModal } = useModalManager();
    const [{ currentUser }] = useAuth();
    const [{ wishlists }, dataDispatch] = useDataLayer();
    const wishlistIndex = wishlists?.findIndex((item) => item?._id === urlParams?.id);

    const renderWishListItems = () =>
        wishlists[wishlistIndex]?.data?.length
            ? wishlists[wishlistIndex]?.data?.map((item) => (
                  <WishlistItem
                      item={item?.book}
                      wishist_name={wishlists[wishlistIndex]?.name?.name}
                  />
              ))
            : 'No items in wishlist';

    const fetchWishlists = async () => {
        try {
            const {
                data: { success, data, toast },
            } = await axios.post(`/wishlists`, {
                type: 'FETCH_DETAILS',
                select: ['name', 'cover_image', 'data'],
                populate: { path: 'data.book' },
            });
            if (success) {
                dataDispatch({ type: 'SET_WISHLISTS', payload: { wishlists: data?.wishlists } });
                if (urlParams?.id) return;
                navigate(`/wishlists/${data?.wishlists?.[0]?._id}`, { replace: true });
            }
        } catch (error) {
            console.error(error);
        }
    };

    // useEffect(() => {}, [urlParams?.id, currentUser]);

    useEffect(() => {
        if (Cookies.get('userId') !== 'loggedout') (async () => await fetchWishlists())();
        else navigate('/', { replace: true });
    }, [wishlists]);

    return (
        <>
            <div className='cart-wrapper' style={{ backgroundColor: theme?.dark_background }}>
                <div className='cart'>
                    <div
                        className='text-md uppercase font-semibold'
                        style={{ color: theme?.color }}
                    >
                        {wishlists[wishlistIndex]?.name?.name}
                    </div>
                    <div className='cart-items' style={{ color: theme?.color }}>
                        {renderWishListItems()}
                    </div>
                    <button
                        className='continue-shopping mr-8'
                        style={{ backgroundColor: theme?.light_background, color: theme?.color }}
                        onClick={() => navigate('/')}
                    >
                        Add more to wishlist
                    </button>
                </div>
                <div
                    className='cart-checkout p-8 h-max'
                    style={{ backgroundColor: theme?.light_background, color: theme?.color }}
                >
                    <div
                        style={{
                            marginBottom: '1rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <h2 style={{ margin: '0' }}>Wishlists</h2>
                        <button
                            className='w-max font-semibold text-align-center'
                            style={{
                                padding: '0 0 0 1rem',
                                fontWeight: '400',
                                fontSize: '2rem',
                                backgroundColor: 'transparent',
                                color: theme?.color,
                            }}
                            onClick={() => {
                                showModal('NEW_WISHLIST_MODAL');
                            }}
                        >
                            +
                        </button>
                    </div>
                    <div className='checkout-group mb-4'>
                        {wishlists?.map((wishlist) => (
                            <div
                                className='p-4 mb-4 wishlistcard'
                                style={{
                                    backgroundColor:
                                        urlParams?.id === wishlist?._id &&
                                        theme?.constants?.primary,
                                    // : theme?.dark_background,
                                    color:
                                        urlParams?.id === wishlist?._id
                                            ? theme?.constants?.dark
                                            : theme?.color,
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                }}
                                onClick={() => navigate(`/wishlists/${wishlist?._id}`)}
                            >
                                {maxWords(wishlist?.name?.name, 25)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
