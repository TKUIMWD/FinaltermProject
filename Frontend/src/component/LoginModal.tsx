import { useState } from 'react';
import { Form, Button, Container, Row, Col, Toast } from 'react-bootstrap';
import { BaseImgPath } from '../data/BaseImgPath';
import '../style/LoginModal.css';
import { Person, Lock } from 'react-bootstrap-icons';
import { asyncPost } from '../utils/fetch';
import { auth_api } from '../enum/api';

interface LoginModalProps {
    handleShowRegister: () => void;
}

export default function LoginModal({ handleShowRegister }: LoginModalProps) {
    const DWRP_logo = BaseImgPath + 'DWRP.jpg';
    const iconSize = 65;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await asyncPost(auth_api.login, {
            username,
            password,
        });

        if (response.code === 200) {
            localStorage.setItem('token', response.body.token);
            const token = localStorage.getItem('token');
            if (token) {
                setToastMessage('Login succeed');
                setShowToast(true);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                setToastMessage('Failed to save token');
                setShowToast(true);
            }
        } else {
            setToastMessage(response.message);
            setShowToast(true);
        }
    };

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
            <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicUsername" className="position-relative">
                    <Form.Label>使用者名稱</Form.Label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><Person /></span>
                        </div>
                        <Form.Control
                            type="text"
                            placeholder="輸入使用者名稱"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mt-3 position-relative">
                    <Form.Label>密碼</Form.Label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><Lock /></span>
                        </div>
                        <Form.Control
                            type="password"
                            placeholder="輸入密碼"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3 w-100 login-button">
                    登入
                </Button>

                <Button variant="link" className="mt-3 w-100" onClick={handleShowRegister}>
                    沒有帳號？
                </Button>
            </Form>

            <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={1000}
                autohide
                className="position-fixed top-0 start-50 translate-middle-x mt-3"
            >
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
        </Container>
    );
}