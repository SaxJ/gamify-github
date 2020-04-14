import React, { Component } from 'react';
import { withFirebase } from '../../../utils/Firebase';
import Loading from '../../atoms/Loading';
import { MedalSection } from './MedalSection';

class Home extends Component {
  _initFirebase = false;

  state = {
    posts: [],
    users: [],
    medals: [],
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
          medals: data,
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
    const { medals, loading } = this.state;

    if (loading) return <Loading />;

    return (
      <div className="home container">
        <div className="home__details">
          <h1 className="home__title">Medal Tally</h1>
        </div>

        <div className="medals">
          {medals &&
            medals.length > 0 &&
            medals.map((medal) => <MedalSection stats={medal} />)}
        </div>
      </div>
    );
  }
}

export default withFirebase(Home);
