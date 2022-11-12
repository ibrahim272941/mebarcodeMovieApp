import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './UserComment.css';
const URL = `https://mebarcode-91813-default-rtdb.europe-west1.firebasedatabase.app`;
const IMG_API = 'https://image.tmdb.org/t/p/original';
const UserComment = () => {
  const [comment, setComment] = useState();
  const {
    currentUser: { displayName },
  } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    getComment();
  }, []);

  const getComment = async () => {
    const { data } = await axios.get(`${URL}/comment.json`);
    setComment(data);
  };
  const handleDelete = async (id) => {
    await axios.delete(`${URL}/comment/${id}.json`);
    getComment();
  };
  const handleEdit = (id, comment, localId) => {
    navigate(`/details:${id}`, { state: { comment, localId } });
  };
  return (
    <Table>
      <thead>
        <tr className="commentTable">
          <th>Movie Poster</th>
          <th>Movie Title</th>
          <th>User</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>
        {comment ? (
          Object.keys(comment)?.map((item, i) => (
            <tr key={i} className="commentTable">
              <td>
                <img
                  className="commentImg"
                  src={`${IMG_API}${comment[item].filmPoster}`}
                  alt=""
                />
              </td>
              <td>{comment[item].filmTitle}</td>
              <td>{comment[item].user}</td>
              <td className="commentRow">
                <p>{comment[item].filmComment}</p>

                {comment[item].user === displayName ? (
                  <div className="buttonGroupEdit">
                    <button
                      onClick={() =>
                        handleEdit(
                          comment[item].filmId,
                          comment[item].filmComment,
                          item
                        )
                      }
                      className="edit"
                    >
                      {/* <Link to={`/details:${comment[item].filmId}`}>Edit</Link> */}
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="delete"
                    >
                      Delete
                    </button>
                  </div>
                ) : null}
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

export default UserComment;
