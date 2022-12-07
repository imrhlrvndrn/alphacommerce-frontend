import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTheme } from '../../context';

// Styles
import './categorylist.styles.scss';

// React components
import { CategoryListItem } from '../';

export const CategoryList = ({ genre }) => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);

    const fetchBooksByGenre = async (limit = 5) => {
        try {
            const {
                data: { success, data, toast },
            } = await axios.post(`/books`, {
                type: 'FETCH_DETAILS',
                limit,
                genre,
            });
            if (success) setBooks((prevState) => data?.books);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchBooksByGenre(6);
    }, []);

    return (
        <div className='category-section'>
            {genre && (
                <div className='heading flex justify-between' style={{ color: theme?.color }}>
                    {genre}
                    <span style={{ color: theme?.color }} className='floating-genre'>
                        {genre}
                    </span>
                    {/* <Link
                        style={{ color: theme.color }}
                        to={{
                            pathname: `/p`,
                            search: `?genre=${slugify(genre)}`,
                        }}
                    >
                        Show all
                    </Link> */}
                    <button
                        style={{ color: theme?.color, backgroundColor: 'transparent', padding: 0 }}
                        onClick={() => navigate('/p', { state: { genre } })}
                    >
                        Show all
                    </button>
                </div>
            )}
            <div className='category-list flex'>
                {books?.map((book) => (
                    <CategoryListItem key={book?._id} item={book} />
                ))}
            </div>
        </div>
    );
};
