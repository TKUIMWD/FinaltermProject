import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Container } from 'react-bootstrap';
import { BaseImgPath } from '../data/BaseImgPath';
import '../style/NavBar.css';

export default function NavBar() {
  const DWRP_logo = BaseImgPath + 'DWRP.jpg';
  const iconSize = 65;

  return (
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
            <Nav.Link as={Link} to="/DWRP">刷碗工資訊</Nav.Link>
            <Nav.Link as={Link} to="/reserve">預約刷碗工</Nav.Link>
            <Nav.Link as={Link} to="/customer-service">客戶服務</Nav.Link>
            <Nav.Link as={Link} to="/login">登入 / 註冊</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}