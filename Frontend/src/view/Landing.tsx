import { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Container, Modal, Button } from 'react-bootstrap';
import { BaseImgPath } from '../data/BaseImgPath';
import Footer from '../component/Footer';
import '../style/Landing.css';

function LandingNavBar() {
    const logo = BaseImgPath + 'icon.png';
    const iconSize = 80;

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);

    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);

    return (
        <>
            <Navbar className="landing-navbar" expand="lg">
                <Container>
                    <Navbar.Brand>
                        <span style={{ color: '#4a628a', fontWeight: 'bold', fontSize: '2.5rem' }}>DW</span>
                        <span style={{ color: '#000000', fontWeight: 'bold', fontSize: '2.5rem' }}>RP</span>
                        <img
                            alt=""
                            src={logo}
                            width={iconSize}
                            height={iconSize}
                        />{' '}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link onClick={handleShowLogin}>Login</Nav.Link>
                            <div className="vr mx-2"></div>
                            <Nav.Link onClick={handleShowRegister}>Register</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal show={showLogin} onHide={handleCloseLogin} centered>
                <Modal.Body>
                </Modal.Body>
            </Modal>

            <Modal show={showRegister} onHide={handleCloseRegister} centered>
                <Modal.Body>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default function Landing() {
    const bgImg = BaseImgPath + 'dish_bg.jpg';

    return (
        <div className="landing-page">
            <LandingNavBar />
            <div className="background-container">
                <img src={bgImg} alt="Background" className="background-image" />
                <div className="overlay-text-left">
                    <h1>Dish Washer</h1>
                    <h2>Reserve Platform</h2>
                    <h3>刷碗工預約平台</h3>
                </div>
                <div className="overlay-text-right">
                    <h3>冬天太冷不想刷碗嗎？</h3>
                    <h3>員工罷工沒人幫你刷碗嗎？</h3>
                </div>
                <div className="button-container">
                    <Button className="reserve-button"><strong>開始預約🐮🍺刷碗工</strong></Button>
                </div>
            </div>
            <Footer />
        </div>
    );
}