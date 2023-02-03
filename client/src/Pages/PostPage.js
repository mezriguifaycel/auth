import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { AddPost, getAllPosts } from "../Redux/PostSlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const PostPage = () => {
  const user = useSelector((state) => state.User.user);

  const [newPost, setNewPost] = useState({});
  const [image, setImage] = useState("");
  const HandleChangePost = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };
  const HandleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const posts = useSelector((state) => state.Post.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts());

  }, []);

  const AddingPost = (e) => {
    e.preventDefault();
    const formDataPost = new FormData();
    formDataPost.append("title", newPost.title);
    formDataPost.append("Des", newPost.Des);
    formDataPost.append("Img", image);
    dispatch(AddPost(formDataPost));
    handleClose();
  };
  return (
    <div>
      {/* Add Post */}

      {user?.Role == "admin" && (
        <>
          <Button variant="primary" onClick={handleShow}>
            Add a Post
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add a Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Control
                onChange={HandleChangePost}
                name="title"
                type="text"
                placeholder="Enter title"
              />
              <Form.Control
                onChange={HandleChangePost}
                name="Des"
                type="text"
                placeholder="Enter Description"
              />
              <input
                onChange={HandleChangeImage}
                name="Img"
                type="file"
                accept="image/*"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={AddingPost}>
                Add Post
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
      {/* getAll Posts */}
      <Row xs={1} md={2} className="g-4">
        {posts?.map((el, i) => (
          <Col key={i}>
            <Card>
              <Card.Img
                style={{ width: "50%" }}
                variant="top"
                src={el.Img.imgUrl}
              />
              <Card.Body>
                <Card.Title>{el.title}</Card.Title>
                <Card.Text>{el.Des}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PostPage;
