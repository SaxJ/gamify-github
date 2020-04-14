import React, { Component } from 'react';
import { Link } from 'gatsby';
import { withFirebase } from '../../../utils/Firebase';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import Loading from '../../atoms/Loading';
import Image from '../../atoms/Image';

class Home extends Component {
  _initFirebase = false;

  state = {
    posts: [],
    users: [],
    stats: [],
    loading: true,
    title: '',
    description: '',
  };

  firebaseInit = () => {
    if (this.props.firebase && !this._initFirebase) {
      this._initFirebase = true;

      this.getStats();
    }
  };

  componentDidMount() {
    this.firebaseInit();
  }

  componentDidUpdate() {
    this.firebaseInit();
  }

  getStats = () => {
    const { firebase } = this.props;
    firebase
      .stats()
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((item) => item.data());
        this.setState({
          stats: data,
          loading: false,
        });
      });
  };

  getUsers = () => {
    const { firebase } = this.props;
    firebase
      .users()
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((item) => item.data());
        this.setState({
          users: data,
          loading: false,
        });
      });
  };

  getPosts = () => {
    const { firebase } = this.props;

    firebase
      .posts()
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((item) => item.data());
        this.setState({
          posts: data,
          loading: false,
        });
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, posts } = this.state;
    const { firebase } = this.props;

    let slug =
      (title.match(/^[a-zA-Z0-9 ]*$/, '') &&
        title.match(/^[a-zA-Z0-9 ]*$/, '')[0]) ||
      '';

    const latestPost = {
      title,
      slug:
        slug.toLowerCase().split(' ').join('-') +
        Math.floor(Math.random() * 200) +
        1,
      description,
    };

    const newPosts = [latestPost, ...posts];

    this.setState({
      posts: newPosts,
      title: '',
      description: '',
    });

    firebase.posts().add({
      ...latestPost,
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { stats, description, title, loading } = this.state;

    if (loading) return <Loading />;

    return (
      <div className="home container">
        <div className="home__details">
          <h1 className="home__title">Home Page</h1>
          <p className="home__description">
            The Home Page is accessible by every signed in user.
          </p>
        </div>

        <div className="home__posts">
          <div className="home__posts__form">
            <div className="home__posts__form__title">Add Posts</div>
            <form onSubmit={this.handleSubmit}>
              <Input
                name="title"
                type="text"
                value={title}
                labelName="Title"
                onChange={this.handleChange}
                required
              />
              <Input
                name="description"
                type="text"
                value={description}
                labelName="Description"
                onChange={this.handleChange}
                required
              />

              <Button
                className="home__posts__form__btn"
                type="submit"
              />
            </form>
          </div>

          <div className="stats">
            {stats &&
              stats.length > 0 &&
              stats.map((stat) => <p>{stat.name}</p>)}
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(Home);
