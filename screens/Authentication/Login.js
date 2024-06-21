import { Linking, Text, View } from "react-native"
import { Button } from "react-native-paper";
import { HOST } from "../../config/config";


const Login = () => {
    
    const signInWithGoogle = () => {
        Linking.openURL(`${HOST}/accounts_try/`)
    }


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                mode="outlined"
                onPress={() => signInWithGoogle()}
            >
                SignIn With Google
            </Button>
        </View>
    )
}

export default Login;