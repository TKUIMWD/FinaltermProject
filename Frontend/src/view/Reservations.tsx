import { useEffect, useState } from "react";
import { Container, ListGroup, Row, Col, Button, Modal, Toast } from "react-bootstrap";
import NavBar from "../component/NavBar";
import { user_api } from "../enum/api";
import { asyncDelete, asyncGet } from "../utils/fetch";
import { Reservation } from "../interface/Reservation";
import '../style/Reservations.css';
import { reservation_status } from "../type/ReservationStatus";
import ReservationFilter from "../component/ReservationFilter";

export default function Reservations() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedReservationId, setSelectedReservationId] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<reservation_status | ''>('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }

        fetchData(token);
    }, []);

    const fetchData = async (token: string) => {
        const response = await asyncGet(user_api.getAllReservations, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.code === 200) {
            setReservations(response.body);
        }
    };

    const sortedReservations = reservations
        .filter(reservation => selectedStatus === '' || reservation.status === selectedStatus)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    const handleCancel = (id: string) => {
        setSelectedReservationId(id);
        setShowModal(true);
    };

    const confirmCancel = async () => {
        if (selectedReservationId) {
            // console.log(`Cancel reservation with id: ${selectedReservationId}`);
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }
            const response = await asyncDelete(`${user_api.cancelReservationByID}?_id=${selectedReservationId}`, {

            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.code === 200) {
                setToastMessage('預約已取消');
                fetchData(token);
            } else {
                setToastMessage('取消預約失敗');
            }
            setShowToast(true);
            setShowModal(false);
            setSelectedReservationId(null);
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
                                <Col md={4}>
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
                                <Col md={3} className="text-right">
                                    <Button
                                        variant="danger"
                                        className="cancel-button"
                                        onClick={() => handleCancel(reservation._id)}
                                        disabled={reservation.status !== "未成立"}
                                    >
                                        取消
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>

            <Modal show={showModal} onHide={() => setShowModal(false)} className="custom-modal">
                <Modal.Body>確定要取消和刷碗夥伴的預約嗎？</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        關閉
                    </Button>
                    <Button variant="danger" onClick={confirmCancel}>
                        取消預約
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