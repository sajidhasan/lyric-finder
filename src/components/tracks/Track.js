import React from 'react'
import { Link } from 'react-router-dom';

export default function Track(props) {

    const { track } = props;
    return (
        <div className="col-md-6">
            <div className="card bg-light mb-4 shaddow-sm">
                <div className="card-header text-center">
                    <strong><i className="far fa-play-circle"></i></strong> {track.track_name }
                </div>
                <div className="card-body">
                    <p className="card-text">
                        <strong><i className="fas fa-play"></i> Track</strong>: {track.track_name }
                        <br />
                        <strong><i className="fas fa-compact-disc"></i> Album</strong>: {track.album_name }
                    </p>
                    <Link to={`lyrics/track/${track.track_id}`} className="btn btn-info btn-block"> 
                        <i className="fas fa-chevron-right"></i> View Lyrics
                    </Link>
                </div>
            </div>
        </div>
    )
}
