import React from 'react';

// Import components
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';
import SearchForm from './components/SearchForm';
import NotFound from './components/NotFound';
import Error from './components/Error';

// Import dependencies
import axios from 'axios';
import {
  BrowserRouter,
  Route,
  Switch
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
     this.performSearch();
   }

   // Fetching data with axios
   // Default query is set to sunsets
   performSearch = (query = 'sunsets') => {
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
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.performSearch} />
          <Nav onClick={this.performSearch} />
          <Switch>
            <Route path="/" render={() => (this.state.loading)
              ? <h3>LOADING...</h3>
              : <PhotoContainer photos={this.state.photos} query={this.state.query} />} />
            <Route path="/sunsets" component={NotFound} />
            <Route path="/waterfalls" />
            <Route path="/rainbows" />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
