import "./style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((response) => {
        setLoading(false);
        setPost(response.data);
        setError("");
      })
      .catch(() => {
        setLoading(false);
        setPost([]);
        setError("Something went wrong");
      });
  }, []);

  return (
    <div className="App">
      <input
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search..."
      />
      {loading
        ? "Loading..."
        : post
            .filter((val) => {
              if (search === "") {
                return val;
              } else if (
                val.email.toLowerCase().includes(search.toLowerCase())
              ) {
                return val;
              }
            })
            .map((post, index) => {
              return <p key={index}>{post.email}</p>;
            })}
      {error ? error : null}
    </div>
  );
}

export default App;
