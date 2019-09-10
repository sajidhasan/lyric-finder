import React, { Component } from 'react';
import axios from 'axios'

const Context = React.createContext();

export class Provider extends Component {

    state = {
        track_list: [],
        heading: "Top 20 Tracks!"
    };
    //API key must not be exposed like this
    //here the API key is exposed for demo purpose, usually it stays within .env file and
    //imported from there
    componentDidMount(){
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=20&country=us&f_has_lyrics=1&apikey=556f9f6b05679ea61792248c6bad8ca2`)
            .then(res => {
                //console.log(res.data);
                this.setState({track_list: res.data.message.body.track_list});
            })
            .catch(err => console.log(err));
    }
    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;
