// Importa los componentes y funciones necesarios de React Bootstrap y otros módulos
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { usePost } from '../context/PostProvider'; // Importa el contexto de posts
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContex'; // Importa el contexto de autenticación

// Definición del componente funcional PosteoModal
const PosteoModal = ({ showModal, handleClose }) => {
  const { createPost } = usePost(); // Obtiene la función de creación de posts desde el contexto
  const { user } = useAuth(); // Obtiene la información del usuario autenticado desde el contexto de autenticación

  // Define el esquema de validación usando Yup
  const validationSchema = Yup.object({
    title: Yup.string().required('Este campo es obligatorio'),
    description: Yup.string().required('Este campo es obligatorio'),
    imageURL: Yup.string().required('Este campo es obligatorio'),
  });

  // Configura el objeto useFormik con los valores iniciales, el esquema de validación y la función de envío
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      imageURL: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Agrega el autor al objeto de valores del post
        const postWithAuthor = {
          ...values,
          author: user.username,
        };

        // Llama a la función de creación de posts con el objeto actualizado
        await createPost(postWithAuthor);
        handleClose();

        // Muestra una notificación de éxito con SweetAlert2 y recarga la página
        Swal.fire({
          title: 'Post Creado Con Éxito',
          width: 600,
          padding: '3em',
          color: '#716add',
          background: '#fff url(/images/trees.png)',
          backdrop: `
            rgba(0,0,123,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `,
        }).then(() => {
          window.location.reload();
        });
      } catch (error) {
        console.error('Error al crear el post:', error);
      }
    },
  });

  // Retorna la estructura JSX del componente
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Post</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Formulario utilizando el objeto formik */}
        <Form onSubmit={formik.handleSubmit} className='px-3'>
          {/* Campo de título */}
          <div className="mb-3 mt-1">
            <label htmlFor='title' className='form-label'>
              Título
            </label>
            <input
              type="text"
              className='form-control'
              id='title'
              name='title'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {/* Mensaje de error si el título no es válido */}
            {formik.touched.title && formik.errors.title ? (
              <div className="text-danger">{formik.errors.title}</div>
            ) : null}
          </div>

          {/* Campo de descripción */}
          <div className="mb-3 mt-1">
            <label htmlFor='description' className='form-label'>
              Descripción
            </label>
            <textarea
              className='form-control'
              id='description'
              name='description'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              rows={3}
              cols={50}
            />
            {/* Mensaje de error si la descripción no es válida */}
            {formik.touched.description && formik.errors.description ? (
              <div className="text-danger">{formik.errors.description}</div>
            ) : null}
          </div>

          {/* Campo de URL de imagen */}
          <div className="mb-3 mt-1">
            <label htmlFor='imageURL' className='form-label'>
              Imágen
            </label>
            <input
              type="text"
              className='form-control'
              id='imageURL'
              name='imageURL'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.imageURL}
              placeholder='url-de-imagen.com'
            />
            {/* Mensaje de error si la URL de la imagen no es válida */}
            {formik.touched.imageURL && formik.errors.imageURL ? (
              <div className="text-danger">{formik.errors.imageURL}</div>
            ) : null}
          </div>

          {/* Botón para enviar el formulario */}
          <div className="text-end">
            <Button className='px-5' variant='success' type='submit' >
              Publicar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

// Exporta el componente PosteoModal
export default PosteoModal;
