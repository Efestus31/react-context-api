import { Link } from 'react-router-dom';

export default function About() {

    return (
        <>
            <div className="container">
                <h1>About page</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam quisquam quis corporis,
                    quod accusamus exercitationem accusantium facere laborum et repudiandae reprehenderit obcaecati omnis asperiores eveniet placeat est delectus.
                    Distinctio, temporibus.</p>

                <Link className="btn btn-primary" to='/posts'>Our posts</Link>
            </div>



        </>
    )
}
