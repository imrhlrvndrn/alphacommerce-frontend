import { useEffect, useRef, useState } from 'react';
import { maxWords } from '../../../../utils';
import { useWishlist } from '../../../../hooks';
import { useTheme, useDataLayer, useModalManager } from '../../../../context';

// styles
import './addtowishlistmodal.styles.scss';

// components
import { Modal } from '../../..';

// * The items prop is an Array so that you can pass multiple items(books) for adding a whole list of items
// * For example => move an entire cart and create a wishlist out of it in one go
export const AddToWishlistModal = () => {
    const { theme } = useTheme();
    const { showModal } = useModalManager();
    const wishlistRef = useRef(null);
    const { addToWishlist } = useWishlist();
    const [filter, setFilter] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [{ wishlists }] = useDataLayer();

    const renderWishlistNames = (filter = '') => {
        const filteredWishlist =
            filter !== ''
                ? wishlists?.filter((item) =>
                      item?.name?.name?.toLowerCase()?.includes(filter?.toLowerCase())
                  )
                : wishlists;

        if (filteredWishlist?.length === 0)
            return <p style={{ color: theme?.color, padding: '1rem' }}>No wishlist</p>;

        return filteredWishlist.map((wishlistItem) => (
            <button
                title={wishlistItem?.name?.name}
                disabled={disabled}
                className={`mb-1 px-4 w-full text-align-left text-sm ${
                    disabled ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
                style={{ backgroundColor: theme.light_background, color: theme.color }}
                onClick={async () => {
                    setDisabled(true);
                    await addToWishlist(wishlistItem?._id, setDisabled);
                }}
            >
                {maxWords(wishlistItem?.name?.name, 30)}
            </button>
        ));
    };

    useEffect(() => {
        wishlistRef.current.focus();
    }, []);

    return (
        <Modal>
            <div className='wishlist_modal' style={{ color: theme.color }}>
                <h1 className='heading'>Add to wishlist</h1>
                <div className='cta'>
                    <input
                        type='text'
                        ref={wishlistRef}
                        value={filter}
                        autoComplete='off'
                        id='wishlist_modal_input'
                        name='wishlist_modal_input'
                        placeholder='Search for wishlist...'
                        onChange={(event) => setFilter((prevState) => event?.target?.value)}
                        style={{ backgroundColor: theme?.light_background, color: theme?.color }}
                    />
                    <div
                        className='createNew'
                        onClick={() =>
                            showModal('NEW_WISHLIST_MODAL', { action: 'create_and_save' })
                        }
                        style={{ backgroundColor: theme?.dark_background, color: theme?.color }}
                    >
                        + Create wishlist
                    </div>
                </div>
                <div className='wishlist_modal_wrapper'>{renderWishlistNames(filter)}</div>
            </div>
        </Modal>
    );
};
