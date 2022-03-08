// import { serverTimestamp,addDoc,collection} from "firebase/firestore";
// import { useState } from "react";
// import { Form,Button} from 'react-bootstrap'
// import { db } from '../firebase';
// import { useNavigate } from 'react-router-dom'
// import { BsSave } from 'react-icons/bs'
// import Loading from "../component/Loading";

// const initialForm = {
//     title: '',
//     author: '',
//     date: serverTimestamp(),
//     snippet: '',
//     body:''
// }
// const CreateBlogPage = () => {
//     const collectionRef = collection(db, 'blogs');
//     const [validated, setValidated] = useState(false);
//     const [blogForm, setBlogForm] = useState(initialForm);
//     const [formerrors, setFormErrors] = useState({});
//     const [isLoading, setIsLoading] = useState(false);
//     let navigate = useNavigate();
//     const handleSubmit = (event) => {
        
//         event.preventDefault();

//       const form = event.currentTarget;
//       if (form.checkValidity() === false) {
//         event.preventDefault();
//         event.stopPropagation();
//     }
//         setValidated(true);
//         // setIsLoading(true);
//         setTimeout(() => {
//             if (validated) {
//                 addDoc(collectionRef, { ...blogForm })
//                     .then(() => {
//                         setBlogForm(initialForm);
//                         setValidated(false)
//                         setIsLoading(true);
//                         navigate('/')
//                     })
                    
//             }
//         }, 1000);
//     };



//     const handelForm = ({ target }) => {
//         setBlogForm(prevState => {
//             return { ...prevState, [target.name]: target.value };
//         });
//     };

//     const validateForm = () => {
//         console.log()
//         let error = {};
//         //author feild
//         if (!blogForm.author) {
//             error.author = 'Author name is required';
//         }
//         //body feild
//         if (!blogForm.body) {
//             error.body = 'Body of the blog is required';
//         }
//         //author feild
//         if (!blogForm.title) {
//             error.title = 'title is required';
//         }

//         setFormErrors(error);
//         if (Object.keys(error).length === 0) {
//             return true;
//         } else {
//             return false;
//         }
//     }
    

//     return (
//         <>
//             {isLoading && <Loading />}
//             {!isLoading &&
//                 <article className="mt-1 p-5 container">
//                     <Form noValidate validated={validated} onSubmit={handleSubmit}>
//                         <Form.Group
//                             className="mb-3"
//                             controlId="validationCustom01">
//                             <Form.Label>Title</Form.Label>
//                             <Form.Control
//                                 required
//                                 type="text"
//                                 placeholder="Title"
//                                 name="title"
//                                 onChange={handelForm}
//                                 value={blogForm.title}
//                             />
//                         </Form.Group>
//                         <Form.Group
//                             className="mb-3"
//                             controlId="validationCustom01">
//                             <Form.Label>Author</Form.Label>
//                             <Form.Control
//                                 required
//                                 type="text"
//                                 placeholder="Author"
//                                 name="author"
//                                 onChange={handelForm}
//                                 value={blogForm.author}
//                             />
//                         </Form.Group>
//                         <Form.Group
//                             className="mb-3"
//                             controlId="validationCustom01">
//                             <Form.Label>Snippet</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name='snippet'
//                                 placeholder="Write a short description"
//                                 onChange={handelForm}
//                                 value={blogForm.snippet}
//                             />
//                         </Form.Group>
//                         <Form.Group
//                             className="mb-3"
//                             controlId="validationCustom01">
//                             <Form.Label>Body</Form.Label>
//                             <Form.Control
//                                 required
//                                 as="textarea"
//                                 name='body'
//                                 placeholder="Write your blog here ..."
//                                 style={{ height: '100px' }}
//                                 onChange={handelForm}
//                                 value={blogForm.body}
//                             />
//                         </Form.Group>

//                         <Button
//                             type="submit"
//                             className="submit-btn"
//                         >
//                             <BsSave
//                                 // type="submit"    
//                                 className="text-danger fs-3 icon"

//                             /></Button>
//                     </Form>
//                 </article>
//             }
//         </>
//     )
    
// }
 
// export default CreateBlogPage;