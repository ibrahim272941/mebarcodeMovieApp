import { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { editComment, postComment } from '../../crud/Crud';
import './Comment.css';

const Comment = ({ filmInfo, state }) => {
  const { currentUser } = useContext(AuthContext);
  const [comment, setComment] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    if (state) {
      setComment(state.comment);
    }
  }, [state]);

  const filmComment = {
    user: currentUser.displayName,
    filmTitle: filmInfo.title,
    filmPoster: filmInfo.poster_path,
    filmComment: comment,
    filmId: filmInfo.id,
  };
  const handleSubmit = async () => {
    if (!state) {
      postComment(filmComment);
      setComment('');
      navigate('/comments');
    } else {
      editComment(filmComment, state);
      navigate('/comments');
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
            rows={3}
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
