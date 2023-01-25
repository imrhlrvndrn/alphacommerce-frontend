import { v4 } from 'uuid';
import { useEffect, useState } from 'react';
import { alreadyExists } from '../../utils';
import { useTheme, useDataLayer } from '../../context';

// styles
import './filter.styles.scss';

// React components
import { Accordion, Checkbox, Radio } from '../';

export const Filter = () => {
    const { theme } = useTheme();
    const [{ genres, authors, genreFilters, authorFilters, priceFilter }, dataDispatch] =
        useDataLayer();
    const accordionList = [
        {
            id: v4(),
            is_active: false,
            heading: 'Price',
        },
        {
            id: v4(),
            is_active: false,
            heading: 'Genres',
        },
        {
            id: v4(),
            is_active: false,
            heading: 'Authors',
        },
    ];
    const [accordions, setAccordions] = useState(accordionList);

    const updateAccordion = ({ id, multi }) =>
        setAccordions((prevState) =>
            prevState?.map((item) =>
                item?.id === id
                    ? { ...item, is_active: !item?.is_active }
                    : multi
                    ? item
                    : { ...item, is_active: false }
            )
        );

    const handleCheckboxChange = (event, { name, type }) => {
        if (event?.type === 'click' || (event?.type === 'keydown' && event?.key == 'Enter')) {
            const filter = type === 'FILTER_BY_GENRE' ? genreFilters : authorFilters;

            dataDispatch({
                type,
                payload: alreadyExists(filter, name)
                    ? [...filter?.filter((item) => item !== name)]
                    : [...filter, name],
            });
        }
    };

    const handle_radio_change = (event, name) => {
        if (event?.type === 'click' || (event?.type === 'keydown' && event?.key === 'Enter'))
            dataDispatch({ type: 'SORT_BY_PRICE', payload: name });
    };

    const renderFilterOptions = (key) => {
        switch (key) {
            case 'Authors':
                return authors?.map((author) => (
                    <Checkbox
                        key={author?.id}
                        options={{
                            name: author,
                            type: 'FILTER_BY_AUTHOR',
                            event_handler: handleCheckboxChange,
                            is_checked: authorFilters?.includes(author),
                        }}
                    />
                ));

            case 'Genres':
                return genres?.map((genre) => (
                    <Checkbox
                        key={genre?.id}
                        options={{
                            name: genre,
                            type: 'FILTER_BY_GENRE',
                            event_handler: handleCheckboxChange,
                            is_checked: genreFilters?.includes(genre),
                        }}
                    />
                ));

            case 'Price':
                return (
                    <>
                        {[
                            { id: v4(), name: 'low-to-high', is_checked: false },
                            { id: v4(), name: 'high-to-low', is_checked: false },
                        ]?.map(({ id, name }) => (
                            <Radio
                                key={id}
                                options={{
                                    name,
                                    event_handler: handle_radio_change,
                                    is_checked: priceFilter === name,
                                }}
                            />
                        ))}
                    </>
                );

            default:
                return [];
        }
    };

    const clear_filters = (heading) => {
        if (heading === 'Genres') dataDispatch({ type: 'FILTER_BY_GENRE', payload: [] });
        else if (heading === 'Authors') dataDispatch({ type: 'FILTER_BY_AUTHOR', payload: [] });
        else if (heading === 'Price') dataDispatch({ type: 'SORT_BY_PRICE', payload: priceFilter });
    };

    return (
        <div className='filter-container'>
            {accordions?.map(({ heading, id, is_active }) => (
                <Accordion
                    key={id}
                    updateAccordion={updateAccordion}
                    options={{ heading, id, is_active }}
                >
                    <button
                        style={{
                            marginBottom: '1rem',
                            color: theme?.constants?.primary,
                            backgroundColor: 'transparent',
                            padding: 0,
                        }}
                        onClick={() => clear_filters(heading)}
                    >
                        Clear all filters
                    </button>
                    <div className='filters'>{renderFilterOptions(heading)}</div>
                </Accordion>
            ))}
        </div>
    );
};

export { FilterBySearch } from './FilterBySearch/filterbysearch.comp';
