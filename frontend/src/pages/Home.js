import React, { useEffect, useState } from "react";
import SubmitReport from "./SubmitReport";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [data, setData] = useState([]);
  const fetchData = () => {};

  return (
    <>
      <SearchBar />
      {data.map((report) => {
        return (
          <div>
            <h1>RECENT SCAMS</h1>
            <div>
              <strong>Scammer number:</strong>
              {report.number}
            </div>
            <div>
              <strong>Scammer website:</strong>
              {report.website}
            </div>
            <div>
              <strong>Victim story:</strong>
              {report.story}
            </div>
          </div>
        );
      })}
      <SubmitReport />
    </>
  );
}
