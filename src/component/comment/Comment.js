import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Comment.css';

const Comment = ({ filmInfo, state }) => {
  const { currentUser } = useContext(AuthContext);
  const [comment, setComment] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (state) {
      setComment(state.comment);
    }
  }, []);

  const filmComment = {
    user: currentUser.displayName,
    filmTitle: filmInfo.title,
    filmPoster: filmInfo.poster_path,
    filmComment: comment,
    filmId: filmInfo.id.substring(1),
  };

  const URL = `https://mebarcode-91813-default-rtdb.europe-west1.firebasedatabase.app`;
  const handleSubmit = async () => {
    if (!state) {
      try {
        await axios.post(`${URL}/comment.json`, {
          ...filmComment,
        });
        navigate('/comments');
      } catch (error) {
        console.log(error);
      }
      setComment('');
    } else {
      try {
        await axios.put(`${URL}/comment/${state.localId}.json`, {
          ...filmComment,
        });
        navigate('/comments');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="comment">
      <Form>
        <Form.Group className="mt-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label className="commandTitle">
            You can write comment about film
          </Form.Label>
          <Form.Control
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="textField"
            as="textarea"
            rows={5}
          />
        </Form.Group>

        <Button onClick={handleSubmit} className="submitButton mt-3">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Comment;
