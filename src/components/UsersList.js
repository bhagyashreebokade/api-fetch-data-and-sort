import React, {Component} from "react";
import {connect} from "react-redux";

var usersData, currentSort;
currentSort = "DEF";
usersData = [];

class UsersList extends Component {
    constructor(props){
        super(props);
        this.state = {
            userList:[]
        }
    }

    componentDidMount(){
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(
            result => {
                console.log("result...",result);
                usersData = result;
                this.setState({userList:result});
            },
            error => {
                console.log("error...",error);
            }
        )
    }

    render(){
        currentSort = this.props.currentSort;
        console.log("sort op::",currentSort);
        return(
            <div>
                <button onClick={this.props.sortList}>{this.props.buttonText}</button>
                <table>
                    <tbody>
                        <tr>
                            <td>Id</td>
                            <td>Name</td>
                            <td>User Name</td>
                            <td>Phone</td>
                            <td>Email</td>
                        </tr>
                        
                        {this.state.userList && this.state.userList.length > 0 && this.state.userList.map((user) => {
                            return(
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.email}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>            
        );
    }
}

const mapispatchToProps = (dispatch) => {
    return {
        sortList : () => {
            console.log("curr : ",currentSort);
            switch(currentSort){
                case "ASC" : {
                    dispatch({
                        type:"SORT_DESC",
                        userList:usersData
                    });
                    break;
                }
                case "DESC" : {
                    dispatch({
                        type:"SORT_ASC",
                        userList:usersData
                    });
                    break;
                }
                default:{
                    dispatch({
                        type:"SORT_ASC",
                        userList:usersData
                    });
                }
            }
        }
    }
}

const mapStateToProps = state => {
    return {
        userList : state.userList,
        buttonText : state.buttonText,
        currentSort: state.currentSort
    }
}

export default connect(mapStateToProps,mapispatchToProps)(UsersList);
