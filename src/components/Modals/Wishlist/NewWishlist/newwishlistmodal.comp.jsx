import React, { useState } from 'react';
import { useModalManager, useTheme } from '../../../../context';
import { useWishlist } from '../../../../hooks';

// components
import { Modal } from '../../../';

export const NewWishlistModal = () => {
    const { theme } = useTheme();
    const { createWishlist } = useWishlist();
    const [new_wishlist_name, setNewWishlist] = useState('');
    const [disabled, setDisabled] = useState(false);
    const { modal } = useModalManager();

    const addNewWishlist = (event) => {
        event.preventDefault();
        setDisabled(true);
        createWishlist(new_wishlist_name);
    };

    return (
        <Modal>
            <div className='wishlist_modal' style={{ color: theme?.color }}>
                <h1 className='heading'>Create new wishlist</h1>
                <form onSubmit={addNewWishlist}>
                    <input
                        autoFocus
                        type='text'
                        value={new_wishlist_name}
                        autoComplete='off'
                        id='wishlist_modal_input'
                        name='wishlist_modal_input'
                        placeholder='Type wishlist name'
                        onChange={(event) => setNewWishlist((prevState) => event?.target?.value)}
                        style={{
                            backgroundColor: theme?.light_background,
                            color: theme?.color,
                            width: '100%',
                            padding: '0 1rem',
                        }}
                    />
                    <button
                        disabled={disabled}
                        type='submit'
                        style={{
                            width: '100%',
                            fontWeight: '600',
                            fontSize: '1rem',
                            backgroundColor: theme?.constants?.primary,
                            color: theme?.constants?.dark,
                        }}
                    >
                        {modal?.props?.action === 'create_and_save'
                            ? 'Create wishlist & save'
                            : 'Create wishlist'}
                    </button>
                </form>
            </div>
        </Modal>
    );
};
