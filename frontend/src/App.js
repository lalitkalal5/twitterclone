import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './components/Home';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Edit from './components/Edit';
import Search from './components/Search';
import Userprofile from './components/Userprofile';

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
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
