import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import NavBar from './Components/NavBar';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Register from './Pages/Register';
import { PrivateRoute } from './PrivateRoutes/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostPage from './Pages/PostPage';
import Spinnerr from './Components/Spinnerr';


function App() {
  return (
    <Router>
      <NavBar/>
      <Spinnerr/>
      <Routes>
        <Route index element={<Register/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path="/Profile" element={
          <PrivateRoute>
            <Profile/>
          </PrivateRoute>
          
          } />
          <Route path='/posts' element={<PostPage/>} />

      </Routes>
    </Router>
  );
}

export default App;
