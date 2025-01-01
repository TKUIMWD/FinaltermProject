import { useState, useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Container, Modal, Fade, Toast, Button } from 'react-bootstrap';
import { BaseImgPath } from '../data/BaseImgPath';
import Footer from '../component/Footer';
import { useNavigate } from 'react-router-dom';
import '../style/Landing.css';
import LoginModal from '../component/LoginModal';
import RegisterModal from '../component/RegisterModal';
import { getAuthStatus } from '../utils/token';
import logout from '../utils/logout';
import { UserContext } from '../context/UserContext';

function LandingNavBar() {
    const DWRP_logo = BaseImgPath + 'DWRP.jpg';
    const iconSize = 65;

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("UserContext is undefined");
    }
    const { user, setUser } = userContext;

    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);

    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => {
        setShowLogin(false);
        setShowRegister(true);
    };

    const handleShowLoginFromRegister = () => {
        setShowRegister(false);
        setShowLogin(true);
    };

    const handleLogout = async () => {
        await logout({ setToastMessage, setShowToast });
        setUser(null);
    };

    const authStatus = getAuthStatus();

    return (
        <>
            <Navbar className="landing-navbar" expand="lg">
                <Container>
                    <Navbar.Brand>
                        <img
                            alt=""
                            src={DWRP_logo}
                            width={iconSize * 3.5}
                            height={iconSize}
                        />{' '}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {authStatus === 'notLogon' ? (
                                <>
                                    <Nav.Link onClick={handleShowLogin}>登入</Nav.Link>
                                    <div className="vr mx-2"></div>
                                    <Nav.Link onClick={handleShowRegister}>註冊</Nav.Link>
                                </>
                            ) : (
                                <>
                                    {user && <Nav.Link>Hi, {user.username}</Nav.Link>}
                                    {user && <div className="vr mx-2"></div>}
                                    <Nav.Link onClick={handleLogout}>登出</Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal show={showLogin} onHide={handleCloseLogin} centered>
                <Fade in={showLogin}>
                    <div>
                        <Modal.Body>
                            <LoginModal handleShowRegister={handleShowRegister} />
                        </Modal.Body>
                    </div>
                </Fade>
            </Modal>

            <Modal show={showRegister} onHide={handleCloseRegister} centered>
                <Fade in={showRegister}>
                    <div>
                        <Modal.Body>
                            <RegisterModal handleShowLogin={handleShowLoginFromRegister} />
                        </Modal.Body>
                    </div>
                </Fade>
            </Modal>

            <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={3000}
                autohide
                className="position-fixed top-0 start-50 translate-middle-x mt-3"
            >
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
        </>
    );
}

export default function Landing() {
    const bgImg = BaseImgPath + 'dish_bg.jpg';
    const navigate = useNavigate();

    const handleReserveClick = () => {
        navigate('/DWRP');
    };

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
                    <Button className="reserve-button" onClick={handleReserveClick}><strong>開始預約🐮🍺刷碗工</strong></Button>
                </div>
            </div>
            <Footer />
        </div>
    );
}