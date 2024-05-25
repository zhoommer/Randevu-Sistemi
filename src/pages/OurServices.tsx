import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";

interface ServicesType {
  title: string;
  imageUrl: string;
  price: string;
  animation?: string;
}

const OurServices = () => {
  const services: ServicesType[] = [
    {
      title: "Sac Kesimi",
      imageUrl:
        "https://whairconcept.com.tr/uploads/2021/09/erkek-sac-kesimi.webp",
      price: "200₺",
      animation: "fade-right",
    },
    {
      title: "Sac Bakimi",
      imageUrl:
        "https://whairconcept.com.tr/uploads/2022/02/erkek-kuaforu-sac-bakimi-1.webp",
      price: "200₺",
      animation: "fade-right",
    },
    {
      title: "Sac Boyama",
      imageUrl:
        "https://whairconcept.com.tr/uploads/2021/09/erkek-saci-boyamak.webp",
      price: "800₺ - 1200₺",
      animation: "fade-left",
    },
    {
      title: "Sac Sekillendirme",
      imageUrl:
        "https://whairconcept.com.tr/uploads/2021/09/erkek-fon-modelleri-1.jpg",
      price: "100₺",
      animation: "fade-left",
    },
    {
      title: "Sakal Biyik Kesim ve Duzeltme",
      imageUrl:
        "https://i20.haber7.net/resize/1300x788//haber/haber7/photos/2020/16/evde_sac_sakal_tirasi_nasil_yapilir_berbere_gitmeden_evde_kolay_sac_kesimi_1587201851_3442.jpg",
      price: "100₺",
      animation: "fade-right",
    },
    {
      title: "Yuz Bakimi",
      imageUrl:
        "https://whairconcept.com.tr/uploads/2022/02/erkekler-icin-cilt-bakim-onerisi.webp",
      price: "100₺",
      animation: "fade-right",
    },
  ];
  return (
    <>
      <Container className="services-container" fluid id="services">
        <Container className="mt-3 text-center">
          <h3 className="text-dark">Hizmetlerimiz</h3>
          <Row>
            {services.map((item, index) => (
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
                        <p>{item.price}</p>
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
