import { linkArray } from "./Links";
import {
  Nav,
  Navbar,
  Container,
  InputGroup,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import "./_Navi.css";
import brand from "../../assets/images/brand.jpeg";
import { useEffect, useState } from "react";
import axiosClient from "../../services/axiosInstance";
import Swal from "sweetalert2";

const Navi = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const [loading, setLoading] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  const scrollDiv = (divId: string) => {
    var div = document.getElementById(divId);
    div?.scrollIntoView();
  };

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        if (rect.top <= 1021 && rect.top >= 105) {
          navigate("/");
        } else if (rect.top <= 104 && rect.top >= -824) {
          navigate("/hakkimizda");
        } else if (rect.top <= -840 && rect.top >= -1589) {
          navigate("/hizmetlerimiz");
        } else if (rect.top >= -1787 && rect.bottom <= -816) {
          navigate("/iletisim");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navigate]);

  const fetchAppointmentById = async () => {
    if (id) {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const client = axiosClient();
      const response = client.get(`api/randevular/?phone=${id}`);
      response
        .then((res) => {
          setId("");
          const message1 = `Sayin ${res.data[0].name_surname}. Randevunuz ${res.data[0].date} tarihi icin ${res.data[0].personel} adli personele olusturulmus. Dilerseniz iptal edebilirsiniz.`;
          const message2 = `Sayin ${res.data[0].name_surname}. Randevunuz onay bekliyor. Dilerseniz iptal edebilirsiniz.`;
          Swal.fire({
            position: "top-right",
            icon: "info",
            title: `${res.data[0].onay_durumu ? message1 : message2}`,
            showCancelButton: true,
            confirmButtonText: "Randevuyu Iptal Et",
            showLoaderOnConfirm: loading,
            confirmButtonColor: "red",
            cancelButtonText: "Kapat",
          }).then(async (result) => {
            if (result.isConfirmed) {
              const client = axiosClient();
              try {
                setLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 2000));
                await client.delete(`api/randevular/iptal/${res.data[0].id}`);
                Swal.fire({
                  position: "bottom-end",
                  icon: "success",
                  title: "Randevunuz basarili bir sekilde iptal edildi.",
                  showConfirmButton: false,
                  timer: 3000,
                });
              } catch (error) {
                console.log(error);
              }
              setLoading(false);
            }
          });
        })
        .catch((err) => {
          Swal.fire({
            position: "top-right",
            icon: "warning",
            title: "Randevu bulunamadi!",
            showConfirmButton: false,
            timer: 3000,
          });
        });
      setLoading(false);
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Randevu numaranizi giriniz!",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary navi"
        fixed="top"
      >
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>
            <img
              src={brand}
              alt="Emrah Tekle"
              className="img-fluid"
              width="40px"
              height="40px"
              style={{
                backgroundColor: "transparent",
                borderRadius: "100%",
                cursor: "pointer",
              }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {linkArray.map((item, index) => (
                <Nav.Link
                  key={index}
                  onClick={() => {
                    navigate(item.path);
                    scrollDiv(item.scrollTo);
                  }}
                  className={pathname === item.path ? "active" : ""}
                >
                  {item.link}
                </Nav.Link>
              ))}
            </Nav>
            <Nav>
              <InputGroup>
                <Form.Control
                  placeholder="Telefon numaranizi giriniz..."
                  maxLength={10}
                  aria-label="Randevu ara"
                  value={id}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setId(e.target.value)
                  }
                />
                <Button
                  className="pe-3"
                  id="search-appointment"
                  onClick={() => fetchAppointmentById()}
                >
                  Randevu Ara
                  {loading && (
                    <Spinner
                      size="sm"
                      variant="light"
                      animation="border"
                      className="ms-2"
                    />
                  )}
                </Button>
              </InputGroup>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navi;
