import React, {useState} from "react";
import {Container, Icon, Input, Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import Search from "../search";

const isLinkActive = (pathname, match, exact = false) => {
    if (exact) {
        return match === pathname;
    }

    return pathname.startsWith(match);
}

const Header = ({location: {pathname}}) => (
    <Menu fixed='top' stackable inverted>
        <Container>
            <Menu.Item as={Link} to='/' header>PAGR</Menu.Item>
            {(pathname === '/' || pathname === '/login' || pathname === '/register') && (
                LoggedOutMenuItems(pathname)
            )}
            {(pathname !== '/' && pathname !== '/login' && pathname !== '/register') && (
                LoggedInMenuItems(pathname)
            )}
        </Container>
    </Menu>
);

const LoggedInMenuItems = (pathname) => [
    <Menu.Item key={1} as={Link} to='/tasks' active={isLinkActive(pathname, '/tasks') || isLinkActive(pathname, '/', true)}>Tasks</Menu.Item>,
    <Menu.Item key={2} as={Link} to='/calendar' active={isLinkActive(pathname, '/calendar')}>Calendar</Menu.Item>,
    <Menu.Item key={3} as={Link} to='/department' active={isLinkActive(pathname, '/department')}>Department Tasks</Menu.Item>,
    <Menu.Menu key={4} position='right'>
        <SearchMenuItem />
        <Menu.Item>
            <Icon name='user circle outline' />
            <span>Joe Bloggs</span>
        </Menu.Item>
        <Menu.Item as={Link} to='/login'>Logout</Menu.Item>
    </Menu.Menu>
];

const SearchMenuItem = () => {
    const [search, setSearch] = useState('');
    const [searchOpen, setSearchOpen] = useState(false)

    const onSearchKeyPress = e => {
        if (e.key !== 'Enter') return;
        setSearchOpen(true);
    }

    return (
        <Menu.Item>
            <Input
                icon={search.length >= 3 && <Icon name='search' circular link onClick={() => setSearchOpen(true)} />}
                placeholder='Search...'
                value={search}
                onChange={(e, {value}) => setSearch(value)}
                onKeyPress={onSearchKeyPress}
            />
            {searchOpen && (
                <Search
                    search={search}
                    onSearchUpdated={setSearch}
                    onClose={() => setSearchOpen(false)}
                />
            )}
        </Menu.Item>
    );
}

const LoggedOutMenuItems = (pathname) => [
    <Menu.Item key={1} as={Link} to='/login' active={isLinkActive(pathname, '/login')}>Login</Menu.Item>,
    <Menu.Item key={2} as={Link} to='/register' active={isLinkActive(pathname, '/register')}>Register</Menu.Item>
];

export default withRouter(Header);
