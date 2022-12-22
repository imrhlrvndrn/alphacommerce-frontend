import { useEffect, useState } from 'react';
import { alreadyExists } from '../../../utils';
import { useTheme, useDataLayer } from '../../../context';

// styles
import './checkbox.styles.scss';

export const Checkbox = ({ options }) => {
    const { event_handler, name, type, is_checked } = options;
    const { theme } = useTheme();

    return (
        <div className='input-checkbox'>
            <span
                tabIndex='0'
                aria-label={`${name}`}
                className='dup-checkbox'
                style={{
                    backgroundColor: is_checked ? theme?.constants?.primary : theme?.color,
                }}
                onKeyDown={(event) => event_handler(event, { name, type })}
                onClick={(event) => event_handler(event, { name, type })}
            ></span>
            <label onClick={(event) => event_handler(event, { name, type })}>{name}</label>
        </div>
    );
};
