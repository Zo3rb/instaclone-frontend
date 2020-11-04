import React, { Fragment } from 'react';

import { CreatePost } from '../components';

const PostPage = () => {
    return (
        <Fragment>
            <h1 className="h3 text-center text-primary mt-5">You Can Add New Post Here</h1>
            <p className="text-center text-muted text-secondary">No Client Side Validation to Demonstrate the Error Handling</p>
            <CreatePost />
        </Fragment>
    );
}

export default PostPage;
