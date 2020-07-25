import React, {Component} from 'react';
import './App.css';
import Table from './components/mainTable';
import Spinner from 'react-bootstrap/Spinner'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    };

    componentDidMount() 
    {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let searchQuery = params.get('search');
        let sortQuery = params.get('sort');
        var apiURL = "https://api.snowy.pro/cstat/";

        if (!searchQuery && !sortQuery) {
            apiURL = apiURL + "all";
        } else if (searchQuery) {
            apiURL = apiURL + "?search=" + searchQuery;
        } else if (sortQuery) {
            apiURL = apiURL + "?sort=" + sortQuery;
        }

        fetch(apiURL, {
            method: 'GET'
        })
        .then(res => {
            if (res.status === 204) throw new Error("No results found!");
            else return res.json()})
        .then((result) => {
            this.setState({
                isLoaded: true,
                items: result
            });
        },
        
        (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        }
        )
    }

    render() {
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <div className="error-div">Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (
                <Spinner animation="border" role="status" variant="info" className="loading-animation">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            )
            // <div style={{color: 'white'}}>Loading...</div>
        } else {
            return (
                <div className="react-main">
                    <Table data={items} />
                </div>
            );
        }
    }
}

export default App;
