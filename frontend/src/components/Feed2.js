import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./navbar";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Feed2 = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [tweet, setTweet] = useState([]);
  const [loading, setLoading] = useState(true);

  // helper: for very old docs without createdAt, derive time from ObjectId
  const objectIdToDate = (id) =>
    new Date(parseInt(id.substring(0, 8), 16) * 1000);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const { id: owner } = jwtDecode(token);

    const fetchTweets = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/gettweet",
          { owner }
        );
        setTweet(response.data); // backend already sorts
      } catch (error) {
        console.error("Error fetching tweets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTweets();
  }, [navigate]);

  const handleNewTweetSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const { id: owner } = jwtDecode(token);

    try {
      await axios.post("https://serverfortwitterclone-3.onrender.com/tweet", {
        owner,
        content,
      });
      setContent("");
      const response = await axios.post(
        "https://serverfortwitterclone-3.onrender.com/gettweet",
        { owner }
      );
      setTweet(response.data);
    } catch (error) {
      console.error("Error posting tweet:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex max-w-7xl mx-auto mt-4 px-4 gap-4">
        {/* Left sidebar */}
        <aside className="hidden md:flex flex-col gap-2 w-1/4 bg-white p-4 rounded-xl shadow-sm h-fit">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition">
            Home
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-full transition">
            Profile
          </button>
        </aside>

        {/* Center feed */}
        <main className="flex-1 bg-white rounded-xl shadow-sm p-4">
          {/* New Tweet */}
          <form onSubmit={handleNewTweetSubmit} className="mb-6">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="What's happening?"
              rows={3}
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-5 rounded-full transition"
              >
                Tweet
              </button>
            </div>
          </form>

          {/* Tweets List */}
          {loading ? (
            // Skeleton loader
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 animate-pulse border-b border-gray-200 py-4"
                >
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : tweet.length > 0 ? (
            tweet.map((t, index) => {
              const ownerObj =
                t && t.owner && typeof t.owner === "object" ? t.owner : null;
              const ownerId = ownerObj?._id || t.owner;
              const username = ownerObj?.username || "Unknown";
              const avatar =
                ownerObj?.profilePic || "https://via.placeholder.com/40x40";

              const date = t.createdAt
                ? new Date(t.createdAt)
                : objectIdToDate(t._id);

              return (
                <div
                  key={index}
                  className="border-b border-gray-200 py-4 hover:bg-gray-50 transition rounded-lg px-2 flex items-start gap-3"
                >
                  {/* Profile Picture */}
                  <img
                    src={avatar}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://via.placeholder.com/40x40")
                    }
                  />

                  <div>
                    <Link
                      to={`/userprofile/${ownerId}`}
                      className="text-sm font-semibold text-blue-500 hover:underline"
                    >
                      @{username}
                    </Link>
                    <p className="text-gray-800 mt-1">{t.content}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {date.toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500 mt-6">
              No tweets yet. Start posting!
            </p>
          )}
        </main>

        {/* Right suggestions */}
        <aside className="hidden lg:block w-1/4 bg-white rounded-xl shadow-sm p-4 h-fit">
          <h2 className="text-lg font-semibold mb-4">Suggestions</h2>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer transition">
              Suggested User 1
            </div>
            <div className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer transition">
              Suggested User 2
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Feed2;
