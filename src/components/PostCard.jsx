import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import GlobalContext from '../contexts/GlobalContext'


export default function PostCard() {
    const [postsData, setPostsData] = useState({})
    const { Url_api } = useContext(GlobalContext)

    function fetchData(url = `${Url_api}/posts`) {
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                setPostsData(data)

            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            {
                postsData.data ?
                    postsData.data.map((post, index) => (
                        <div className="col" key={post.id || index}>
                            <div className="card">
                                <h3>
                                    {post.title}
                                </h3>
                                <Link to={`/posts/${post.slug}`}>
                                    <img src={`${Url_api}/` + post.image} alt={post.title} style={{ width: '100%', height: '10rem', aspectRatio: '1' }} />
                                </Link>
                            </div>
                            <div className='border border-gray-400 p-2'>
                                {post.content}
                            </div>

                        </div>
                    )) :
                    <p>No data found</p>
            }
        </>
    )
}