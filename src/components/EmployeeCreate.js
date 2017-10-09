import React from 'react';
import { connect } from 'react-redux';
import { employeeUpdate, employeeCreate, updateEmployeeSave } from '../actions';
import { Content, Text, Form, Item, Input, Label, Button, Spinner, Card, CardItem, Body, Picker, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

class EmployeeCreateView extends React.Component {
    constructor(){
        super();
        this.shiftUpdate = this.shiftUpdate.bind(this);

    }

    componentWillMount(){
        if(this.props.employee){
            Object.keys(this.props.employee.data).forEach(key => {
                 this.props.employeeUpdate({ prop: key, value: this.props.employee.data[key] });
            })
        }
    }

    shiftUpdate(value) {
        this.props.employeeUpdate({ prop: 'shift', value });
    }

    componentDidUpdate(){
        if(this.props.success){
            Actions.main();
        }
    }

    createEmployee(){
        const { name, phone, shift } = this.props;

        this.props.employeeCreate({ name, phone, shift });
    }
    editEmployee(){
        const { name, phone, shift } = this.props;
        this.props.updateEmployeeSave(this.props.employee.id, { name, phone, shift})
    }
    renderButton(){
        const { isStoring, employee } = this.props;
        return (!isStoring) ? 
                    (<Button full onPress={() => employee ? this.editEmployee() : this.createEmployee()}>
                        <Text>{ employee ? "Update" : "Create" } Employee</Text>
                    </Button>) : 
                    (<Spinner size="large" />);
    }

    renderError(){
        return this.props.error ? 
        (
            <Text style={{ color: 'red', justifyContent: 'center' }}>{this.props.error}</Text>
        ) : null;
    }

    render(){
        let { name, phone, shift } = this.props;

        shift = shift || "Monday";

        return (
            <Content>
                <Card>
                    <CardItem>
                        <Input 
                            label="Name"
                            placeholder="Jane"
                            value={name}
                            onChangeText={value => this.props.employeeUpdate({ prop: 'name', value })}
                        />
                       
                    </CardItem>
                </Card>
                <Card>
                    <CardItem>
                        <Input 
                            label="Phone"
                            placeholder="5555-5555"
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={value => this.props.employeeUpdate({ prop: 'phone', value })}
                        />
                    </CardItem>
                </Card>
                <Card>
                    <CardItem>
                        <Picker
                            placeholder="Select day"
                            mode="dropdown"
                            selectedValue={shift}
                            onValueChange={this.shiftUpdate}
                            iosHeader="Select day"
                        >
                            <Item label="Monday" value="Monday"/>
                            <Item label="Tuesday" value="Tuesday" />
                            <Item label="Wednesday" value="Wednesday" />
                            <Item label="Thursday" value="Thursday" />
                            <Item label="Friday" value="Friday" />
                            <Item label="Saturday" value="Saturday" />
                            <Item label="Sunday" value="Sunday" />
                        </Picker>
                    </CardItem>
                </Card>
                <Card>
                    {this.renderError()}
                    {this.renderButton()}
                </Card>
            </Content>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    const { name, phone, shift, isStoring, success, error, isLoading, id } = state.employeeForm;

    return { name, phone, shift, isStoring, success, error, isLoading, id };
}
const EmployeeCreate = connect(mapStateToProps, {employeeUpdate, employeeCreate, updateEmployeeSave})(EmployeeCreateView)
export { EmployeeCreate }