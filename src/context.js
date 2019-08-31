import React, { Component } from 'react';
import axios from 'axios'

const Context = React.createContext();

export class Provider extends Component {

    state = {
        track_list: [],
        heading: "Top tracks!"
    };

    componentDidMount(){
        axios.get(``)
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
