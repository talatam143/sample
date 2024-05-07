import React from "react";


//Animated loading component for books component
const LoadingPage = () => {
  return (
    <table className="books-table">
      <thead className="books-table-header">
        <tr>
          <th className="books-table-sno-th">S.No</th>
          <th>Cover</th>
          <th>Author</th>
          <th>Biography</th>
          <th>Title</th>
          <th>Reading time</th>
          <th>Publication date</th>
        </tr>
      </thead>
      <tbody className="books-table-body" style={{ background: "#FFFFFF" }}>
        {[0, 1, 2, 3, 4, 5, 6].map((eachItem) => (
          <tr key={eachItem}>
            {[0, 1, 2, 3, 4, 5, 6].map((eachData) => (
              <td key={eachData}>
                <div className="loading-div"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LoadingPage;
