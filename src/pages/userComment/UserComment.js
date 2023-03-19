import { Icon } from '@iconify/react';
import { useContext, useEffect, useState } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { deleteComment, getComment } from '../../crud/Crud';
import './UserComment.css';
// const URL = `https://mebarcode-91813-default-rtdb.europe-west1.firebasedatabase.app`;
const IMG_API = 'https://image.tmdb.org/t/p/original';
const UserComment = () => {
  const [comment, setComment] = useState();
  const [count, setCount] = useState(true);
  const {
    currentUser: { displayName },
  } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    getComment(setComment);
    setTimeout(() => {
      setCount(false);
    }, 2000);
  }, [count]);

  // const getComment = async () => {
  //   const { data } = await axios.get(`${URL}/comment.json`);
  //   setComment(data);
  // };
  const handleDelete = async (id) => {
    deleteComment(id);
    setCount(true);
  };
  const handleEdit = (id, comment, localId) => {
    navigate(`/details:${id}`, { state: { comment, localId } });
    console.log(localId);
  };
  const handleDetails = (commentId) => {
    navigate(`/details:${commentId}`);
  };
  return (
    <>
      {count ? (
        <div className="text-center">
          <Spinner
            style={{
              width: '10rem',
              height: '10rem',
              marginTop: '10rem',
              alignItems: 'center',
            }}
            animation="border"
            variant="warning"
            size="lg"
          />
        </div>
      ) : (
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
                      onClick={() => handleDetails(comment[item].filmId)}
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
                      <>
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
                            <Icon icon="wpf:edit" width="40%" />
                          </button>
                          <button
                            onClick={() => handleDelete(item)}
                            className="delete"
                          >
                            <Icon icon="wpf:delete" width="50%" />
                          </button>
                        </div>
                      </>
                    ) : null}
                  </td>
                </tr>
              ))
            ) : (
              <p>No comments to display</p>
            )}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserComment;
