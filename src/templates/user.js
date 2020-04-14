import React, { Component } from 'react';
import Layout from '../utils/layout';
import PostBase from '../components/scenes/Post/Post';
import { compose } from 'recompose';
import {
  withAuthorization,
  withEmailVerification,
} from '../utils/Session';

const condition = (authUser) => !!authUser;

const UserPage = compose(
  withEmailVerification,
  withAuthorization(condition),
)(PostBase);

export class User extends Component {
  render() {
    const {
      pageContext: { email },
    } = this.props;

    return (
      <Layout>
        <div>{email}</div>
      </Layout>
    );
  }
}

export default Post;
