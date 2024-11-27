
import PostCard from '../components/PostCard';




export default function Posts() {
    return (
        <>
            <h1>
                Posts page
            </h1>
            <section className='posts'>
                <div className="container">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                        <PostCard />
                    </div>
                </div>
            </section>
        </>
    )
}
