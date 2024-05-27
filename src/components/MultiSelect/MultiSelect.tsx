import React from "react";
import Select from "react-select";

const values = [
  { label: "Sac", value: "Sac" },
  { label: "Sakal", value: "Sakal" },
  { label: "Agda", value: "Agda" },
  { label: "Sac Boyama", value: "Sac Boyama" },
  { label: "Yuz Bakimi", value: "Yuz Bakimi" },
];

interface PropTypes {
  field: any;
  form: any;
}

const MultiSelect: React.FC<PropTypes> = ({ field, form }) => {
  const onChange = (option: any) => {
    form.setFieldValue(field.name, option);
  };
  return (
    <>
      <Select
        {...field}
        isMulti
        options={values}
        onChange={onChange}
        placeholder={"Islem Seciniz"}
      />
    </>
  );
};

export default MultiSelect;
