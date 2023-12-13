import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar.logeado.jsx';
import PostDetail from '../components/PostDetail.jsx'
import { usePost } from '../context/PostProvider.jsx'
import { useEffect, useState } from 'react'


const Postpreciso = () => {
  const [data, setData] = useState(null)
    
  const {id} = useParams()
    const { getPostById, post } = usePost();

    useEffect(() => {
      async function fetchData() {
        const postData = await getPostById(id)
        setData(postData)
    }
    fetchData()
  }, [id, getPostById])

  return (
    <>
      <Navbar/>
      <PostDetail post={data}/>
    
    </>
  )
}

export default Postpreciso