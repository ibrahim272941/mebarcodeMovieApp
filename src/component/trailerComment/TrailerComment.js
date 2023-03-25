import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './TrailerComment.css';

const URL = `https://mebarcode-91813-default-rtdb.europe-west1.firebasedatabase.app`;
const TrailerComment = () => {
  const [comment, setComment] = useState();
  const { id } = useParams();
  useEffect(() => {
    getComment();
  }, [id]);

  const getComment = async () => {
    const { data } = await axios.get(`${URL}/comment.json`);
    setComment(data);
  };
  const filmComment = comment
    ? Object.values(comment)?.filter((e) => e.filmId == id.substring(1))
    : null;

  return (
    <>
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
          {filmComment ? (
            Object.values(filmComment)?.map((item, i) => (
              <tr key={i} className="commentTable">
                {/* <td>
                  <img
                    className="commentImg"
                    src={`${IMG_API}${item.filmPoster}`}
                    alt=""
                  />
                </td> */}
                {/* <td>{item.filmTitle}</td> */}
                <td>
                  <p className="commentUser"> {item.user}</p>{' '}
                </td>
                <td className="commentRow">
                  <p>{item.filmComment}</p>
                </td>
              </tr>
            ))
          ) : (
            <p>No comments to display</p>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default TrailerComment;
