import React from "react";

export default function RedditCard(props) {
    function handleClick() {
        const redditURL = `https://www.reddit.com${props.url}`;
        window.open(redditURL, "_blank");
      }

  return (
    <div className="card" onClick={handleClick}>
      <img src="./images/reddit.png" alt="reddit-logo"></img>
      <h5>{props.title}</h5>
      <h7>{props.time}</h7>
    </div>
  );
}
