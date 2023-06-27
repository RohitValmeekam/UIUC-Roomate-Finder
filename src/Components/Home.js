import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/posts");
  }

  return (
    <div className="home-container">
      <div className="content">
        <h1>UIUC Marketplace</h1>
        <p>Roommate and Sublease Browser</p>
        <p>
          Browses the <a href="https://www.reddit.com/r/UIUC/" target="_blank">r/UIUC</a>{" "}
          subreddit to find Roommate and Sublease Posts
        </p>
        <button onClick={handleClick}>Get Started</button>
      </div>
    </div>
  );
}
