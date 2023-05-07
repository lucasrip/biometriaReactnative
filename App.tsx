import { StatusBar } from 'expo-status-bar';
import { useState , useEffect } from 'react';
import { Text, View , Button, Alert} from 'react-native';
import { styles } from './styles';
import * as LocalAuthentication from 'expo-local-authentication'

export default function App() {
  const [ isAuthnticated, setIsAuthenticated ] = useState(false);

  async function verifyAvaiableAuthetucation()
  {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    
    const showTypes = types.map(type => LocalAuthentication.AuthenticationType[type]);
    
    console.log(showTypes);
    
  }

   async function handleAuthentication()
   {
     const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
     console.log(isBiometricEnrolled);

     if(!isBiometricEnrolled)
     {
       return Alert.alert('Autenticacao', 'nenhuma biometrica encontrada')
       
     }     

     const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login com biometria',
      fallbackLabel: 'Biometria não reoconhecida',
     });

     setIsAuthenticated(auth.success)
   }


   useEffect(() => {
     
    verifyAvaiableAuthetucation();
   },[])

  return (
    <View style={styles.container}>
      <Text>
        usuario conectado:
        {isAuthnticated? 'SIM' : 'Não'}
      </Text>

      <Button 
       title='Entrar' 
       onPress={handleAuthentication}
       />
      <StatusBar style="auto" />
    </View>
  );
}

