import React from 'react';

import { connect } from 'react-redux';

import SinglePost from './SinglePost';

const PostsList = props => {

    // Creating Helper Method for Zero Posts
    const NO_POSTS = () => {
        return (
            <div className="col-sm-10 offset-sm-1 text-center text-primary">
                <h1 className="h3 mt-5">No Posts or Loading Yet</h1>
                <p className="text-muted text-small">Please Get Sure Your Network Connection Works Fine</p>
            </div>
        );
    };

    // Creating Helper Method for Rendering Posts After Receiving from Posts List Component
    const RENDER_POSTS = () => {
        return (
            <div className="row py-2">
                {props.posts.map(post => <SinglePost key={post._id} post={post} auth={props.auth} />)}
            </div>
        );
    };

    return (
        <div className="row py-2">
            {props.posts.length === 0 ? NO_POSTS() : RENDER_POSTS()}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        auth: state.auth.currentUser
    }
}

export default connect(mapStateToProps)(PostsList);
