
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './navbar';
import { Link } from 'react-router-dom';

const Search = () => {
  const [searchquery, setSearchquery] = useState('');
  const [searchResults, setSearchResults] = useState({ result: [], result2: [] });

  useEffect(() => {
    if (!searchquery) {
      setSearchResults({ result: [], result2: [] });
      return;
    }

    const delayDebounce = setTimeout(async () => {
      const response = await axios.get(
        `https://serverfortwitterclone-3.onrender.com/search?search=${searchquery}`
      );
      setSearchResults(response.data);
    }, 300); // wait 300ms after typing stops

    return () => clearTimeout(delayDebounce);
  }, [searchquery]);

  return (
    <>
      {/* <NavBar /> */}
      <div className='m-3 flex flex-col items-center'>
        <h2>Search for a user 🔍</h2>
        <input
          type="text"
          placeholder="Type a username..."
          value={searchquery}
          onChange={(e) => setSearchquery(e.target.value)}
          className="border p-2 rounded w-64"
        />
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {searchResults.result.map(user => (
          <div key={user._id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center hover:shadow-xl transition">
            <img
              src={user.profilePic || "https://via.placeholder.com/150"}
              alt={`${user.username}'s profile`}
              className="w-24 h-24 rounded-full mb-3 border"
            />
            <Link to={`/userprofile/${user._id}`} className="text-blue-600 font-semibold hover:underline">
              {user.username}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Search;
