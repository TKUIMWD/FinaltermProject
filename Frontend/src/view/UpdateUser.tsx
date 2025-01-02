import { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Toast, InputGroup } from 'react-bootstrap';
import { useUser } from '../context/UserContext';
import { asyncPut, asyncGet } from '../utils/fetch';
import { user_api } from '../enum/api';
import NavBar from '../component/NavBar';
import { PersonFill, TelephoneFill, EnvelopeFill } from 'react-bootstrap-icons';
import '../style/UpdateUser.css';

export default function UpdateUser() {
    const { user, setUser } = useUser();
    const [username, setUsername] = useState(user?.username || '');
    const [phone_num, setPhoneNum] = useState(user?.phone_num || '');
    const [email, setEmail] = useState(user?.email || '');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }

        const fetchData = async () => {
            const response = await asyncGet(user_api.getUserData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.code === 200) {
                setUser(response.body);
            }
        };

        fetchData();
    }, []);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!user) {
            setToastMessage('User not found');
            setShowToast(true);
            return;
        }

        const response = await asyncPut(`${user_api.updateUserByID}?_id=${user._id}`, {
            username,
            phone_num,
            email,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.code === 200) {
            const userResponse = await asyncGet(user_api.getUserData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (userResponse.code === 200) {
                setUser(userResponse.body);
            }
            setToastMessage('資料更新成功');
        } else {
            setToastMessage(response.message);
        }
        setShowToast(true);
    };

    return (
        <>
            <NavBar />
            <Container className="update-user-container mt-5">
                <Row className="justify-content-center">
                    <Col xs={12} md={6} lg={4}>
                        <h1 className="text-center mb-4">修改資料</h1>
                        <Form onSubmit={handleUpdate} className="update-user-form">
                            <Form.Group controlId="formUsername">
                                <Form.Label>使用者名稱</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text><PersonFill /></InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        placeholder="輸入使用者名稱"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group controlId="formPhoneNum" className="mt-3">
                                <Form.Label>電話號碼</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text><TelephoneFill /></InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        placeholder="輸入電話號碼"
                                        value={phone_num}
                                        onChange={(e) => setPhoneNum(e.target.value)}
                                    />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group controlId="formEmail" className="mt-3">
                                <Form.Label>電子郵件</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text><EnvelopeFill /></InputGroup.Text>
                                    <Form.Control
                                        type="email"
                                        placeholder="輸入電子郵件"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </InputGroup>
                            </Form.Group>

                            <Button variant="primary" type="submit" className="mt-4 w-100 update-button">
                                更新
                            </Button>
                        </Form>
                    </Col>
                </Row>

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
        </>
    );
}