import Card from 'react-bootstrap/Card'


const PostLoged = ({post}) => {

 

    const createdAtDate = new Date(post.createdAt)
    const day = createdAtDate.getDate()
    const month = createdAtDate.getMonth() + 1 
    const year = createdAtDate.getFullYear()
    const formattedDatePost = `${day}/${month}/${year}`
    const formattedDateUpdate = `${day}/${month}/${year}`

  return (
    <>
    <div className="container">
        <Card className="bg-primary text-white p-1 my-3" >
        <Card.Img src={post.imgURL} alt="Imagen" />
        <Card.ImgOverlay>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text className="text-truncate overflow-hidden">
            {post.description}
            </Card.Text>
            <Card.Text className="text-truncate overflow-hidden">
                @{post.autor} - 
                Posteado: {formattedDatePost} - 
                Ultima actualización: {formattedDateUpdate}
            </Card.Text>
        </Card.ImgOverlay>
        </Card>
      </div>




      
    </>
  )
}

export default PostLoged