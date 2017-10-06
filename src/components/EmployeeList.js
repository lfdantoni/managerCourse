import React from 'react';
import { connect } from 'react-redux';
import { emailChanged } from '../actions';
import { Content, Text, Form, Item, Input, Label, Button, Spinner } from 'native-base';

class EmployeeListListView extends React.Component {
    render(){
        console.log(this.props.userName)
        return (
            <Text>Hola</Text>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userName: state.auth.user
    }
}

const EmployeeListList = connect()(EmployeeListListView)

export { EmployeeListList }