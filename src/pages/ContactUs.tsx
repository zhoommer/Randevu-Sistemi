import { Row, Col, Container, Card } from "react-bootstrap";
import Image from "../assets/images/pexels2.jpg";
import { BiMobileAlt } from "react-icons/bi";

const ContactUs = () => {
  return (
    <>
      <Container fluid className="contact-container" id="contact">
        <Container className="p-3 text-center">
          <h3 className="text-dark">Bize Ulasin</h3>
          <Row>
            <Col>
              <Card data-aos="zoom-in-right">
                <Card.Img src={Image} variant="top" className="contact-image" />
                <Card.Body>
                  <Card.Title>Iletisim</Card.Title>
                  <Card.Text>
                    <a href="tel:+905348106749" className="contactLink">
                      <span>
                        <BiMobileAlt />
                      </span>
                      <span className="ms-2">534 810 67 49</span>
                    </a>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default ContactUs;
