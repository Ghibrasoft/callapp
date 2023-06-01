import { Button } from 'antd';
import { Header } from 'antd/es/layout/layout'
import { Link } from 'react-router-dom'
import React from 'react'


const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-around',
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
    zIndex: '100'
};

export function Navbar() {
    return (
        <Header
            style={headerStyle}
        >
            <img
                src="https://callapp.ge/wp-content/uploads/2021/04/Callapp-Logo-Dark.png"
                alt="callapImg"
                style={{ width: '130px', height: '40px', cursor: 'pointer' }}
            />
            <nav>
                <Link to="/">
                    <Button type='text' className='ant-btn-lg'>Home</Button>
                </Link>
                <Link to="/chart">
                    <Button type="text" className="ant-btn-lg">Chart</Button>
                </Link>
            </nav>
        </Header>
    )
}
