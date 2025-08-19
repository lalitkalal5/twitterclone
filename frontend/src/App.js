import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './components/Home';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Edit from './components/Edit';
import Search from './components/Search';
import Userprofile from './components/Userprofile';
import Login2 from './components/Login2';
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
      <BrowserRouter>
      <Routes>
       <Route path='/' element={<Login2/>} />
       <Route path='/register' element={<RegistrationForm />} />
       <Route path='/feed' element={<Feed />} />
       <Route path='/profile' element={<Profile />} />
       <Route path='/userprofile/:userId' element={<Userprofile />} />
       <Route path='/Editprofile' element={<Edit />} />
       <Route path='/search' element={<Search />} />

      
      </Routes>
      </BrowserRouter>
    );
  }

export default App;
