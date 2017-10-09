import React from 'react'
import { Router, Actions, Scene } from 'react-native-router-flux'
import {LoginForm, EmployeeListList, EmployeeCreate} from './components'

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root" hideNavBar>
                <Scene key="auth">
                    <Scene key="login" component={LoginForm} title="Please Login" 
                    onRight={() => Actions.employeeList()} rightTitle="Test"/>
                </Scene>
                <Scene key="main">
                    <Scene 
                        key="employeeList" 
                        component={EmployeeListList} 
                        title="Employees"
                        rightTitle="Add"
                        onRight={() => Actions.employeeCreate()}
                    />
                    <Scene key="employeeCreate" component={EmployeeCreate} title="Employee Create"/>
                </Scene>
            </Scene>
        </Router>
    )
}

export { RouterComponent }