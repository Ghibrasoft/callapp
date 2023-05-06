import { Button } from 'antd';
import { Header } from 'antd/es/layout/layout'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'sticky',
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
    const navigate = useNavigate();
    const [isHome, setIsHome] = useState(false);
    return (
        <Header style={headerStyle}>
            <img
                src="https://callapp.ge/wp-content/uploads/2021/04/Callapp-Logo-Dark.png"
                alt="callapImg"
                style={{ width: '130px', height: '40px', cursor: 'pointer' }}
                onClick={() => navigate('/')}
            />

            {/* <Title style={{fontWeight: 'bold', fontSize: '3rem' }}>
    <span style={{
      backgroundColor: '#6366f1', 
      color: 'white',
      borderRadius: '10px', 
      padding: '3px 10px',
      }}>Call</span>app
  </Title> */}
            {
                !isHome ?
                    <Button type="default" className="ant-btn-lg" onClick={() => {navigate('/chart'); setIsHome(!isHome)}}>Chart</Button>
                    :
                    <Button type='default' onClick={() => {navigate('/'); setIsHome(!isHome)}}>Home</Button>
            }
        </Header>
    )
}
