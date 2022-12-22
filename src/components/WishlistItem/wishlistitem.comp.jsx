import { useParams } from 'react-router-dom';
import { maxWords } from '../../utils';
import { useWishlist } from '../../hooks';
import { useModalManager, useTheme } from '../../context';

// styles
import './wishlistitem.styles.scss';

// React components
import { AddToCart } from '../';

export const WishlistItem = ({ item, wishlist_name }) => {
    const { theme } = useTheme();
    const { showModal } = useModalManager();
    const { id: wishlist_id } = useParams();
    const { removeFromWishlist } = useWishlist();
    const { _id, name, cover_image, variants } = item;
    const paperbackVariant = variants?.find((item) => item.type === 'paperback');

    return (
        <div
            className='wishlistItem_wrapper'
            style={{ color: theme?.color, borderBottom: `2px solid ${theme?.light_background}` }}
        >
            <div className='wishlistItem_container'>
                <div className='wishlistItem_details'>
                    <a href={`/p/${item?._id}`} className='name' style={{ color: theme?.color }}>
                        {maxWords(name, 30)}
                    </a>
                    {/* <p className='total_price font-lg'>₹ {total}</p> */}
                    {/* <p className='price'>
                        ₹ {getSelectedVariantPrice(item.book.variants, variant.type)}
                    </p> */}
                    <div className='quantity_container'>
                        <AddToCart item={item} variant={paperbackVariant} />
                    </div>
                </div>
                <img src={cover_image?.url} alt={name} />
            </div>
            <div className='wishlistItem_cta'>
                <button
                    className='remove_item'
                    onClick={() => removeFromWishlist(wishlist_id, item)}
                    style={{ color: theme.color }}
                >
                    Remove
                </button>
                <button
                    className='remove_item'
                    onClick={() =>
                        showModal('WISHLIST_MODAL', {
                            action: 'MOVE_WISHLIST_ITEM',
                            wishlist: { current: { _id: wishlist_id, name: wishlist_name } },
                            item,
                        })
                    }
                    style={{ color: theme.color }}
                >
                    Move
                </button>
            </div>
        </div>
    );
};
