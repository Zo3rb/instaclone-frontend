import React, { Fragment } from 'react';

import { HomeComp } from '../components';

const HomePage = () => {
    return (
        <Fragment>
            <h1 className="h text-center text-primary mt-5">INSTACLONE</h1>
            <hr />
            <HomeComp />
        </Fragment>
    );
}

export default HomePage;
