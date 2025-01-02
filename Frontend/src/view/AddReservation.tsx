import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Form, Button, Toast, Modal } from 'react-bootstrap';
import NavBar from '../component/NavBar';
import { asyncPost, asyncGet } from '../utils/fetch';
import { user_api, common_api } from '../enum/api';
import moment from 'moment-timezone';
import '../style/AddReservation.css'; 
import '../style/ReservationModal.css';

export default function AddReservation() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const dishWasherId = params.get('_id') || '';
  const [reservationDate, setReservationDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [address, setAddress] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [price, setPrice] = useState(0);
  const [dishWasherUser, setDishWasherUser] = useState<any>(null);

  useEffect(() => {
    const fetchDishWasherUser = async () => {
      const response = await asyncGet(`${common_api.getDishWasherByID}?_id=${dishWasherId}`);
      if (response.code === 200) {
        setDishWasherUser(response.body);
      }
    };

    fetchDishWasherUser();
  }, [dishWasherId]);

  const handleReserve = async () => {
    if (!reservationDate || !startTime || !endTime || !address) {
      setToastMessage('請填寫所有預約信息');
      setShowToast(true);
      return;
    }

    const startDateTime = `${reservationDate} ${startTime}`;
    const endDateTime = `${reservationDate} ${endTime}`;

    if (moment(startDateTime).isSameOrAfter(moment(endDateTime))) {
      setToastMessage('開始時間不能晚於結束時間');
      setShowToast(true);
      return;
    }

    const checkReservationData = {
      _id: dishWasherId,
      date: reservationDate
    };

    const checkResponse = await asyncPost(common_api.checkReservation, checkReservationData);
    if (checkResponse.body.hasReservation) {
      setToastMessage('該洗碗工當天已有其他預約');
      setShowToast(true);
      return;
    }

    const duration = moment.duration(moment(endDateTime).diff(moment(startDateTime)));
    const hours = duration.asHours();
    const calculatedPrice = Math.floor(dishWasherUser.hourly_rate * hours);
    setPrice(calculatedPrice);

    setShowModal(true);
  };

  const confirmReservation = async () => {
    const startDateTime = `${reservationDate} ${startTime}`;
    const endDateTime = `${reservationDate} ${endTime}`;

    const reservationData = {
      dish_washer_id: dishWasherId,
      start_time: startDateTime,
      end_time: endDateTime,
      address: address
    };

    const token = localStorage.getItem('token');
    const response = await asyncPost(user_api.addReservation, reservationData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.code === 200) {
      setToastMessage('預約成功');
    } else {
      setToastMessage('預約失敗');
    }
    setShowToast(true);
    setShowModal(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <>
      <NavBar />
      <Container className="mt-4 add-reservation-container">
        <h1 className="text-center">預約刷碗工</h1>
        {dishWasherUser && (
          <p className="text-center">{dishWasherUser.nickname} - {dishWasherUser.title}</p>
        )}
        <Form>
          <Form.Group controlId="reservationDate">
            <Form.Label>選擇日期</Form.Label>
            <Form.Control type="date" value={reservationDate} onChange={(e) => setReservationDate(e.target.value)} className="custom-date-picker" />
          </Form.Group>
          <Form.Group controlId="startTime" className="mt-3">
            <Form.Label>開始時間</Form.Label>
            <Form.Control type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="custom-time-picker" />
          </Form.Group>
          <Form.Group controlId="endTime" className="mt-3">
            <Form.Label>結束時間</Form.Label>
            <Form.Control type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="custom-time-picker" />
          </Form.Group>
          <Form.Group controlId="address" className="mt-3">
            <Form.Label>地址</Form.Label>
            <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} onKeyPress={handleKeyPress} />
          </Form.Group>
          <Button variant="primary" className="mt-4 w-100" onClick={handleReserve}>
            確認預約
          </Button>
        </Form>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} className="reservation-modal">
        <Modal.Body>
          {dishWasherUser && (
            <p>{dishWasherUser.nickname} - {dishWasherUser.title}</p>
          )}
          <p>預約費用: {price} 元</p>
          <p>是否確認預約？</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            取消
          </Button>
          <Button variant="primary" onClick={confirmReservation}>
            確認
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