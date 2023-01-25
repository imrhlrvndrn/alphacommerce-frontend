// styles
import './listingproducts.styles.scss';

// React components
import { CategoryListItem } from '../../';

export const ListingProducts = ({ products }) => {
    return (
        <div className='listing-container'>
            {products?.map((product) => (
                <CategoryListItem key={product._id} item={product} />
            ))}
        </div>
    );
};
