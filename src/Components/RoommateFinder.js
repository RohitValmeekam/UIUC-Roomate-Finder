import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RoommateFinder(props) {
  const navigate = useNavigate();
  const [submit,setSubmit] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.gender === "" || props.smokingPreference === "") {
      setSubmit(false) // Don't submit if either value is empty
    } else {
      setSubmit(true)
      navigate("/home");
    }
  };

  return (
    <div className="form">
      <h2>Roommate Finder</h2>
      <p>Answer these questions about your preferred roomate</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Gender:</label>
          <select
            value={props.gender}
            onChange={(e) => props.setGender(e.target.value)}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Smoking Preference:</label>
          <select
            value={props.smokingPreference}
            onChange={(e) => props.setSmokingPreference(e.target.value)}
          >
            <option value="">Select</option>
            <option value="no-preference">No Preference</option>
            <option value="non-smoking">Non-Smoking</option>
          </select>
        </div>
        <button type="submit">Submit</button>
        {!submit && <h4>Fill out all the questions before submitting</h4>}
      </form>
    </div>
  );
}
