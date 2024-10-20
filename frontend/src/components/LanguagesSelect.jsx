import React from "react";
import data from "../assets/data.json";

const LanguagesSelect = () => {
  return (
    <>
      {Object.keys(data.languages).map((key) => (
        <option
          key={key}
          value={key}
          style={{ backgroundColor: "#1E1E1E", color: "#EAEAEA" }}
        >
          {data.languages[key]}
        </option>
      ))}
    </>
  );
};

export default LanguagesSelect;
