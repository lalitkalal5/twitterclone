import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode }from "jwt-decode";
import { useNavigate } from "react-router-dom";
import NavBar from "./navbar";
import { Link } from "react-router-dom";

const Userprofile = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // Extract userId from URL
  const [user, setUser] = useState(null);
  const [tweetdata, setTweetdata] = useState([]);
  const [profileImage, setProfileImage] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("this is doosra's profile ");
        setUser((prevData) => ({ ...prevData, ...response.data }));
        console.log(response.data)
        setProfileImage(response.data.profilePic || "");

        const decodedToken = jwtDecode(token);
        const loggedinuser = decodedToken.id;
        setIsFollowing(response.data.followers.includes(loggedinuser));
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchTweets = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/gettweet/forprofile",
          { owner: userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTweetdata(response.data.reverse());
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    };

    fetchUserProfile();
    fetchTweets();
  }, [userId, navigate]);

  const followuserfromprofile = async () => {
    const token2 = localStorage.getItem("token");
    const decodedToken = jwtDecode(token2);
    const loggedinuser = decodedToken.id;

    try {
      const response = await axios.post(
        "http://localhost:3001/followuser",
        {
          loggedinuser: loggedinuser,
          beingfolloweduser: userId,
        },
        { headers: { Authorization: `Bearer ${token2}` } }
      );
      console.log(response.data);
      setIsFollowing(true); // Update the state to reflect the new follow status
    } catch (error) {
      console.error("Error following user:", error);
    }
  }

  if (!user) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {user.username}
          </h1>
          <img
            src={profileImage || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto border-4 border-gray-200"
          />
          <p className="text-lg text-gray-700 mt-2">{user.name}</p>
          <p className="text-gray-500 mt-1">{user.Bio}</p>
        </div>
        <div className="bg-sky-600 text-black text-center">
          <button>Followers: {user.followers.length}</button>
          <button>Following: {user.following.length}</button>
        </div>
        <div>
          <button onClick={followuserfromprofile}>
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tweets</h2>
          {tweetdata.length > 0 ? (
            tweetdata.map((tweet, index) => (
              <div
                key={index}
                className="bg-white shadow-md border border-gray-200 rounded-lg p-4 mb-4"
              >
                <p className="text-gray-800 text-lg">{tweet.content}</p>
                <p className="text-gray-500 text-sm mt-2">
                  Posted at: {tweet.timestamp}
                </p>
                <Link
                  to={`/userprofile/${tweet.owner}`}
                  className="text-blue-500 hover:underline mt-1 block"
                >
                  Posted by: {tweet.owner}
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No tweets to show.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
