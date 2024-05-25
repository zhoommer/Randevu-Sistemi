import { Row, Col, Card, Container } from "react-bootstrap";
import Image1 from "../assets/images/pexels1.jpg";

const Home = () => {
  return (
    <>
      <Container fluid className="home-container mt-4" id="home">
        <Container className="p-3">
          <h3 className="text-dark text-center ">Anasayfa</h3>
          <Row>
            <Col xs={12} lg={6} md={6}>
              <p>
                Lorem ipsum dolor sit amet, officia excepteur ex fugiat
                reprehenderit enim labore culpa sint ad nisi Lorem pariatur
                mollit ex esse exercitation amet. Nisi anim cupidatat excepteur
                officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip
                amet voluptate voluptate dolor minim nulla est proident. Nostrud
                officia pariatur ut officia. Sit irure elit esse ea nulla sunt
                ex occaecat reprehenderit commodo officia dolor Lorem duis
                laboris cupidatat officia voluptate. Culpa proident adipisicing
                id nulla nisi laboris ex in Lorem sunt duis officia eiusmod.
                Aliqua reprehenderit commodo ex non excepteur duis sunt velit
                enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur
                et est culpa et culpa duis.
              </p>
            </Col>
            <Col xs={12} lg={6} md={6}>
              <Card data-aos="fade-down">
                <Card.Img src={Image1} className="images" />
              </Card>
            </Col>
            <Col xs={12} lg={6} md={6} className="mt-3">
              <Card data-aos="fade-up">
                <Card.Img src={Image1} className="images" />
              </Card>
            </Col>
            <Col xs={12} lg={6} md={6} className="mt-3">
              <p>
                Lorem ipsum dolor sit amet, officia excepteur ex fugiat
                reprehenderit enim labore culpa sint ad nisi Lorem pariatur
                mollit ex esse exercitation amet. Nisi anim cupidatat excepteur
                officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip
                amet voluptate voluptate dolor minim nulla est proident. Nostrud
                officia pariatur ut officia. Sit irure elit esse ea nulla sunt
                ex occaecat reprehenderit commodo officia dolor Lorem duis
                laboris cupidatat officia voluptate. Culpa proident adipisicing
                id nulla nisi laboris ex in Lorem sunt duis officia eiusmod.
                Aliqua reprehenderit commodo ex non excepteur duis sunt velit
                enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur
                et est culpa et culpa duis.
              </p>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Home;
