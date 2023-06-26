import React, { useEffect, useState } from "react";
import RedditCard from "./RedditCard.js";
import he from "he";

export default function RedditPosts(props) {
  const [posts, setPosts] = useState([]);
  const femaleKeywords = ["looking for female roommate", "female preferred", "female roommate preferred", "female"];
  const smokingKeywords = ["not smoke", "no smoke", "no smoking", "non-smoking"];
  const [showNoPostsMessage, setShowNoPostsMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function convertTime(utcTimestamp) {
    const date = new Date(utcTimestamp * 1000);
    const formattedTime = date.toLocaleString(); // Adjust the formatting as desired
    return formattedTime;
  }

  useEffect(() => {
    const twoMonthsAgo = Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 60; // Two months in seconds
    const url = `https://www.reddit.com/r/UIUC/search.json?q=flair_name%3A%22Housing%22&restrict_sr=1&sort=new&t=month&limit=100`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const filteredPosts = data.data.children.filter((post) => {
          const createdTime = post.data.created_utc;
          const title = post.data.title.toLowerCase();
          const selftext = post.data.selftext.toLowerCase();

          if (props.gender === "female") {
            if (props.smokingPreference === "no-preference") {
              return (
                createdTime >= twoMonthsAgo &&
                props.keywords.some((keyword) =>
                  (title.includes(keyword) || selftext.includes(keyword)) && (title.includes("looking") || selftext.includes("looking"))
                ) &&
                femaleKeywords.some((keyword) =>
                  title.includes(keyword) || selftext.includes(keyword)
                ) 
              );
            } else if (props.smokingPreference === "non-smoking") {
              return (
                createdTime >= twoMonthsAgo &&
                props.keywords.some((keyword) =>
                  (title.includes(keyword) || selftext.includes(keyword)) && (title.includes("looking") || selftext.includes("looking"))
                ) &&
                femaleKeywords.some((keyword) =>
                  title.includes(keyword) || selftext.includes(keyword)
                ) &&
                smokingKeywords.some((keyword) =>
                  title.includes(keyword) || selftext.includes(keyword)
                )
              );
            }
          } else if (props.gender === "male") {
              if (props.smokingPreference === "no-preference") {
                return (
                  createdTime >= twoMonthsAgo &&
                  props.keywords.some((keyword) =>
                    (title.includes(keyword) || selftext.includes(keyword)) && (title.includes("looking") || selftext.includes("looking"))
                  ) &&
                  !femaleKeywords.some((keyword) =>
                    title.includes(keyword) || selftext.includes(keyword)
                  )
                );
            } else if (props.smokingPreference === "non-smoking") {
              return (
                createdTime >= twoMonthsAgo &&
                props.keywords.some((keyword) =>
                  (title.includes(keyword) || selftext.includes(keyword)) && (title.includes("looking") || selftext.includes("looking"))
                ) &&
                !femaleKeywords.some((keyword) =>
                  title.includes(keyword) || selftext.includes(keyword)
                ) &&
                smokingKeywords.some((keyword) =>
                  title.includes(keyword) || selftext.includes(keyword)
                )
              );
            }
          } else {
            return (
              createdTime >= twoMonthsAgo &&
              props.keywords.some((keyword) => (title.includes(keyword) || selftext.includes(keyword))) &&
              (title.includes("looking") || selftext.includes("looking"))
            );
          }
          
        });

        setPosts(
          filteredPosts.sort(
            (a, b) => b.data.created_utc - a.data.created_utc
          )
        );

        setIsLoading(false);

        // Delayed check for empty posts
        setTimeout(() => {
          if (posts.length === 0) {
            setShowNoPostsMessage(true);
          }
        }, 2000);
      })
      .catch((error) => console.log(error));
  }, [props.gender, props.keywords, props.smokingPreference]);

  function decodeHtml(html) {
    const decodedText = he.decode(html);
    return decodedText.replace(/&#x200B;/g, "");
  }

  return (
    <div className="cards">
      {isLoading ? (
        <h4>Loading...</h4>
      ) : (
        posts.map((post) => (
          <RedditCard
            title={decodeHtml(post.data.title)}
            selftext={decodeHtml(post.data.selftext)}
            time={convertTime(post.data.created_utc)}
            url={post.data.permalink}
          />
        ))
      )}
      {showNoPostsMessage  && posts.length === 0 && (
        <h4>
          We could not find anyone with those specific requirements in their posts.
          Instead, try adjusting your filters or messaging other Reddit users to see if they match your requirements.
        </h4>
      )}
    </div>
  );
}
