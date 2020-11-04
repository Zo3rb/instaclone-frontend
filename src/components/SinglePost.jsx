import React, { useState } from 'react';

import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SinglePost = props => {

    // Creating The Comment state for the Comment Form
    const [comment, setComment] = useState('');

    // Creating The Comment Form Submission Method
    const onFormSubmit = async e => {
        e.preventDefault();
        if (comment === "" || comment.length < 6) {
            alert("You Can't Pass an Empty Comment or Less than 6 Characters");
            return;
        }
        const commentData = { postId: props.post._id, comment }
        await axios.post('https://instaclonewong.herokuapp.com/api/posts/comment', commentData, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }); // TODO => change the API URL After Deploy
        window.location.reload();
    };

    // Creating Helper Method to Render Form to Add Comment => only if the user Authenticated
    const RENDER_COMMENT_FORM = () => {
        return (
            <form disabled={comment === '' || comment.length < 4} onSubmit={onFormSubmit}>
                <input
                    className="rounded w-100"
                    placeholder="Add a Comment ..."
                    type="text"
                    value={comment}
                    name="comment"
                    onChange={e => setComment(e.target.value)}
                />
            </form>
        )
    };

    // Creating State to indicate if The Post Liked by the Auth User or Not
    const [isLiked, setIsLiked] = useState(props.post.likes.includes(props.auth._id));
    let [postsLikes, setPostsLikes] = useState(props.post.likes.length);

    // Creating The Like Button Helper Method
    const LIKE_UNLIKE_POST = async () => {
        if (isLiked) {
            await axios.post('https://instaclonewong.herokuapp.com/api/posts/unlike', { postId: props.post._id }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setIsLiked(false);
            setPostsLikes(postsLikes -= 1);
            return;
        }
        await axios.post('https://instaclonewong.herokuapp.com/api/posts/like', { postId: props.post._id }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        setIsLiked(true);
        setPostsLikes(postsLikes += 1);
    };

    return (
        <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2">
            {
                props.auth._id === props.post.author._id
                    ? <Link to="/profile">
                        <h3 className="text-info font-weight-bold mt-1">{props.post.author.username}:</h3></Link>
                    : <Link to={`/user/${props.post.author._id}`}><h3 className="text-info font-weight-bold mt-1">{props.post.author.username}:</h3></Link>
            }
            <Card className="my-2">
                <CardImg top width="100%" src={props.post.photo} alt={props.post.title} />
                <CardBody>
                    <CardTitle className="font-weight-bold text-primary my-0" style={{ fontSize: "1.3em" }}>{props.post.title}</CardTitle>
                    <CardSubtitle className="text-muted my-0 mb-2">{new Date(props.post.createdAt).toLocaleDateString()}</CardSubtitle>
                    <CardText>{props.post.body}</CardText>
                    <button
                        className={isLiked ? 'btn mx-1 btn-danger' : 'btn mx-1 btn-outline-danger'} onClick={LIKE_UNLIKE_POST}
                    >
                        <i className="fas fa-heart"></i> {postsLikes} Likes
                    </button>
                    <button className="btn btn-outline-dark mx-1" disabled>
                        <i className="fas fa-comments"></i> {props.post.comments.length} Comments
                    </button>
                    <hr />
                    <div className="w-100">
                        {props.post.comments.map(comment => {
                            return (
                                <h6 className="text-primary" key={comment._id}>{comment.owner.username}: <span className="text-muted">{comment.comment}</span></h6>
                            )
                        })}
                    </div>
                    {props.auth && RENDER_COMMENT_FORM()}
                </CardBody>
            </Card>
        </div>
    );
}

export default SinglePost;
