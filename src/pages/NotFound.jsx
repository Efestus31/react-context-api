import { Link } from "react-router-dom"


export default function NotFound() {

    return (
        <>
            <div className="container">
                <h1>Sorry something went wrong!</h1>
                <h2>Try changing post</h2>
                <Link className="btn btn-primary my-3" to='/posts'>Our posts</Link>
            </div>

        </>

    )
}