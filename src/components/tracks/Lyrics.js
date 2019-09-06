import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';

export default class Lyrics extends Component {

    state = {
        track: {},
        lyrics : {}
    };

    componentDidMount() {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=556f9f6b05679ea61792248c6bad8ca2`)
            .then(res => {
            console.log(res.data);
            this.setState({lyrics: res.data.message.body.lyrics});

            return axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=556f9f6b05679ea61792248c6bad8ca2`)
        })
        .then(res => {
            console.log(res.data);
            this.setState({track: res.data.message.body.track});
        })
        .catch(err => console.log(err));
    }
    render() {
        const { track, lyrics } = this.state;
        if(track === undefined || 
        lyrics === undefined || 
        Object.keys(track).length === 0 || 
        Object.keys(track).length === 0)
        {
            return <Spinner />
        }
        else
        {
            return (
                <React.Fragment>
                    <Link to = "/" className = "btn btn-dark btn-sm mb-4">Back</Link>
                    <div className="card">
                        <div className="card-header">
                            <h1>{track.track_name} by <span className="text-secondary">{track.artist_name}</span></h1>  
                        </div>
                        <div className = "card-body">
                            <div className = "card-text">
                                {lyrics.lyrics_body}
                            </div>
                        </div>
                    </div>
                    <ul className = "list-group mt-5">
                            <li className="list-group-item">
                                <strong>Album</strong>: {track.album_name}
                            </li>
                            <li className="list-group-item">
                                <strong>Genre</strong>: {track.primary_genres.music_genre_list[0].music_genre.music_genre_name}
                            </li>
                            <li className="list-group-item">
                                <strong>Explicit Words</strong>: {track.explicit === 0 ? "No" : "Yes"}
                            </li>
                            <li className="list-group-item">
                                <strong>Release</strong>: {track.updated_time}
                            </li>
                        </ul>
                </React.Fragment>
            );
        }
    }
}
