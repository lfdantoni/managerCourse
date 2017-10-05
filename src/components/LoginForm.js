import React from 'react';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Content, Text, Form, Item, Input, Label, Button } from 'native-base';

class LoginFormView extends React.Component{
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

    render(){
        return (
            <Content style={styles.wrapper}>
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
                    <Item style={styles.itemButton}>
                        <Content>
                            <Button full onPress={() => this.login()}>
                                <Text>Login</Text>
                            </Button>
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
    },
    wrapper: {
        marginTop: 20
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.auth.email,
        password: state.auth.password
    }
}

const LoginForm = connect(mapStateToProps, { emailChanged, passwordChanged, loginUser } )(LoginFormView);

export {LoginForm} 