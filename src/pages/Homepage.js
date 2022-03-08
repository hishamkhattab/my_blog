import { collection, onSnapshot, query,deleteDoc, doc, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import {RiDeleteBin2Line} from 'react-icons/ri'
import Loading from '../component/Loading'

//get collection ref
const collectionRef = collection(db, 'blogs');

const Homepage = () => {

    const [result, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    //query blogs and order them by time they created (new first )
    useEffect(() => {
        const q = query(collectionRef, orderBy('date','desc'))
        //get all documents from the collection
        const unsubscribe = onSnapshot(q, (snapshot) => {
            let fetched = snapshot.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
            })

            setResult(fetched)
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [])

    const handelDelete = (id) => {
        const docRef = doc(db, 'blogs', id)
        deleteDoc(docRef)
    }
    const displayData = result.map((el) => {
        const { title,snippet,author,id } = el;
        return (
            <section
                key={id}
                className="mb-4 p-2 pb-3 border-bottom d-flex justify-content-between align-items-center flex-column flex-md-row"
            >
                <Link
                    className="text-decoration-none text-blog text-md-start text-center" 
                    to={`/blogs/blog/${id}`}
                >
                    <h3 className="text-dark text-capitalize">{title}</h3>
                    <span className="d-block text-danger mb-1">{author}</span>
                    <span className="text-muted">{snippet}</span>
                </Link>
                <RiDeleteBin2Line
                    className="text-danger fs-3 icon"
                    onClick={() => handelDelete(id)}
                />
            </section>
        )
    })
    return (
        <>
            {isLoading && <Loading />}
            {!isLoading && <article className="container p-5">
                {displayData}
            </article>}
        </>
        
    );
}
 
export default Homepage;