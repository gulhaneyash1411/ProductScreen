import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const menuItem = [
        { path: "/", name: "Home", icon: <FaTh /> },
        { path: "/Store", name: "Store", icon: <FaUserAlt /> },
        { path: "/Catalogue", name: "Catalogue", icon: <FaCommentAlt /> },
        { path: "/product", name: "Product", icon: <FaShoppingBag /> },
        { path: "/Reports", name: "Reports", icon: <FaThList /> }
    ];

    const containerStyle = {
        display: 'flex',
    };

    const sidebarStyle = {
        background: '#333',
        color: '#fff',
        minHeight: '100vh',
        width: isOpen ? '200px' : '60px',
        transition: 'width 0.3s',
    };

    const topSectionStyle = {
        display: 'flex',
        alignItems: 'center',
        padding: '1rem',
    };

    const logoStyle = {
        fontSize: '1.5rem',
        display: isOpen ? 'block' : 'none',
        marginLeft: '10px',
    };

    const barsStyle = {
        fontSize: '1.5rem',
        cursor: 'pointer',
        marginLeft: isOpen ? '50px' : '0px',
    };

    const linkStyle = {
        display: 'flex',
        alignItems: 'center',
        padding: '1rem',
        color: '#fff',
        textDecoration: 'none',
        transition: 'background 0.3s',
    };

    const iconStyle = {
        fontSize: '1.5rem',
        marginRight: '10px',
    };

    const linkTextStyle = {
        display: isOpen ? 'block' : 'none',
        fontSize: '1rem',
    };

    const contentStyle = {
        flexGrow: 1,
        padding: '1rem',
        background: '#f1f1f1',
    };

    return (
        <div style={containerStyle}>
            <div style={sidebarStyle}>
                <div style={topSectionStyle}>
                    {/* <h1 style={logoStyle}>Logo</h1> */}
                    <div style={barsStyle}>
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {menuItem.map((item, index) => (
                    <NavLink to={item.path} key={index} style={linkStyle} activeClassName="active">
                        <div style={iconStyle}>{item.icon}</div>
                        <div style={linkTextStyle}>{item.name}</div>
                    </NavLink>
                ))}
            </div>
            <main style={contentStyle}>{children}</main>
        </div>
    );
};

export default Sidebar;
