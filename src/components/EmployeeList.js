import React from 'react';
import { connect } from 'react-redux';
import { employeesFetch, employeeEdit } from '../actions';
import { Container, Content, Text, Form, Item, Input, Label, Button, Spinner, ListItem, List} from 'native-base';
import { Actions } from 'react-native-router-flux';

class EmployeeListListView extends React.Component {
    componentWillMount(){
        this.props.employeesFetch();
    }

    editEmployee(employee){
        this.props.employeeEdit();
        Actions.employeeCreate({employee});
    }

    renderEmployees(){
        return this.props.employees ? Object.keys(this.props.employees)
            .map((key) => {
                const employee = {id: key, data: this.props.employees[key]};
                return (
                    <ListItem style={{flex:1}} onPress={() => this.editEmployee(employee)} key={key}>
                        <Text style={{flex:1}} >{employee.data.name}</Text>
                    </ListItem>
                )
        }) :  <ListItem style={{flex:1}}><Text>Not found employees</Text></ListItem>
    }

    renderLoading(){
        return this.props.isLoading ?
            <Spinner size="large" /> : null;
    }
    render(){
        console.log(this.props)
        return  (
            <Container>
            <Content>
            <List>
                {this.renderEmployees()}
                {this.renderLoading()}
            </List>
            </Content>
            </Container>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userName: state.auth.user,
        employees: state.employeeForm.employees,
        isLoading: state.employeeForm.isLoading
    }
}

const EmployeeListList = connect(mapStateToProps, {employeesFetch, employeeEdit} )(EmployeeListListView)

export { EmployeeListList }