import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const EditPostModal = ({ showModal, handleClose, onSubmit, initialValues }) => {
  // Definir el esquema de validación usando Yup
  const validationSchema = Yup.object({
    title: Yup.string().required("Este campo es obligatorio"),
    description: Yup.string().required("Este campo es obligatorio"),
    imageURL: Yup.string().required("Este campo es obligatorio"),
  });

  // Configurar el objeto useFormik con los valores iniciales, el esquema de validación y la función de envío
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Llamar a la función de envío proporcionada en las propiedades
        await onSubmit(values);

        // Mostrar una notificación de éxito con SweetAlert2
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Post editado Con Éxito",
          showConfirmButton: false,
          timer: 2500,
        });

        // Cerrar el modal después de un tiempo y recargar la página
        setTimeout(() => {
          handleClose();
          window.location.reload();
        }, 2500);
      } catch (error) {
        // Manejar errores si ocurren al enviar el formulario
        console.error("Error al enviar el formulario:", error);
      } finally {
        // Establecer que el formulario ya no está siendo enviado
        setSubmitting(false);
      }
    },
  });

  // Retornar el JSX del componente del modal
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Post</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Formulario utilizando el objeto formik */}
        <Form onSubmit={formik.handleSubmit} className="px-3">
          {/* Campo de título */}
          <div className="mb-3 mt-1">
            <label htmlFor="title" className="form-label">
              Título
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-danger">{formik.errors.title}</div>
            ) : null}
          </div>

          {/* Campo de descripción */}
          <div className="mb-3 mt-1">
            <label htmlFor="description" className="form-label">
              Descripción
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              rows={3}
              cols={50}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-danger">{formik.errors.description}</div>
            ) : null}
          </div>

          {/* Campo de URL de imagen */}
          <div className="mb-3 mt-1">
            <label htmlFor="imageURL" className="form-label">
              Imágen
            </label>
            <input
              type="text"
              className="form-control"
              id="imageURL"
              name="imageURL"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.imageURL}
              placeholder="url-de-imagen.com"
            />
            {formik.touched.imageURL && formik.errors.imageURL ? (
              <div className="text-danger">{formik.errors.imageURL}</div>
            ) : null}
          </div>

          {/* Botón de confirmación del formulario */}
          <div className="text-end">
            <Button className="px-5" variant="success" type="submit">
              Confirmar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditPostModal;
