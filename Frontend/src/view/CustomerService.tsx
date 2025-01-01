import NavBar from "../component/NavBar";
import { Container, Row, Col } from 'react-bootstrap';
import '../style/CustomerService.css';

export default function CustomerService() {
    return (
        <>
            <NavBar />
            <Container className="customer-service-container mt-5">
                <Row className="justify-content-center">
                    <Col xs="auto" className="text-center">
                        <h1 className="display-4">服務暫不開放</h1>
                        <p className="lead">因今日刷碗工作量大，客服也去刷碗了。</p>
                        <small className="text-muted">顧問也是</small>
                    </Col>
                </Row>
            </Container>
        </>
    );
}