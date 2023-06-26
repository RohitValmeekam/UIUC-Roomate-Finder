import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const navigate = useNavigate();
  const handleFilterToggle = (event) => {
    const filter = event.target.value;
    props.toggleFilter(filter);
  };
  const handleFinderClick = () => {
    navigate("/form");
  }
  const handleClearClick = () => {
    props.setGender("")
    props.setSmokingPreference("")
  }

  return (
    <div className="navbar">
      <h1>UIUC Housing Marketplace</h1>
      <div className="dropdown">
        <select onChange={handleFilterToggle}>
          <option value="roommate">Roommates</option>
          <option value="sublease">Subleases</option>
        </select>
      </div>
      <button onClick={handleFinderClick}>Roommate Finder</button>
      <button onClick={handleClearClick}>Clear Additional Filters</button>
    </div>
  );
}
