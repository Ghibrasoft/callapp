import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { SearchBar } from './SearchBar';
import { Header } from 'antd/es/layout/layout';


const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    textAlign: 'center',
    color: '#fff',
    height: 64,
    width: '100%',
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: 'inherit',
    boxShadow: '0 0 15px #d3d3d3',
    background: '#fff',
    zIndex: '100',
};

export function Navbar() {
    const navigate = useNavigate();

    return (
        <Header style={headerStyle}>

            {/* logo */}
            <img
                src="https://callapp.ge/wp-content/uploads/2021/04/Callapp-Logo-Dark.png"
                alt="callapImg"
                style={{ width: '130px', height: '40px', cursor: 'pointer' }}
                onClick={() => navigate("/")}
            />

            {/* navbar */}
            <Menu
                theme='light'
                mode='horizontal'
                defaultSelectedKeys={["/"]}
                onClick={({ key }) => { navigate(key) }}
                items={[
                    {
                        label: "Home",
                        key: "/",
                    },
                    {
                        label: "Chart",
                        key: "/chart",
                    },
                ]}
            >
            </Menu>

            {/* searchbar */}
            <SearchBar />
        </Header>
    )
}
