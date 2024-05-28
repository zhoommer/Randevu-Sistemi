import React, { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  BiSolidCalendarAlt,
  BiSolidUser,
  BiSolidMobile,
  BiSolidUserCircle,
  BiSolidTime,
  BiSolidNote,
} from "react-icons/bi";
import { hours } from "../data/hours";
import axios from "axios";
import axiosInstance from "../services/axiosInstance";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react";
import MultiSelect from "./MultiSelect/MultiSelect";

interface IslemType {
  label: string;
  values: string;
}

interface ValuesType {
  id?: string;
  date: string;
  name_surname: string;
  phone: string;
  personel: number;
  note?: string;
  hour: string;
  islem: IslemType[];
}

interface PersonelType {
  id: number;
  name: string;
  surname: string;
  phone: string;
  status: boolean;
}

const AppointmentForm = () => {
  const [loading, setloading] = useState<boolean>(false);
  const [data, setdata] = useState<ValuesType[]>([]);
  const [personeller, setPersoneller] = useState<PersonelType[]>([]);
  const [personel, setPersonel] = useState<number>();
  const [date, setDate] = useState<string>("");
  const initialState = {
    date: "",
    name_surname: "",
    phone: "",
    personel: 0,
    note: "",
    hour: "",
    islem: [],
  };

  const validationSchema = Yup.object().shape({
    date: Yup.date().required("Zorunlu alan"),
    name_surname: Yup.string().required("Zorunlu alan"),
    phone: Yup.string()
      .required("Zorunlu alan")
      .max(10, "Telefon numaraniz 10 haneli olmalidir")
      .matches(/^(?:\+?90|0)?\d{10}$/, "Geçerli bir telefon numarası giriniz"),
    personel: Yup.number().required("Zorunlu alan"),
    hour: Yup.string().required("Zorunlu alan"),
  });

  useEffect(() => {
    const fetchPersonels = async () => {
      const client = axiosInstance();

      const response = await client.get<PersonelType[]>("/api/personeller/");
      const active_personeller = response.data.filter(
        (item) => item.status === true,
      );
      setPersoneller(active_personeller);
    };

    fetchPersonels();
  }, []);

  useEffect(() => {
    const fetchRandevular = async () => {
      const client = axiosInstance();
      const response = await client.get("/api/randevular");
      setdata(response.data);
    };
    fetchRandevular();
  }, []);

  const handleSubmit = async (values: ValuesType, resetForm: any) => {
    setloading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await axios.post(
        "http://localhost:8000/api/randevular/",
        values,
      );
      if (response.status === 201) {
        setdata([...data, response.data]);
        data.push(response.data);
        resetForm();
        Swal.fire({
          title:
            "Randevu olusturma isteginiz basarili bir sekilde olusturuldu.",
          position: "top-right",
          icon: "success",
          text: `Basvuru durumunuzu telefon numaraniz ile sorgulayabilirsiniz.`,
          showConfirmButton: false,
          timer: 4000,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };

  const disabledHours = useMemo(() => {
    const items = data.filter(
      (item) => item.personel === personel && item.date === date,
    );
    return items.map((i) => i.hour);
  }, [data, personel, date]);

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
                        setDate(e.target.value);
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
                      htmlFor="name_surname"
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
                      name="name_surname"
                      className="form-control"
                      placeholder="Isim soyisim giriniz"
                    />
                    <ErrorMessage
                      name="name_surname"
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
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        setFieldValue("personel", event.target.value);
                        setPersonel(+event.target.value);
                      }}
                    >
                      <option value="">Seciniz</option>
                      {personeller.map((personel, index) => (
                        <option key={index} value={personel.id}>
                          {personel.name}
                        </option>
                      ))}
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

                  <Col className="mt-4">
                    <label
                      htmlFor="islem"
                      className="fw-semibold d-flex align-items-center ms-2"
                    >
                      <span>
                        <BiSolidTime />
                      </span>
                      <span className="ms-2">Islem Seciniz</span>
                    </label>
                    <Field
                      name="islem"
                      className="form-select"
                      component={MultiSelect}
                      disabled={loading}
                    />
                    <ErrorMessage
                      name="islem"
                      component="div"
                      className="text-danger fw-semibold ms-2 position-absolute w-25"
                    />
                  </Col>
                  <Col className="mt-4" xs={12}>
                    <label
                      htmlFor="note"
                      className="fw-semibold d-flex align-items-center ms-2"
                    >
                      <span>
                        <BiSolidNote />
                      </span>
                      <span className="ms-2">Not Giriniz</span>
                    </label>
                    <Field
                      as="textarea"
                      name="note"
                      className="form-control"
                      disabled={loading}
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
