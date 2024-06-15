import {Route,Router,BrowserRouter,Routes, useSearchParams, useNavigate} from 'react-router-dom';
import Home_Page from './Pages/Home_Page';
import Sign_Up_page from './Pages/Sign_Up_page';
import Login from './Pages/Login';
import Imagedetection from './Component/Imagedetection';
import NotAuthorized from './Component/NotAuthorized';
import NotFound from './Component/NotFound';
import ProtectedRoute from './Auth/ProtectedRoute';

function App() {
  
  return(

  <>
   <div className="bg-slate-900">
  
    <BrowserRouter>
      <Routes>
        <Route exact path='/drop' element={<Imagedetection/>}/>
        <Route exact path='/Home' element={<ProtectedRoute><Home_Page/></ProtectedRoute>}/>  
        <Route exact path='/LogIn' element={<Login/>}/>
        <Route exact path='/SignUp' element={<Sign_Up_page/>}/>
        <Route exact path='/NotAuthorized' element={<NotAuthorized/>}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
      </BrowserRouter>
  </div>
  </>
)
}

export default App

