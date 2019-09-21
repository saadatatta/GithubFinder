import React, { Component } from 'react'
import Spinner from '../layouts/Spinner';

export class User extends Component {

    componentDidMount(){
        this.props.getUser(this.props.match.params.username)
    }

    render() {
        const {login,avatar_url,html_url} = this.props.user;
        if (this.props.loading) 
            return <Spinner></Spinner>
        else
            return (
                <div>
                    <h1>{login}</h1>
                </div>
            )
    }
}

export default User
