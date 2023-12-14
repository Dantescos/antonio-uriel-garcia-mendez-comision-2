// Importa los componentes y funciones necesarios de React Bootstrap y otros módulos
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useComment } from '../context/CommentProvider'; // Importa el contexto de comentarios

// Definición del componente funcional NuevoComentario
const NuevoComentario = ({ showModal, handleClose }) => {
  const { createComment } = useComment(); // Obtiene la función de creación de comentarios desde el contexto
  
  // Define el esquema de validación usando Yup
  const validationSchema = Yup.object({
    description: Yup.string().required('Este campo es obligatorio'),
  });

  // Configura el objeto useFormik con los valores iniciales, el esquema de validación y la función de envío
  const formik = useFormik({
    initialValues: {
      description: '',
    },
    
    validationSchema: validationSchema,
    
    // Función que se ejecuta al enviar el formulario
    onSubmit: async (values) => {
      console.log('Datos del formulario', JSON.stringify(values));

      // Llama a la función de creación de comentarios y cierra el modal
      await createComment(values);
      handleClose();
    },
  });

  // Retorna la estructura JSX del componente
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Comentario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Formulario utilizando el objeto formik */}
        <Form onSubmit={formik.handleSubmit} className='px-3'>
          {/* Campo de descripción */}
          <div className="mb-3 mt-1">
            <label htmlFor='description' className='form-label'> Descripción </label>
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
          
          {/* Botón para enviar el formulario */}
          <div className="text-end">
            <Button className='px-5' variant='primary' type='submit'> Publicar </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

// Exporta el componente NuevoComentario
export default NuevoComentario;
