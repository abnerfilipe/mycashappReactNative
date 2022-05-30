import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from "./pages/login/login.component";
import Register from "./pages/register/register.component";
import MainPage from "./pages/mainPage/mainPage.component";

const Stack = createNativeStackNavigator();

const Routes = (props) => {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode={"none"} initialRouteName={"Login"} >
          <Stack.Screen name="Login" options={{title: "Login"}}>
            {props => <Login {...props}/>}
          </Stack.Screen>
          <Stack.Screen name="Register" options={{title: "Criar Nova Conta"}}  component={ props =>  <Register {...props} /> } />
          <Stack.Screen name="MainPage" options={{title: "My Chash App"}}  component={props =>  <MainPage {...props}/> } />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }


export default Routes; 