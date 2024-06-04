import './App.css';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import CreatePost from './components/CreatePost';
import Navbar from './components/Navbar';

function App() {
  return (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/createpost" element={<CreatePost/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/logout" element={<Logout/>}></Route>
    </Routes>
  </Router>
  );
}

export default App;
