import { NavLink } from "react-router-dom";


export default function MainMenu() {

    return (
        <>
            <nav className="nav nav-tabs ">
                <NavLink className="nav-link" to="/" aria-current="page">Home</NavLink>
                <NavLink className="nav-link" to="/about">About</NavLink>
                <NavLink className="nav-link" to="/posts">Posts</NavLink>
                <NavLink className="nav-link" to="/form">Form field</NavLink>
            </nav>
        </>
    )
}