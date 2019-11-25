import React from 'react';

// Import components
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';
import SearchForm from './components/SearchForm';
import Error from './components/Error';

// Import dependencies
import axios from 'axios';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import apiKey from './config';

// Import styles
import './App.css';
import './index.css';

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      photos:[],
      query:'',
      // Conditional rendering is used to add a loading indicator
      // Set it true by default
      loading: true
    };
  }

  componentDidMount () {
    const pathname = window.location.pathname;
    if (pathname.includes('/search')) {
      this.performSearch(pathname.slice(8));
    } else {
      this.performSearch();
    }
  }

  // Fetching data with axios
  // Default query is set to sunsets
  performSearch = (query = 'sunsets') => {
    this.setState({ loading: true });
    // Template literal is used to embed the value of query into the url using interpolation
    // Limiting the search results to 24
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        photos: response.data.photos.photo,
        loading: false,
        query: query
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
   }

  render() {
    const { loading, photos, query } = this.state;
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.performSearch} />
          <Nav onClick={this.performSearch} />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/sunsets" />} />
            <Route path="/sunsets" render={() => (loading)
              ? <h3>LOADING...</h3>
              : <PhotoContainer photos={photos} query={query} />}
            />
            <Route path="/waterfalls" render={() => (loading)
              ? <h3>LOADING...</h3>
              : <PhotoContainer photos={photos} query={query} />}
            />
            <Route path="/rainbows" render={() => (loading)
              ? <h3>LOADING...</h3>
              : <PhotoContainer photos={photos} query={query} />}
            />
            <Route path="/search/:key" render={() =>
              <PhotoContainer photos={photos} query={query} />}
            />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
