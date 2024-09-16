import React, { useEffect, useState } from 'react'
import axios from 'axios';
import NavBar from './navbar';
import { Link, useNavigate} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
const Search = () => {
    const navigate = useNavigate();
    const [searchquery,setSearchquery] =useState('');
    const [searchResults,setSearchResults] =useState({result :[],result2:[]});

    const searchuserbyquery = async(e) => {
      e.preventDefault();
      // const resoponce = await axios.post('https://serverfortwitterclone-3.onrender.com/tweet',{newtweet});
      const response = await axios.post(`https://serverfortwitterclone-3.onrender.com/search?search=${searchquery}`);
      console.log(response.data);
      console.log("a")
      setSearchResults(response.data);
    }   
  return (
<>
<NavBar/>

<div className=' m-3 flex  flex-col items-center'>
            <h2>User Registration</h2>
            <form onSubmit={searchuserbyquery} >
                <input type="text" id="searchquery" name="searchquery" value={searchquery} onChange={(e)=>{setSearchquery(e.target.value)}} required /><br /><br />

                <button className ="bg-black text-white"  type="submit">Search</button>
            </form>
        </div>
        <div className="bg-sky-300 text-white ">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {searchResults.result.map(user => (
                            <div key={user._id} className="bg-white shadow-md rounded p-4 flex flex-col items-center">
                                <img 
                                    src={user.profilePic || "https://via.placeholder.com/150"}  // Assuming profilePictureUrl is the field for profile picture URL
                                    alt={`${user.username}'s profile`} 
                                    className="w-24 h-24 rounded-full mb-2"
                                />
                                <Link to={`/userprofile/${user._id}`} className="text-blue-500 hover:underline">
                                    {user.username}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            
  
</>
)}
export default Search
