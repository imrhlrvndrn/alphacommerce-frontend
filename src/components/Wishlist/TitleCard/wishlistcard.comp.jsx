import React from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../../../context';
import { maxWords } from '../../../utils';

// styles
import './wishlistcard.styles.scss';

export const WishlistCard = ({ name, _id }) => {
    const { theme } = useTheme();
    const { _id: wishlist_id } = useParams();

    return (
        <div
            className='p-4 wishlistcard'
            style={{
                backgroundColor:
                    wishlist_id === _id ? theme?.constants?.primary : theme?.dark_background,
                color: wishlist_id === _id ? theme?.constants?.dark : theme?.color,
                fontWeight: 600,
            }}
        >
            {maxWords(name, 25)}
        </div>
    );
};
