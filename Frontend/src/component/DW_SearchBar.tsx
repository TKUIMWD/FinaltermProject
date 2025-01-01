import { Row, Col, Form } from 'react-bootstrap';
import DW_SearchBarProps from '../interface/DW_SearchBarProps';

const areas = ["北部", "中部", "南部", "東部"];

function DW_SearchBar({ filters, handleInputChange, handleAreaChange }: DW_SearchBarProps) {
    return (
        <Form className="mb-4">
            <Row>
                <Col md={6}>
                    <Form.Group controlId="formNickname">
                        <Form.Label>暱稱</Form.Label>
                        <Form.Control
                            type="text"
                            name="nickname"
                            value={filters.nickname}
                            onChange={handleInputChange}
                            placeholder="輸入暱稱"
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="formSeniority">
                        <Form.Label>經驗年數</Form.Label>
                        <Form.Control
                            as="select"
                            name="seniority"
                            value={filters.seniority}
                            onChange={handleInputChange}
                        >
                            <option value="">年數</option>
                            <option value="1">1 年以上</option>
                            <option value="2">2 年以上</option>
                            <option value="3">3 年以上</option>
                            <option value="4">4 年以上</option>
                            <option value="5">5 年以上</option>
                            <option value="10">10 年以上</option>
                            <option value="15">15 年以上</option>
                            <option value="20">20 年以上</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group controlId="formArea">
                        <Form.Label>服務地區</Form.Label>
                        <div className="form-check-inline">
                            {areas.map(area => (
                                <Form.Check
                                    key={area}
                                    type="checkbox"
                                    label={area}
                                    value={area}
                                    checked={filters.area.includes(area)}
                                    onChange={handleAreaChange}
                                    className="form-check-inline"
                                    id={`area-${area}`}
                                />
                            ))}
                        </div>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
}

export default DW_SearchBar;