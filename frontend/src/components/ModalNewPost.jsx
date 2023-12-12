import {Modal, Button, Form} from 'react-bootstrap'
import { useFormik } from "formik"
import * as Yup from 'yup'
import {usePost} from "../context/PostProvider"

const ModalNewPost = ({showModal, handleClose}) => {

    const {createPost} = usePost()

    const validationSchema = Yup.object({
        title: Yup.string().required('Este campo es obligatorio'),
        description: Yup.string().required('Este campo es obligatorio'),
        imageURL: Yup.string().required('Este campo es obligatorio'),
    })

    
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            imageURL: '',
        },

        validationSchema: validationSchema,

        onSubmit:async (values) => {
            console.log('Datos del formulario', JSON.stringify(values));

            await createPost(values)
            handleClose()
        },
    })


  return (
        
    <Modal show={showModal} onHide={handleClose} >
        <Modal.Header closeButton>
            <Modal.Title>Crear Post</Modal.Title>
        </Modal.Header>

        <Modal.Body>

            <Form onSubmit={formik.handleSubmit} className='px-3'>

            <div className="mb-3 mt-1">
                    <label htmlFor='title' className='form-label'> Título </label>
                    <input type="text" className='form-control' id='title' name='title' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}/>

                    {formik.touched.title && formik.errors.title ? (
                        <div className="text-danger">{formik.errors.title}</div>
                    ): null}
                                    
                </div>
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
                <div className="mb-3 mt-1">
                    <label htmlFor='imageURL' className='form-label'> Imágen </label>
                    <input type="text" className='form-control' id='imageURL' name='imageURL' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.imageURL} placeholder='url-de-imagen.com'/>

                    {formik.touched.imageURL && formik.errors.imageURL ? (
                        <div className="text-danger">{formik.errors.imageURL}</div>
                    ): null}
                                    
                </div>
                <div className="text-end">
                    <Button className='px-5' variant='success' type='submit' > Publicar </Button>
                </div>

            </Form>

        </Modal.Body>

    </Modal>
)
}

export default ModalNewPost