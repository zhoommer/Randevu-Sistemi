import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  BiSolidCalendarAlt,
  BiSolidUser,
  BiSolidMobile,
  BiSolidUserCircle,
  BiSolidTime,
} from "react-icons/bi";
import { hours } from "../data/hours";
import axios from "axios";
import axiosInstance from "../services/axiosInstance";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react";

interface ValuesType {
  id?: string;
  date: string;
  nameSurname: string;
  phone: string;
  personel: string;
  hour: string;
}

const AppointmentForm = () => {
  const [loading, setloading] = useState<boolean>(false);
  const [data, setdata] = useState<ValuesType[]>([]);
  const initialState = {
    date: "",
    nameSurname: "",
    phone: "",
    personel: "",
    hour: "",
  };

  const validationSchema = Yup.object().shape({
    date: Yup.date().required("Zorunlu alan"),
    nameSurname: Yup.string().required("Zorunlu alan"),
    phone: Yup.string()
      .required("Zorunlu alan")
      .max(10, "Telefon numaraniz 10 haneli olmalidir")
      .matches(/^(?:\+?90|0)?\d{10}$/, "Geçerli bir telefon numarası giriniz"),
    personel: Yup.string().required("Zorunlu alan"),
    hour: Yup.string().required("Zorunlu alan"),
  });

  const fetchAppointments = async (date: string) => {
    setloading(true);
    const client = axiosInstance();
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await client.get<ValuesType[]>(
        "http://localhost:3000/appointments",
      );

      const filteredData = response.data.filter((item) => item.date === date);
      setdata(filteredData);
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };

  const handleSubmit = async (values: ValuesType, resetForm: any) => {
    setloading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await axios.post(
        "http://localhost:3000/appointments",
        values,
      );
      if (response.status === 201) {
        setdata([...data, response.data]);
        data.push(response.data);
        resetForm();
        Swal.fire({
          title: "Randevunuz basarili bir sekilde olusturuldu",
          position: "top-right",
          icon: "success",
          text: `Basvuru numaraniz: ${response.data.id}`,
          showConfirmButton: false,
          timer: 4000,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };

  const disabledHours = data.map((item) => item.hour);

  return (
    <>
      <Container className="mt-5" fluid>
        <Container>
          <Formik
            initialValues={initialState}
            onSubmit={(values: ValuesType, { resetForm }) => {
              handleSubmit(values, resetForm);
            }}
            validationSchema={validationSchema}
          >
            {({ setFieldValue }) => (
              <Form className="d-flex justify-content-center">
                <Row>
                  <Col xs={12}>
                    <label
                      htmlFor="date"
                      className="fw-semibold d-flex align-items-center ms-2"
                    >
                      <span>
                        <BiSolidCalendarAlt />
                      </span>
                      <span className="ms-2">Tarih Seciniz</span>
                    </label>
                    <Field
                      disabled={loading}
                      type="date"
                      name="date"
                      className="form-control"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("date", e.target.value);
                        fetchAppointments(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="date"
                      component="div"
                      className="text-danger fw-semibold ms-2 position-absolute w-25"
                    />
                  </Col>
                  <Col xs={12} className="mt-4">
                    <label
                      htmlFor="nameSurname"
                      className="fw-semibold d-flex align-items-center ms-2"
                    >
                      <span>
                        <BiSolidUser />
                      </span>
                      <span className="ms-2">Isim Soyisim</span>
                    </label>
                    <Field
                      disabled={loading}
                      type="text"
                      name="nameSurname"
                      className="form-control"
                      placeholder="Isim soyisim giriniz"
                    />
                    <ErrorMessage
                      name="nameSurname"
                      component="div"
                      className="text-danger fw-semibold ms-2 position-absolute w-25"
                    />
                  </Col>
                  <Col xs={12} className="mt-4">
                    <label
                      htmlFor="phone"
                      className="fw-semibold d-flex align-items-center ms-2"
                    >
                      <span>
                        <BiSolidMobile />
                      </span>
                      <span className="ms-2">Telefon</span>
                    </label>
                    <Field
                      disabled={loading}
                      type="text"
                      name="phone"
                      className="form-control"
                      placeholder="Telefon numaranizi giriniz. (507 *** ** **)"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-danger fw-semibold ms-2 position-absolute w-25"
                    />
                  </Col>
                  <Col xs={12} className="mt-4">
                    <label
                      htmlFor="personel"
                      className="fw-semibold d-flex align-items-center ms-2"
                    >
                      <span>
                        <BiSolidUserCircle />
                      </span>
                      <span className="ms-2">Personel Seciniz</span>
                    </label>
                    <Field
                      as="select"
                      name="personel"
                      className="form-select"
                      disabled={loading}
                    >
                      <option value="">Seciniz</option>
                      <option value="Emrah">Emrah</option>
                      <option value="Lokman">Lokman</option>
                    </Field>
                    <ErrorMessage
                      name="personel"
                      component="div"
                      className="text-danger fw-semibold ms-2 position-absolute w-25"
                    />
                  </Col>
                  <Col className="mt-4">
                    <label
                      htmlFor="hour"
                      className="fw-semibold d-flex align-items-center ms-2"
                    >
                      <span>
                        <BiSolidTime />
                      </span>
                      <span className="ms-2">Saat Seciniz</span>
                    </label>
                    <Field
                      as="select"
                      name="hour"
                      className="form-select"
                      disabled={loading}
                    >
                      <option value="">Seciniz</option>
                      {hours.map((item, index) => (
                        <option
                          key={index}
                          value={item.value}
                          disabled={disabledHours.includes(item.value)}
                        >
                          {item.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="hour"
                      component="div"
                      className="text-danger fw-semibold ms-2 position-absolute w-25"
                    />
                  </Col>

                  <Col xs={12} className="mt-4 d-flex justify-content-end">
                    <Button
                      type="submit"
                      className="pe-4 animation-submit-btn"
                      disabled={loading}
                    >
                      <span className={loading ? "clearText" : ""}>R</span>
                      <span className={loading ? "clearText" : ""}>a</span>
                      <span className={loading ? "clearText" : ""}>n</span>
                      <span className={loading ? "clearText" : ""}>d</span>
                      <span className={loading ? "clearText" : ""}>e</span>
                      <span className={loading ? "clearText" : ""}>v</span>
                      <span className={loading ? "clearText" : ""}>u</span>

                      <span className={loading ? "clearText" : ""}> A</span>
                      <span className={loading ? "clearText" : ""}>l</span>
                      <Icon
                        icon="icon-park:shaver-one"
                        className={loading ? "submit-btn-icon" : "d-none"}
                        //className="submit-btn-icon"
                      />
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Container>
      </Container>
    </>
  );
};

export default AppointmentForm;
