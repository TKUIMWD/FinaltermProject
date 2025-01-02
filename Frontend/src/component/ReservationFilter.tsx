import { ButtonGroup, Button } from 'react-bootstrap';
import { reservation_status } from '../type/ReservationStatus';
import '../style/ReservationFilter.css'; // Import the custom CSS

interface ReservationFilterProps {
    selectedStatus: reservation_status | '';
    onStatusChange: (status: reservation_status | '') => void;
}

export default function ReservationFilter({ selectedStatus, onStatusChange }: ReservationFilterProps) {
    return (
        <ButtonGroup className="reservation-filter">
            <Button
                variant={selectedStatus === '' ? 'primary' : 'outline-primary'}
                onClick={() => onStatusChange('')}
            >
                所有狀態
            </Button>
            <Button
                variant={selectedStatus === '已成立' ? 'primary' : 'outline-primary'}
                onClick={() => onStatusChange('已成立')}
            >
                已成立
            </Button>
            <Button
                variant={selectedStatus === '未成立' ? 'primary' : 'outline-primary'}
                onClick={() => onStatusChange('未成立')}
            >
                未成立
            </Button>
            <Button
                variant={selectedStatus === '取消' ? 'primary' : 'outline-primary'}
                onClick={() => onStatusChange('取消')}
            >
                取消
            </Button>
            <Button
                variant={selectedStatus === '撤銷' ? 'primary' : 'outline-primary'}
                onClick={() => onStatusChange('撤銷')}
            >
                撤銷
            </Button>
        </ButtonGroup>
    );
}