import {Modal, Button, Form} from 'react-bootstrap'
import { useFormik } from "formik"
import * as Yup from 'yup'
import {useComment} from "../context/CommentProvider"

const NuevoComentario = ({showModal, handleClose}) => {
    const {createComment} = useComment()
    const validationSchema = Yup.object({
        description: Yup.string().required('Debes escribir tu comentario'),
    })
    const formik = useFormik({
        initialValues: {
            description: '',
        },
        validationSchema: validationSchema,
        onSubmit:async (values) => {
            console.log('Datos del formulario', JSON.stringify(values));
            await createComment(values)
            handleClose()
        },
    })
  return (
    <Modal show={showModal} onHide={handleClose} >
        <Modal.Header closeButton>
            <Modal.Title>Crear Comentario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={formik.handleSubmit} className='px-3'>
                <div className="mb-3 mt-1">
                    <label htmlFor='description' className='form-label'> Descripción </label>
                    <textarea className='form-control' id='description' name='description' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    rows={3}
                    cols={50}/>

                    {formik.touched.description && formik.errors.description ? (
                        <div className="text-danger">{formik.errors.description}</div>
                    ): null}          
                </div>
                <div className="text-end">
                    <Button className='px-5' variant='primary' type='submit' > Publicar </Button>
                </div>
            </Form>
        </Modal.Body>
    </Modal>
)
}
export default NuevoComentario