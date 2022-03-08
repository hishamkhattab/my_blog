import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './component/Navbar';
import CreateBlogPage from './pages/CreateBlogPage';
import Homepage from './pages/Homepage';
import SingleBlogPage from './pages/SingleBlogPage';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/blogs/blog/:id' element={<SingleBlogPage/>}/>
          <Route path='/blogs/blog/create' element={<CreateBlogPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
