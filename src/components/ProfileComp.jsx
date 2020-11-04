import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { Table, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

const ProfileComp = props => {

    // Creating Posts State to fetch & its Helper Method
    const [myPosts, setMyPosts] = useState([]);
    const fetchMyPosts = async () => {
        const response = await axios.get('https://instaclonewong.herokuapp.com/api/posts/my-posts', {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        setMyPosts([...response.data.posts]);
    };

    useEffect(() => {
        // Fetching The Current User Posts Once Component Loaded (componentDidMount)
        fetchMyPosts();
    }, []);

    // Changing The Profile Picture
    const [profileImg, setProfileImg] = useState(undefined);
    const changeProfilePicture = async e => {
        try {
            e.preventDefault();
            // Sending The Picture to Img Cloud API
            const imgData = new FormData();
            imgData.append('file', profileImg);
            imgData.append('upload_preset', "instaclone");
            imgData.append('cloud_name', 'dqyayf3rf');
            const response = await axios.post(`https://api.cloudinary.com/v1_1/dqyayf3rf/upload`, imgData);

            // Submitting it to The Profile Picture
            await axios.post('https://instaclonewong.herokuapp.com/api/users/profile-image', {
                newImg: response.data.url
            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row py-2 text-center">
                <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2">
                    <img
                        className="img-thumbnail rounded-circle mt-2"
                        src={props.currentUser.image}
                        alt="Profile Page"
                        style={{ width: 250, height: 250 }}
                    />
                    <Form className="w-100 mx-auto my-2" onSubmit={changeProfilePicture}>
                        <Label className="font-weight-bold text-info">Change Profile Picture Below</Label>
                        <p className="text-danger small">This Feature Will Require Relogin</p>
                        <FormGroup>
                            <Input
                                type="file"
                                name="profileImg"
                                id="profileImg"
                                className="w-100"
                                onChange={e => setProfileImg(e.target.files[0])}
                            />
                            <Input type="submit" value="Change" className="btn btn-primary my-1" />
                        </FormGroup>
                    </Form>
                    <h4 className="text-primary my-0 mt-2">{props.currentUser.username}</h4>
                    <p className="text-muted">Joined: {new Date(props.currentUser.createdAt).toLocaleDateString()}</p>
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
                                <td>{myPosts.length}</td>
                                <td>{props.currentUser.following.length}</td>
                                <td>{props.currentUser.followers.length}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
            <hr />
            <div className="row py-2">
                {
                    myPosts.length > 0
                    && myPosts.map(post => {
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
    );
};

const mapStateToProps = state => {
    return {
        currentUser: state.auth.currentUser
    }
}

export default connect(mapStateToProps)(ProfileComp);
