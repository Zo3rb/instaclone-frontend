import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { fetchPosts } from '../redux/actions';

import PostsList from './PostsList';

const HomeComp = props => {

    useEffect(() => {
        // Fetching All the App Posts Once componentDidMount
        props.fetchPosts();
    }, []);

    return (
        <div className="container-fluid">
            <PostsList posts={props.posts.reverse()} />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        posts: state.posts.posts
    }
}

export default connect(mapStateToProps, { fetchPosts })(HomeComp);
