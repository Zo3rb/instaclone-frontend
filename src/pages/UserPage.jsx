import React, { useState, useEffect, Fragment } from 'react';

import axios from 'axios';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';

const UserPage = props => {

    // Creating User and it's Posts State & Helper Method to Fetch on load
    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);

    const fetchUser = async () => {
        const response = await axios.get(`http://localhost:5000/api/users/${props.match.params.userId}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        setUser(response.data.user);
        setUserPosts(response.data.userPosts);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const followUser = async () => {
        await axios.post(`http://localhost:5000/api/users/follow`, { followerId: props.match.params.userId }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        window.location.reload()
    };

    const unfollowUser = async () => {
        await axios.post(`http://localhost:5000/api/users/unfollow`, { followerId: props.match.params.userId }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        window.location.reload()
    };

    const LOADING_DATA = () => {
        return (
            <div className="container-fluid">
                <div className="row py-5 text-center">
                    <div className="col-sm-12">
                        <h1 className="h2">Loading, Please Wait</h1>
                    </div>
                </div>
            </div>
        );
    };

    console.log(user)

    const LOADED_DATA_AS_UI = () => {
        return (
            <div className="container-fluid">
                <div className="row py-2 text-center">
                    <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2">
                        <img
                            className="img-thumbnail rounded-circle mt-2"
                            src={user.image}
                            alt="Profile Page"
                            style={{ width: 250, height: 250 }}
                        />
                        <h4 className="text-primary my-0 mt-2">{user.username}</h4>
                        <p className="text-muted">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Posts</th>
                                    <th>Following</th>
                                    <th>Followers</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{userPosts.length}</td>
                                    <td>{user.following.length}</td>
                                    <td>{user.followers.length}</td>
                                </tr>
                            </tbody>
                        </Table>
                        {
                            user.followers.includes(props.currentUserId)
                                ? <button className="btn btn-primary btn-block" onClick={unfollowUser}>Un Follow</button>
                                : <button className="btn btn-dark btn-block" onClick={followUser}>Follow</button>
                        }
                    </div>
                </div>
                <hr />
                <div className="row py-2">
                    {
                        userPosts.length > 0
                        && userPosts.map(post => {
                            return (
                                <div
                                    className="col-sm-10 offset-sm-1 col-md-6 offset-md-0 col-lg-4 my-1 p-1"
                                    style={{ maxHeight: 500, maxWidth: 500 }}
                                    key={post._id}
                                >
                                    <img
                                        src={post.photo}
                                        alt="pic"
                                        style={{ height: '100%', width: '100%' }}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    };

    return (
        <Fragment>
            {
                user
                    ? LOADED_DATA_AS_UI()
                    : LOADING_DATA()
            }
        </Fragment>
    );
};

const mapStateToProps = state => {
    return {
        currentUserId: state.auth.currentUser._id
    }
}

export default connect(mapStateToProps)(UserPage);
