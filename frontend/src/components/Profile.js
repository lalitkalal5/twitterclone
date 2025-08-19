import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import NavBar from "./navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [tweetdata, setTweetdata] = useState([]);
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const decodedToken = jwtDecode(token);
    setUserData(decodedToken);
    const userId = decodedToken.id;

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `https://serverfortwitterclone-3.onrender.com/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("this is loggedin user's profile ");
        setUserData((prevData) => ({ ...prevData, ...response.data }));
        setProfileImage(response.data.profilePic || "");
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchTweets = async () => {
      try {
        const response = await axios.post(
          "https://serverfortwitterclone-3.onrender.com/gettweet/forprofile",
          { owner: userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTweetdata(response.data.reverse());
        console.log(tweetdata)
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
    fetchTweets();
    console.log("Tweets fetched");
  }, [navigate]);

  if (loading) {
  // Show skeleton loader
  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 animate-pulse">
        <div className="text-center">
          <div className="h-8 w-40 bg-gray-300 mx-auto mb-4 rounded"></div>
          <div className="w-32 h-32 rounded-full mx-auto border-4 border-gray-200 bg-gray-300"></div>
          <div className="h-6 w-32 bg-gray-300 mx-auto mt-2 rounded"></div>
          <div className="h-4 w-48 bg-gray-300 mx-auto mt-1 rounded"></div>
        </div>
        <div className="flex justify-center gap-8 mt-6">
          <div className="h-4 w-20 bg-gray-300 rounded"></div>
          <div className="h-4 w-20 bg-gray-300 rounded"></div>
        </div>
        <div className="mt-8">
          <div className="h-6 w-32 bg-gray-300 mb-4 rounded"></div>
          <div className="space-y-4">
            <div className="h-20 bg-gray-300 rounded"></div>
            <div className="h-20 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
if (!userData) return null; // extra safeguard

return (
  <div className="bg-gray-100 min-h-screen">
    <NavBar />
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {userData.username}
        </h1>
        <img
          src={profileImage || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto border-4 border-gray-200"
        />
        <p className="text-lg text-gray-700 mt-2">{userData.name}</p>
        <p className="text-gray-500 mt-1">{userData.Bio}</p>
      </div>

      {/* Followers / Following */}
      <div className="flex justify-center gap-8 mt-6">
        <button className="text-blue-600 hover:underline font-medium">
          Followers: {userData.followers?.length || 0}
        </button>
        <button className="text-blue-600 hover:underline font-medium">
          Following: {userData.following?.length || 0}
        </button>
      </div>

      <div className="text-center mt-6">
        <Link to="/Editprofile">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200">
            Edit Profile
          </button>
        </Link>
      </div>

      {/* Tweets */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tweets</h2>
        {tweetdata.length > 0 ? (
          tweetdata.map((tweet, index) => (
            <div
              key={index}
              className="bg-white shadow-md border border-gray-200 rounded-lg p-4 mb-4 flex gap-3"
            >
              <img
                src={tweet.owner?.profilePic || "https://via.placeholder.com/40"}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-blue-500">
                  {tweet.owner?.username}
                </p>
                <p className="text-gray-800 text-lg mt-1">{tweet.content}</p>
                <p className="text-gray-500 text-sm mt-2">
                  {new Date(tweet.createdAt).toLocaleString()}
              </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No tweets to show.</p>
        )}
      </div>
    </div>
  </div>
);
}


export default Profile;
