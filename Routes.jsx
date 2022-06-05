import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from "./pages/login/login.component";
import Register from "./pages/register/register.component";
import MainPage from "./pages/mainPage/mainPage.component";
import PaymentSend from "./pages/paymentSend/paymentSend.component";
import PaymentReceive from "./pages/paymentReceive/paymentReceive.component";
import Transactions from "./pages/transactions/transactions.component";
import EditTransaction from "./pages/transactions/edit/editTransaction.component";

const Stack = createNativeStackNavigator();

const Routes = (props) => {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode={"none"} initialRouteName={"MainPage"} >
          <Stack.Screen name="Login" options={{title: "Login"}} component={Login} />
          <Stack.Screen name="Register" options={{title: "Criar Nova Conta"}} component={Register}/>
          <Stack.Screen name="MainPage" options={{title: "My Chash App"}} component={MainPage} />
          <Stack.Screen name="EnviarPagamento" options={{title: "Enviar Pagamento"}} component={PaymentSend} />
          <Stack.Screen name="ReceberPagamento" options={{title: "Receber Pagamento"}} component={PaymentReceive} />
          <Stack.Screen name="Transacoes" options={{title: "Transações"}} component={Transactions} />
          <Stack.Screen name="EditTransaction" options={{title: "Editar Transaçāo"}} component={ EditTransaction } />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }


export default Routes; 