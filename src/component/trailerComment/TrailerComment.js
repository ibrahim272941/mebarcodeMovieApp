import React from 'react';
import { Table } from 'react-bootstrap';
import './TrailerComment.css';

const TrailerComment = ({ comment }) => {
  return (
    <Table className="tableTrailer">
      <thead>
        <tr className="commentTable">
          {/* <th>Movie Poster</th>
          <th>Movie Title</th> */}
          <th>User</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>
        {comment ? (
          Object.keys(comment)?.map((item, i) => (
            <tr key={i} className="commentTable">
              {/* <td>
                <img
                  className="commentImg"
                  src={`${IMG_API}${comment[item].filmPoster}`}
                  alt=""
                />
              </td>
              <td>{comment[item].filmTitle}</td> */}
              <td>{comment[item].user}</td>
              <td className="commentRow">
                <p>{comment[item].filmComment}</p>
              </td>
            </tr>
          ))
        ) : (
          <p>No comments to display</p>
        )}
      </tbody>
    </Table>
  );
};

export default TrailerComment;
