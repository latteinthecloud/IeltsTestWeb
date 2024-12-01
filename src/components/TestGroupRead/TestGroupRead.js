import React, { useState } from "react";
import "../TestGroups/TestGroups.css";
import Pagination from "../Pagination/Pagination";

const testData = [
  {
    year: 2019,
    months: [
      { name: "January", testsTaken: 323 },
      { name: "February", testsTaken: 1235875 },
      { name: "March", testsTaken: 42 },
      { name: "April", testsTaken: 124 },
      { name: "May", testsTaken: 421 },
      { name: "June", testsTaken: 1235875 },
      { name: "July", testsTaken: 2312 },
      { name: "August", testsTaken: 1235875 },
      { name: "September", testsTaken: 4241 },
      { name: "October", testsTaken: 1231 },
      { name: "February", testsTaken: 42124 },
      { name: "March", testsTaken: 4124 },
    ],
  },
  {
    year: 2020,
    months: [
      { name: "January", testsTaken: 757 },
      { name: "February", testsTaken: 656 },
      { name: "March", testsTaken: 1235875 },
      { name: "April", testsTaken: 5335 },
      { name: "May", testsTaken: 1235875 },
      { name: "June", testsTaken: 242 },
      { name: "July", testsTaken: 124 },
      { name: "August", testsTaken: 33 },
      { name: "September", testsTaken: 877 },
      { name: "October", testsTaken: 7676 },
      { name: "February", testsTaken: 6565 },
      { name: "March", testsTaken: 223424 },
    ],
  },
  {
    year: 2021,
    months: [
      { name: "January", testsTaken: 1235875 },
      { name: "February", testsTaken: 2434252 },
      { name: "March", testsTaken: 1235875 },
      { name: "April", testsTaken: 1235875 },
      { name: "May", testsTaken: 234234 },
      { name: "June", testsTaken: 24342 },
      { name: "July", testsTaken: 42343 },
      { name: "August", testsTaken: 1235875 },
      { name: "September", testsTaken: 1235875 },
      { name: "October", testsTaken: 423 },
      { name: "February", testsTaken: 63 },
      { name: "March", testsTaken: 8786 },
    ],
  },
  {
    year: 2022,
    months: [
      { name: "January", testsTaken: 5325235 },
      { name: "February", testsTaken: 234243 },
      { name: "March", testsTaken: 1235875 },
      { name: "April", testsTaken: 23423 },
      { name: "May", testsTaken: 234342 },
      { name: "June", testsTaken: 1235875 },
      { name: "July", testsTaken: 535 },
      { name: "August", testsTaken: 4545223 },
      { name: "September", testsTaken: 243234 },
      { name: "October", testsTaken: 5235235 },
      { name: "February", testsTaken: 234243 },
      { name: "March", testsTaken: 535252 },
    ],
  },
  {
    year: 2023,
    months: [
      { name: "January", testsTaken: 2345 },
      { name: "February", testsTaken: 333232 },
      { name: "March", testsTaken: 1235875 },
      { name: "April", testsTaken: 1235875 },
      { name: "May", testsTaken: 1412 },
      { name: "June", testsTaken: 124 },
      { name: "July", testsTaken: 1235875 },
      { name: "August", testsTaken: 121 },
      { name: "September", testsTaken: 1235875 },
      { name: "October", testsTaken: 1235875 },
      { name: "February", testsTaken: 312 },
      { name: "March", testsTaken: 4242 },
    ],
  },
  {
    year: 2024,
    months: [
      { name: "January", testsTaken: 223 },
      { name: "February", testsTaken: 444 },
      { name: "March", testsTaken: 1235875 },
      { name: "April", testsTaken: 1235875 },
      { name: "May", testsTaken: 12312 },
      { name: "June", testsTaken: 1235875 },
      { name: "July", testsTaken: 1312 },
      { name: "August", testsTaken: 1235875 },
      { name: "September", testsTaken: 4242 },
      { name: "October", testsTaken: 123 },
      { name: "February", testsTaken: 12 },
      { name: "March", testsTaken: 2222 },
    ],
  },
];

const itemsPerPage = 3;

const TestGroupsRead = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchYear, setSearchYear] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const filteredData = testData.filter((group) =>
    group.year.toString().includes(searchYear)
  );

  const sortedData = filteredData.sort((a, b) =>
    sortOrder === "newest" ? b.year - a.year : a.year - b.year
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTestData = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    setSearchYear(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="test-groups">
      <div className="control">
      <div className="search-container">
      <i className="fas fa-magnifying-glass search-icon"></i>
        <input
          type="text"
          placeholder="Search by year... "
          value={searchYear}
          onChange={handleSearch}
          className="search-input-user"
        />
      </div>

        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="sort-select"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
  
      {currentTestData.map((group, index) => (
        <div key={index} className="test-group">
          <h3>IELTS Reading Mock Test {group.year}</h3>
          <div className="test-layout">
            <div className="cover">
              <div className="cover-placeholder">
                <p>Cover Placeholder</p>
              </div>
            </div>
            <div className="months">
              {group.months.map((month, idx) => (
                <div key={idx} className="month">
                  <p className="month-name">{month.name}</p>
                  <p className="tests-taken">
                    <i className="icon-lightning"></i>{" "}
                    {month.testsTaken.toLocaleString()} tests taken
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
  
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={sortedData.length}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
  
};

export default TestGroupsRead;
