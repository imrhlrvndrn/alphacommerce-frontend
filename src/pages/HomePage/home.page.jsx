import { useTheme, useDataLayer } from '../../context';

// styles
import './homepage.styles.scss';

// React components
import { ProductList, CategoryList } from '../../components';

export const HomePage = () => {
    const { theme } = useTheme();
    const [{ books }] = useDataLayer();

    return (
        <>
            <div
                className='hero-section'
                style={{
                    backgroundColor: theme.dark_background,
                    color: theme.color,
                }}
            >
                <ProductList />
            </div>
            <section
                className='categories'
                style={{
                    backgroundColor: theme.light_background,
                    color: theme.color,
                }}
            >
                <CategoryList genre='web development' books={books} />
                <CategoryList genre='horror' books={books} />
                <CategoryList genre='business' books={books} />
            </section>
        </>
    );
};
