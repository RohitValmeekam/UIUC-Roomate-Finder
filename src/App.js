import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./Components/Navbar.js";
import Posts from "./Components/RedditPosts.js";
import RoomateFinder from "./Components/RoommateFinder.js";
import Home from "./Components/Home.js"

function App() {
  const [gender,setGender] = useState("")
  const [smokingPreference,setSmokingPreference] = useState("")
  const [postFilter, setPostFilter] = useState("roommate");
  function toggleFilter(filter) {
    if (filter === "sublease") {
      setPostFilter("sublease");
    } else if (filter === "roommate") {
      setPostFilter("roommate");
    }
  }
  const subleaseKeywords = ["sublease", "sub-lease", "sub lease"];
  const roommateKeywords = ["looking for roomates","looking for roomate","looking for roommate","looking for roommates","roomates","roomate","roommates","roommate","room mates","room mate"];
  return (
    <Router>
      <Routes>
        <Route
          path="/posts"
          element={
            <div className="app">
              <Navbar toggleFilter={toggleFilter} gender={gender} setGender={setGender}  smokingPreference={smokingPreference} setSmokingPreference={setSmokingPreference} />
              {postFilter === "sublease" && (
                <Posts keywords={subleaseKeywords} gender={gender} setGender={setGender}  smokingPreference={smokingPreference} setSmokingPreference={setSmokingPreference}/>
              )}
              {postFilter === "roommate" && (
                <Posts keywords={roommateKeywords} gender={gender} setGender={setGender}  smokingPreference={smokingPreference} setSmokingPreference={setSmokingPreference}/>
              )}
            </div>
          }
        />
        <Route
          path="/form" 
          element={
            <RoomateFinder gender={gender} setGender={setGender} smokingPreference={smokingPreference} setSmokingPreference={setSmokingPreference}/>
          }
        />
        <Route 
          path= "/"
          element ={<Home/>}
        />
      </Routes>
    </Router>
  );
}

export default App;
