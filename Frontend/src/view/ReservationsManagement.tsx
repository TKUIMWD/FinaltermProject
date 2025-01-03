import { useEffect, useState } from "react";
import { Container, ListGroup, Row, Col, Button, Modal, Toast } from "react-bootstrap";
import NavBar from "../component/NavBar";
import { admin_api, common_api } from "../enum/api";
import { asyncDelete, asyncGet, asyncPost } from "../utils/fetch";
import '../style/Reservations.css';
import { reservation_status } from "../type/ReservationStatus";
import ReservationFilter from "../component/ReservationFilter";
import ReservationWithDetails from "../interface/ReservationWithDetails";

export default function ReservationsManagement() {
    const [reservations, setReservations] = useState<ReservationWithDetails[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedReservationId, setSelectedReservationId] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<reservation_status | ''>('');
    const [actionType, setActionType] = useState<'成立' | '撤銷' | null>(null);
    const [hasOtherReservations, setHasOtherReservations] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }

        fetchData(token);
    }, []);

    const fetchData = async (token: string) => {
        const response = await asyncGet(admin_api.getAllReservations, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.code === 200) {
            setReservations(response.body);
        }
    };

    const checkOtherReservations = async (dishWasherId: string, reservationDate: string) => {
        const checkReservationData = {
            _id: dishWasherId,
            date: reservationDate
        };

        const checkResponse = await asyncPost(common_api.checkReservation, checkReservationData);

        if (checkResponse.code === 200 && checkResponse.body.hasReservation) {
            setHasOtherReservations(true);
        } else {
            setHasOtherReservations(false);
        }
    };

    const sortedReservations = reservations
        .filter(reservation => selectedStatus === '' || reservation.status === selectedStatus)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    const handleAction = async (id: string, action: '成立' | '撤銷') => {
        setSelectedReservationId(id);
        setActionType(action);
        const reservation = reservations.find(res => res._id === id);
        if (reservation && action === '成立') {
            await checkOtherReservations(reservation.dish_washer_id, reservation.start_time);
        }
        setShowModal(true);
    };

    const confirmEstablish = async () => {
        if (selectedReservationId) {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }
            const apiEndpoint = `${admin_api.establishReservationByID}?_id=${selectedReservationId}`;
            const response = await asyncPost(apiEndpoint, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.code === 200) {
                setToastMessage('預約已成立');
                fetchData(token);
            } else {
                setToastMessage('成立預約失敗');
            }
            setShowToast(true);
            setShowModal(false);
            setSelectedReservationId(null);
            setActionType(null);
            setHasOtherReservations(false);
        }
    };

    const confirmRevoke = async () => {
        if (selectedReservationId) {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }
            const apiEndpoint = `${admin_api.revokeReservationByID}?_id=${selectedReservationId}`;
            const response = await asyncDelete(apiEndpoint, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.code === 200) {
                setToastMessage('預約已撤銷');
                fetchData(token);
            } else {
                setToastMessage('撤銷預約失敗');
            }
            setShowToast(true);
            setShowModal(false);
            setSelectedReservationId(null);
            setActionType(null);
            setHasOtherReservations(false);
        }
    };

    const getStatusClass = (status: reservation_status) => {
        switch (status) {
            case "已成立":
                return "status-established";
            case "未成立":
                return "status-not-established";
            case "取消":
                return "status-cancelled";
            case "撤銷":
                return "status-revoked";
            default:
                return "";
        }
    };

    return (
        <>
            <NavBar />
            <Container className="mt-4 reservations-container">
                <ReservationFilter selectedStatus={selectedStatus} onStatusChange={setSelectedStatus} />
                <ListGroup>
                    {sortedReservations.map((reservation) => (
                        <ListGroup.Item key={reservation._id} className="mb-3 reservation-item">
                            <Row>
                                <Col md={3}>
                                    <Row>
                                        <Col md={12} className="highlight">
                                            <span className="label">建立時間 :</span> {reservation.created_at}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <span className="label">刷碗師 :</span> {reservation.dish_washer_title} - {reservation.dish_washer_nickname}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12} className={`highlight ${getStatusClass(reservation.status)}`}>
                                            <span className="label">預約狀態 :</span> {reservation.status}
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={4}>
                                    <Row>
                                        <Col md={12}>
                                            <span className="label">時間 :</span> {reservation.start_time} - {reservation.end_time}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <span className="label">費用 :</span> {reservation.price} 元
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <span className="label">地址 :</span> {reservation.address}
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={3}>
                                    <Row>
                                        <Col md={12}>
                                            <span className="label">用戶名 :</span> {reservation.username}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <span className="label">用戶郵箱 :</span> {reservation.user_email}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <span className="label">用戶電話 :</span> {reservation.user_phone_num}
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={2} className="text-right">
                                    <Button
                                        variant="success"
                                        className="action-button me-2"
                                        onClick={() => handleAction(reservation._id, '成立')}
                                        disabled={reservation.status === "已成立" || reservation.status === "取消" || reservation.status === "撤銷"}
                                    >
                                        成立
                                    </Button>
                                    <Button
                                        variant="danger"
                                        className="action-button"
                                        onClick={() => handleAction(reservation._id, '撤銷')}
                                        disabled={reservation.status === "撤銷" || reservation.status === "取消"}
                                    >
                                        撤銷
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>

            <Modal show={showModal} onHide={() => setShowModal(false)} className="custom-modal">
                <Modal.Body>
                    確定要{actionType}這個預約嗎？
                    {actionType === '成立' && hasOtherReservations && (
                        <div className="mt-3">
                            <strong>注意：</strong> 該刷碗工當日有其他預約。
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        關閉
                    </Button>
                    <Button variant={actionType === '成立' ? 'success' : 'danger'} onClick={actionType === '成立' ? confirmEstablish : confirmRevoke}>
                        {actionType}
                    </Button>
                </Modal.Footer>
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