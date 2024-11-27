import { Link } from "react-router-dom";


export default function ButtonLink() {
    return (
        <>
            <Link className="btn btn-primary my-3" to='/posts'>Our posts</Link>
        </>
    )


}