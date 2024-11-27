import { useParams, useNavigate } from "react-router-dom"
//import the use context
import { useEffect, useState, useContext } from "react";
import GlobalContext from '../contexts/GlobalContext'

export default function PostPage() {

    const navigate = useNavigate()
    const [post, setPost] = useState(null);

    const { slug } = useParams();
    const { Url_api } = useContext(GlobalContext)


    const url = `${Url_api}/posts/${slug}`


    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);

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
            <h1>Post name: {slug}</h1>
            {
                post ? (
                    <div>
                        <div className="card" style={{ width: '40rem' }}>
                            <img src={`${Url_api}/${post.image}`} className="card-img-top" alt="..." />
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