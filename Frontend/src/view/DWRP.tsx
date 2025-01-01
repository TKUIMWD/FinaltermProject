import React, { useRef, useEffect, useContext, useState } from 'react';
import NavBar from '../component/NavBar';
import DW_SearchBar from '../component/DW_SearchBar';
import '../style/NavBar.css';
import '../style/DWRP.css';
import '../style/DW_SearchBar.css';
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

  const [filters, setFilters] = useState({
    nickname: '',
    seniority: '',
    hourly_rate: '',
    area: [] as string[]
  });

  useEffect(() => {
    if (!cache.current) {
      cache.current = true;
      asyncGet(common_api.getAllDishWashers).then((res: resp<Array<DishWasher>>) => {
        if (res.code === 200) {
          setDishWashers(res.body);
        }
      });
    }
  }, [setDishWashers]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFilters(prevFilters => {
      const newArea = checked
        ? [...prevFilters.area, value]
        : prevFilters.area.filter(area => area !== value);
      return {
        ...prevFilters,
        area: newArea
      };
    });
  };

  const filteredDishWashers = dishWashers.filter(dishWasher => {
    return (
      (filters.nickname === '' || dishWasher.nickname.includes(filters.nickname.toUpperCase())) &&
      (filters.seniority === '' || dishWasher.seniority >= parseInt(filters.seniority)) &&
      (filters.hourly_rate === '' || dishWasher.hourly_rate.toString() === filters.hourly_rate) &&
      (filters.area.length === 0 || filters.area.some(area => (dishWasher.areas ?? []).includes(area)))
    );
  });

  const DishWasherCard = ({ dishWasher }: { dishWasher: DishWasher }) => (
    <Col md={3} className="mb-4">
      <Card className="dishwasher-card">
        <Card.Img variant="top" src={dishWasher.img_name ? dishWasherImgPath + dishWasher.img_name : dishWasherImgPath + 'dish_washer_default.jpg'} className="dishwasher-img" />
        <Card.Body>
          <Card.Title className="dishwasher-title">{dishWasher.nickname}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted dishwasher-subtitle">{dishWasher.title}</Card.Subtitle>
          <Card.Text className="dishwasher-text">
            <strong>ID:</strong> {dishWasher.id}
            <br />
            {dishWasher.intro}
            <br />
            <strong>經驗:</strong> {dishWasher.seniority} 年
            <br />
            <strong>時薪:</strong> {dishWasher.hourly_rate} 元
            <br />
            <strong>服務地區:</strong> {dishWasher.areas?.join(', ')}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );

  return (
    <>
      <NavBar />
      <Container className="mt-4">
        <DW_SearchBar filters={filters} handleInputChange={handleInputChange} handleAreaChange={handleAreaChange} />
        <Row>
          {filteredDishWashers.map((dishWasher) => (
            <DishWasherCard key={dishWasher.id} dishWasher={dishWasher} />
          ))}
        </Row>
      </Container>
    </>
  );
}