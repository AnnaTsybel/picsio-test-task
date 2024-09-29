import React from 'react';
import searchIcon from '@static/images/searchIcon.png';

import './index.scss';

type SearchProps = {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
};

export const Search: React.FC<SearchProps> = ({ onChange = () => { }, value = '' }) =>
    <div className="search">
        <input
            onChange={onChange}
            value={value}
            placeholder="Search"
            className="search__input"
        />
        <label className="search__label" >
            <img src={searchIcon} alt="search" />
        </label>
    </div>;
