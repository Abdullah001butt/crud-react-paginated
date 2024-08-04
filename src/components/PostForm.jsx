import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const PostForm = ({ onSubmit, initialValue }) => {
  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);
    resetForm();
  };

  return (
    <div className="max-w-md mx-auto p-4 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
      <Formik
        initialValues={{
          title: initialValue?.title || "",
          description: initialValue?.description || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <h2 className="text-lg font-bold mb-4">Create a Post</h2>
            <Field name="title">
              {({ field, form }) => (
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    {...field}
                    id="title"
                    className={`w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded ${
                      errors.title && touched.title ? "border-red-500" : ""
                    }`}
                  />
                  {errors.title && touched.title && (
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-500 text-xs italic"
                    />
                  )}
                </div>
              )}
            </Field>
            <Field name="description">
              {({ field }) => (
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    {...field}
                    id="description"
                    className={`w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded ${
                      errors.description && touched.description
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  {errors.description && touched.description && (
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 text-xs italic"
                    />
                  )}
                </div>
              )}
            </Field>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PostForm;
