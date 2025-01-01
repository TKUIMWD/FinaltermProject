import { useState } from 'react';
import { Form, Button, Container, Row, Col, Toast } from 'react-bootstrap';
import { BaseImgPath } from '../data/BaseImgPath';
import '../style/RegisterModal.css';
import { Person, Lock, Envelope, Telephone, LockFill } from 'react-bootstrap-icons';
import { asyncPost } from '../utils/fetch';
import { auth_api } from '../enum/api';

interface RegisterModalProps {
    handleShowLogin: () => void;
}

export default function RegisterModal({ handleShowLogin }: RegisterModalProps) {
    const DWRP_logo = BaseImgPath + 'DWRP.jpg';
    const iconSize = 65;

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setToastMessage('Passwords do not match');
            setShowToast(true);
            return;
        }

        const response = await asyncPost(auth_api.register, {
            username,
            password,
            phone_num: phone,
            email,
        });

        if (response.code === 200) {
            setToastMessage('Register succeed');
            setTimeout(() => {
                handleShowLogin();
            }, 3000);
        } else {
            setToastMessage(response.message);
        }
        setShowToast(true);
    };

    return (
        <Container className="register-modal-container">
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
            <Form onSubmit={handleRegister}>
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

                <Form.Group controlId="formBasicEmail" className="mt-3 position-relative">
                    <Form.Label>電子郵件</Form.Label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><Envelope /></span>
                        </div>
                        <Form.Control
                            type="email"
                            placeholder="輸入電子郵件"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </Form.Group>

                <Form.Group controlId="formBasicPhone" className="mt-3 position-relative">
                    <Form.Label>電話號碼</Form.Label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><Telephone /></span>
                        </div>
                        <Form.Control
                            type="tel"
                            placeholder="輸入電話號碼"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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

                <Form.Group controlId="formBasicConfirmPassword" className="mt-3 position-relative">
                    <Form.Label>確認密碼</Form.Label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><LockFill /></span>
                        </div>
                        <Form.Control
                            type="password"
                            placeholder="再次輸入密碼"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3 w-100 register-button">
                    註冊
                </Button>

                <Button variant="link" className="mt-3 w-100" onClick={handleShowLogin}>
                    已經有帳號？
                </Button>
            </Form>

            <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={3000}
                autohide
                className="position-fixed top-0 start-50 translate-middle-x mt-3"
            >
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
        </Container>
    );
}