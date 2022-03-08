import { serverTimestamp,addDoc,collection} from "firebase/firestore";
import { useState } from "react";
import { Form,Button} from 'react-bootstrap'
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom'
import { BsSave } from 'react-icons/bs'

const initialForm = {
    title: '',
    author: '',
    date: serverTimestamp(),
    snippet: '',
    body:''
}
const CreateBlogPage = () => {
    const collectionRef = collection(db, 'blogs');
    const [blogForm, setBlogForm] = useState(initialForm);
    const [formErrors, setFormErrors] = useState({});
    let navigate = useNavigate();
    const handleSubmit = (event) => {
        
        event.preventDefault();
        if (validateForm(blogForm)) {
            addDoc(collectionRef, { ...blogForm })
            .then(() => {
                setBlogForm(initialForm);
                navigate('/')
            })
        }
    };



    const handelForm = ({ target }) => {
        setBlogForm(prevState => {
            return { ...prevState, [target.name]: target.value };
        });
    };

    const validateForm = () => {
        let errors = {};
        //author feild
        if (!blogForm.author) {
            errors.author = 'The author name is required';
        }
        //body feild
        if (!blogForm.body) {
            errors.body = 'The body of the blog is required';
        }
        //author feild
        if (!blogForm.title) {
            errors.title = 'Set a title to your blog.';
        }

        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            return true;
        } else {
            return false;
        }
    }
    

    return (
        <article className="mt-1 p-5 container">
        <Form onSubmit={handleSubmit}>
                <Form.Group
                    className="mb-3"
                controlId="formGridName">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Title"
                    name="title"
                    onChange={handelForm}
                    value={blogForm.title}
                    />
                    {formErrors.title && <p className="text-danger mt-1 ms-3 error-msg fw-bold">{formErrors.title}</p>}
            </Form.Group>
            <Form.Group
                className="mb-3"
                controlId="formGridName">
                <Form.Label>Author</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Author"
                    name="author"
                    onChange={handelForm}
                    value={blogForm.author}
                    />
                    {formErrors.author && <p className="text-danger mt-1 ms-3 error-msg fw-bold">{formErrors.author}</p>}
            </Form.Group>
            <Form.Group
                className="mb-3"
                controlId="formGridName">
                <Form.Label>Snippet</Form.Label>
                <Form.Control
                    type="text"
                    name='snippet'
                    placeholder="Write a short description"
                    onChange={handelForm}
                    value={blogForm.snippet}
                />
            </Form.Group>
            <Form.Group
                className="mb-3"
                controlId="formGridName">
                <Form.Label>Body</Form.Label>
                <Form.Control
                    as="textarea"
                    name='body'
                    placeholder="Write your blog here ..."
                    style={{ height: '100px' }}
                    onChange={handelForm}
                    value={blogForm.body}
                    />
                    {formErrors.body && <p className="text-danger mt-1 ms-3 error-msg fw-bold">{formErrors.body}</p>}
            </Form.Group>

            <Button
                type="submit"
                className="submit-btn"
            >
                <BsSave
                    className="text-danger fs-3 icon"

                /></Button>
        </Form>
    </article>    )
    
}
 
export default CreateBlogPage;