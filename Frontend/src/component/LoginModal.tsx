import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { BaseImgPath } from '../data/BaseImgPath';
import '../style/LoginModal.css';
import { Person, Lock } from 'react-bootstrap-icons';

interface LoginModalProps {
    handleShowRegister: () => void;
}

export default function LoginModal({ handleShowRegister }: LoginModalProps) {
    const DWRP_logo = BaseImgPath + 'DWRP.jpg';
    const iconSize = 65;

    return (
        <Container className="login-modal-container modal-container">
            <Row className="justify-content-center">
                <Col xs="auto">
                    <img
                        alt=""
                        src={DWRP_logo}
                        width={iconSize * 3.5}
                        height={iconSize}
                        className="mb-3"
                    />
                </Col>
            </Row>
            <Form>
                <Form.Group controlId="formBasicUsername" className="position-relative">
                    <Form.Label>使用者名稱</Form.Label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><Person /></span>
                        </div>
                        <Form.Control type="text" placeholder="輸入使用者名稱" />
                    </div>
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mt-3 position-relative">
                    <Form.Label>密碼</Form.Label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><Lock /></span>
                        </div>
                        <Form.Control type="password" placeholder="輸入密碼" />
                    </div>
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3 w-100 login-button">
                    登入
                </Button>

                <Button variant="link" className="mt-3 w-100" onClick={handleShowRegister}>
                    沒有帳號？
                </Button>
            </Form>
        </Container>
    );
}