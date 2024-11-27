import SinglePost from "../components/SinglePost"
import { useParams } from "react-router-dom"
import ButtonLink from "../components/ButtonLink";

export default function PostPage() {


    const { slug } = useParams();

    return (

        <>
            <div className="container">
                <h1>Post name: {slug}</h1>
                <SinglePost />
                <ButtonLink />
            </div>

        </>
    )
}