import { Modal } from 'react-bootstrap';
import '../style/InfoModal.css';

interface InfoModalProps {
    show: boolean;
    handleClose: () => void;
}

export default function InfoModal({ show, handleClose }: InfoModalProps) {
    return (
        <Modal show={show} onHide={handleClose} centered className="info-modal">
            <Modal.Header className="info-modal-header">
                <Modal.Title className="info-modal-title">關於 DWRP</Modal.Title>
            </Modal.Header>
            <Modal.Body className="info-modal-body">
                <p>本平台由 TKUIMWD 團隊維護，TKUIMWD 團隊與國內業界龍頭專業刷碗團隊合作推出優質刷碗服務，平台致力於為每一位客戶安排最讓人滿意的專業刷碗工，刷碗預約服務範圍廣泛，包天包地，從監獄到聲色場所我們都提供全天候24小時全年無休到府刷碗服務還有線上即時真人客服和資深刷碗顧問，並提供高度客製化服務，可以選擇不同年資的刷碗師傅，為您的上好美盤獻上獨一無二的清洗服務。</p>
                <p>如需與顧問諮詢洽談，請聯繫線上即時真人客服。</p>
            </Modal.Body>
        </Modal>
    );
}