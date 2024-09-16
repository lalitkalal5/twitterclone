import jwt from "jsonwebtoken";

const SECRET_KEY = "nfnf"; 

const generatewebtoken = (user) => {
  const payload = {
    username: user.username,
    id: user._id,
    email: user.email,
    name: user.name,
    Bio: user.Bio,
    following: user.following,
    followers: user.followers,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  console.log("Generated token payload:", payload);
  return token;
};

const verifyToken = (token, callback) => {
  jwt.verify(token, SECRET_KEY, callback);
};

export { generatewebtoken, verifyToken };
