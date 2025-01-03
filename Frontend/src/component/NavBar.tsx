import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Container, Modal, Fade, Toast, NavDropdown } from 'react-bootstrap';
import { BaseImgPath } from '../data/BaseImgPath';
import '../style/NavBar.css';
import { getAuthStatus } from '../utils/token';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import logout from '../utils/logout';
import { UserContext } from '../context/UserContext';

export default function NavBar() {
  const DWRP_logo = BaseImgPath + 'DWRP.jpg';
  const iconSize = 65;
  const authStatus = getAuthStatus();

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

  return (
    <>
      <Navbar className="nav-bar" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              alt=""
              src={DWRP_logo}
              width={iconSize * 3.5}
              height={iconSize}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/DWRP">預約刷碗工</Nav.Link>
              {authStatus === 'user' && (
                <>
                  <Nav.Link as={Link} to="/reservations">檢視預約</Nav.Link>
                  <Nav.Link as={Link} to="/customer-service">客戶服務</Nav.Link>
                </>
              )}
              {authStatus === 'notLogon' ? (
                <Nav.Link onClick={handleShowLogin}>登入 / 註冊</Nav.Link>
              ) : (
                authStatus === 'user' ? (
                  <NavDropdown title={`Hi, ${user?.username || 'User'}`} id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/updateUser" className="custom-dropdown-item">修改資料</NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout} className="custom-dropdown-item">登出</NavDropdown.Item>
                    </NavDropdown>
                ) : (
                  <Nav.Link onClick={handleLogout}>登出</Nav.Link>
                )
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