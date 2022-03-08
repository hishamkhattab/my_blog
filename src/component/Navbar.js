import { Link } from "react-router-dom";
import {BsPlusCircleFill} from 'react-icons/bs'
const Navbar = () => {

    return (
        <nav
            className="container-fluid bg-gradient mt-5 title-link">
            <Link
                to='/'
                className="text-center p-3 text-uppercase d-block fs-1 text-decoration-none text-dark" 
            >Babylone blog</Link>
                    <Link
                        to='/blogs/blog/create'
                        className="text-decoration-none text-secondary d-block text-center fs-1"
                >
                <BsPlusCircleFill/>
                </Link>
        </nav>
    );
}
 
export default Navbar;