import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import s from './SearchBar.module.css'

const SearchBar = ({ handleSearch }) => {
  const initialValues = {
  query: '',
  };
  const handleSubmit = (values, { resetForm }) => {
    handleSearch(values.query);
    resetForm();
  };

  const validationSchema = Yup.object({
    query: Yup.string()
      .trim()
      .required("Field cannot be empty! ")
      .min(1, "Enter please min 1 chars."),
  });
    
    
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={s.form}>
          <Field className={s.field} name="query" placeholder="Enter..." />
          <button className={s.btn} type="submit">
            Search
          </button>
          <ErrorMessage name="query" component="span" />
        </Form>
      </Formik>
    </div>
  );
};

export default SearchBar;