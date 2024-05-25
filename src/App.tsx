import Navi from "./components/Navi/Navi";
import { Col, Row } from "react-bootstrap";
import Home from "./pages/Home";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import OurServices from "./pages/OurServices";
import AppointmentForm from "./components/AppointmentForm";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  const { pathname } = location;
  return (
    <>
      <Row>
        <Col xs={12}>
          <Navi />
        </Col>
        <Col xs={12} className="main-div">
          {pathname === "/randevu-al" ? (
            <AppointmentForm />
          ) : (
            <div>
              <Home />
              <About />
              <OurServices />
              <ContactUs />
            </div>
          )}
        </Col>
        <Col xs={12} className="p-3">
          <p className="text-muted fw-bold text-center">
            © Created by Akif Fazil Guven
          </p>
        </Col>
      </Row>
    </>
  );
}

export default App;
