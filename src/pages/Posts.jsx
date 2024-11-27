import { useContext } from 'react';
import GlobalContext from '../contexts/GlobalContext'; // Import the context
import PostCard from '../components/PostCard'; // Import PostCard component

export default function Posts() {
    const { postsData } = useContext(GlobalContext); // Use context for posts data
    return (
        <>
            <h1>Posts page</h1>
            <section className='posts'>
                <div className="container">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                        {postsData && postsData.length > 0 ? (
                            postsData.map((post, index) => (
                                <PostCard key={post.id || index} post={post} />
                            ))
                        ) : (
                            <p>No posts available</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}