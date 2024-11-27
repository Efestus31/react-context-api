import { useParams, useNavigate, } from "react-router-dom"
//import the use context
import { useEffect, useState, useContext } from "react";
import GlobalContext from '../contexts/GlobalContext'



export default function SinglePost() {


    const navigate = useNavigate()
    const [post, setPost] = useState(null);

    const { slug } = useParams();
    const { postData } = useContext(GlobalContext)


    const url = `http://localhost:3001/posts/${slug}`


    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {

                const error = Object.keys(data)
                if (error.includes('error')) {
                    console.log("error");
                    navigate('/404')
                } else {
                    setPost(data.data)
                }
            })
    },
        [])

    return (
        <>
            {
                post ? (
                    <div>
                        <div className="card" style={{ width: '40rem' }}>
                            <img src={`http://localhost:3001/${post.image}`} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted ">{post.tags}</h6>
                                <p className="card-text">{post.content}</p>

                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        Loading...
                    </div>

                )
            }

        </>
    )
}