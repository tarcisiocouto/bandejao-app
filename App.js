import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './src/screens/LoginScreen';
import MainScreen from './src/screens/MainScreen';
import ExtratoScreen from './src/screens/ExtratoScreen';
import CartaoScreen from './src/screens/CartaoScreen';

const navigator = createStackNavigator({
  Login: LoginScreen,
  Main: MainScreen,
  Extrato: ExtratoScreen,
  Cartao: CartaoScreen
}, {
  initialRouteName: 'Login',
  defaultNavigationOptions: {
    header: null
  }
});

export default createAppContainer(navigator);