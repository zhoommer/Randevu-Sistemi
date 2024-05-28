import React, { useEffect, useState } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import axiosClient from "../services/axiosInstance";

interface ServicesType {
  id: number;
  title: string;
  imageUrl: string;
  price: string;
  animation?: string;
}

const OurServices = () => {
  const [data, setData] = useState<ServicesType[]>([]);
  useEffect(() => {
    const fetchServicesData = async () => {
      const client = axiosClient();
      const response = await client.get<ServicesType[]>("api/ucretler");
      setData(response.data);
    };
    fetchServicesData();
  }, []);
  return (
    <>
      <Container className="services-container" fluid id="services">
        <Container className="mt-3 text-center">
          <h3 className="text-dark">Hizmetlerimiz</h3>
          <Row>
            {data.map((item, index) => (
              <Col xs={12} md={6} lg={6} className="mt-2" key={index}>
                <Card
                  className="bg-transparent services-card"
                  style={{ maxHeight: "30em" }}
                  data-aos={item.animation}
                  data-aos-offset="300"
                  data-aos-easing="ease-in-sine"
                >
                  <Card.Img
                    src={item.imageUrl}
                    variant="top"
                    style={{ height: "23em", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title className="text-center">
                      <div className="card-info">
                        <h3>{item.title}</h3>
                        <p>{item.price} ₺</p>
                      </div>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default OurServices;
