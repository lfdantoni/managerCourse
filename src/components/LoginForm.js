import React from 'react';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Content, Text, Form, Item, Input, Label, Button, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';

class LoginFormView extends React.Component{
    componentDidUpdate(){
        if(this.props.user){
            Actions.main();
        }
    }
    login(){
        const { email, password } = this.props;
        this.props.loginUser({email, password});
    }
    changeUserName(text){
        this.props.emailChanged(text);
    }

    changePasswordName(text){
        this.props.passwordChanged(text);
    }

    renderSpinnerOrButton(){
        return this.props.isLoading ?
            <Spinner size="large"/> : 
            (<Button full onPress={() => this.login()}>
                <Text>Login</Text>
            </Button>);        
    }
    render(){
        return (
            <Content>
                <Form>
                    <Item floatingLabel>
                        <Label>Username</Label>
                        <Input onChangeText={this.changeUserName.bind(this)} autoCapitalize={'none'}
                            value={this.props.email}/>
                    </Item>
                    <Item floatingLabel last>
                        <Label>Password</Label>
                        <Input secureTextEntry
                            onChangeText={this.changePasswordName.bind(this)} 
                            value={this.props.password}/>
                    </Item>
                    <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>{this.props.error}</Text>
                    <Item style={styles.itemButton}>
                        <Content>
                            {this.renderSpinnerOrButton()}
                        </Content>
                    </Item>
                </Form>
            </Content>
        )
    }
}

const styles = {
    itemButton: {
        borderBottomWidth: 0, 
        marginTop: 30, 
        marginLeft: 0
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        isLoading: state.auth.isLoading,
        user: state.auth.user
    }
}

const LoginForm = connect(mapStateToProps, { emailChanged, passwordChanged, loginUser } )(LoginFormView);

export {LoginForm} 