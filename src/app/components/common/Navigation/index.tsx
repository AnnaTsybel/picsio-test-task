

import { NavLink } from 'react-router-dom';

import { RoutesConfig } from '../../../routes';
import logoIcon from '../../../static/images/chat.png';

import './index.scss';

class NavigationLink {
    constructor(
        public path: string,
        public text: string,
        public icon: () => JSX.Element,
        public isExpanding: boolean = false,
        public expand: () => void = () => { },
    ) { }
};

export const Navigation = () => {
    const navigationLinks = [
        new NavigationLink(RoutesConfig.HomePage.path, 'Home', () => <></>),
        new NavigationLink(RoutesConfig.PostsPage.path, 'Post', () => <></>),
    ];

    return (
        <aside className="aside">
            <div className="aside__heading">
                <a className="aside__logo" href="/">
                    <img
                        src={logoIcon}
                        alt="logo"
                        className="aside__logo__image"
                    />
                    <p className="aside__logo__text">Comments</p>
                </a>
                <div className="aside__navigation">
                    {navigationLinks.map((navigationLink: NavigationLink) =>
                        <NavLink
                            className="aside__navigation__item"
                            to={navigationLink.path}
                            key={navigationLink.path}
                        >
                            <navigationLink.icon />
                            <p className="aside__navigation__item__text">{navigationLink.text}</p>
                        </NavLink>,
                    )}
                </div>
            </div>
        </aside>
    );
};
