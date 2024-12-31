import { useRef, useEffect, useContext } from 'react';
import NavBar from '../component/NavBar';
import '../style/NavBar.css';
import '../style/DWRP.css';
import { resp } from '../interface/resp';
import { asyncGet } from '../utils/fetch';
import { DishWashersContext } from '../context/DishWashersContext';
import { common_api } from '../enum/api';
import { DishWasher } from '../interface/DishWasher';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { BaseImgPath } from '../data/BaseImgPath';

export default function DWRP() {
  const { dishWashers, setDishWashers } = useContext(DishWashersContext);
  const cache = useRef<boolean>(false);
  const dishWasherImgPath = BaseImgPath + 'DWs/';
  

  useEffect(() => {
    if (!cache.current) {
      cache.current = true;
      asyncGet(common_api.getAllDishWashers).then((res: resp<Array<DishWasher>>) => {
        if (res.code === 200) {
          setDishWashers(res.body);
        }
      });
    }
  }, []);

  const DishWasherCard = ({ dishWasher }: { dishWasher: DishWasher }) => (
    <Col md={3} className="mb-4">
      <Card>
        <Card.Img variant="top" src={dishWasher.img_name ? dishWasherImgPath + dishWasher.img_name : dishWasherImgPath + 'dish_washer_default.jpg'} />
        <Card.Body>
          <Card.Title>{dishWasher.nickname}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{dishWasher.title}</Card.Subtitle>
          <Card.Text>
        {dishWasher.intro}
        <br />
        經驗: {dishWasher.seniority} 年
        <br />
        時薪: {dishWasher.hourly_rate} 元
        <br />
        服務地區: {dishWasher.areas?.join(', ')}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );

  return (
    <>
      <NavBar />
      <Container className="mt-4">
        <Row>
          {dishWashers.map((dishWasher) => (
            <DishWasherCard key={dishWasher.id} dishWasher={dishWasher} />
          ))}
        </Row>
      </Container>
    </>
  );
}