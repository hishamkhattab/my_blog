import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {FiEdit} from 'react-icons/fi'
import {BsSave} from 'react-icons/bs'
import { db } from "../firebase";
import { doc, onSnapshot, updateDoc, serverTimestamp } from "firebase/firestore";
import Loading from "../component/Loading";


const SingleBlogPage = () => {

    const { id } = useParams();
    const [blog, setBlog] = useState({});
    const [updatedBlog, setUpdatedBlog] = useState({});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [isLoading, setIsLoading] = useState(true);
    

    useEffect(() => {
        setUpdatedBlog({...blog, date: serverTimestamp()})
    },[blog])

    useEffect(() => {
    
        //get a reference for a single document
        const documentRef = doc(db, 'blogs', id);
        
        const unsubscribe = onSnapshot(documentRef, (doc) => {
            setBlog(doc.data());
            setIsLoading(false);
            })
        
        return () => unsubscribe();
    }, [id]);

    const { title, body, author } = blog;

    const handleForm = ({ target }) => {
        setUpdatedBlog(prevState => {
            return { ...prevState, [target.name]: target.value}
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const documentRef = doc(db, 'blogs', id);
        updateDoc(documentRef, updatedBlog)
        handleClose();
    }

    return (
        <>
            {isLoading && <Loading />}
            {blog && <article className="mt-1 p-5 container">
                <div className="pb-3 border-bottom border-2">
                    <h1 className="fs-1 text-dark text-uppercase">{title}</h1>
                    <span className="d-block text-muted fs-6">
                        Written By
                        <span className="text-danger fw-bold fs-5"> {author}</span>
                    </span>
                    <div className="text-end">
                    <FiEdit
                    className="text-danger fs-3 icon"
                    onClick={handleShow}
                />
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title className="text-capitalize"><span className="text-danger">Edit:</span> {title}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label">Title</label>
                                        <input
                                            type="text"
                                            className="form-control col-auto"
                                            name='title'
                                            onChange={handleForm}
                                            value={updatedBlog.title}
                                            placeholder={blog.title}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Author</label>
                                        <input
                                            type="text"
                                            className="form-control col-auto"
                                            value={updatedBlog.author}
                                            name='author'
                                            onChange={handleForm}
                                            placeholder={blog.author}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Snippet</label>
                                        <input
                                            type="text"
                                            className="form-control col-auto"
                                            value={updatedBlog.snippet}
                                            name='snippet'
                                            onChange={handleForm}
                                            placeholder={blog.snippet}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Body</label>
                                        <textarea
                                            className="form-control col-auto"
                                            value={updatedBlog.body}
                                            name='body'
                                            onChange={handleForm}
                                            placeholder={blog.body}
                                        >
                                        </textarea>
                                    </div>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <BsSave
                    className="text-danger fs-3 icon"
                    onClick={handleSubmit}
                />
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
                <p className="lh-lg p-3 fs-5">{body}</p>
            </article>}
        </>
    )
}

export default SingleBlogPage;