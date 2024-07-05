import { Alert, KeyboardAvoidingView, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Button, Card, Provider, TextInput as PaperTextInput } from "react-native-paper";
import { HOST } from "../../config/config";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { GoogleLogo } from "../../utilities/HeaderButtons";
import { loginUser } from "./authNetworkCalls";
import { fillLoginDetails, setLoginStatus, setToken, setUserEmail, setUserId, setUsername } from "../../config/storageCOnfig,";
import { useAuth } from "./AuthProvider";
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import googleConfig from "../../config/google-config";
import { makeRedirectUri } from 'expo-auth-session';
import { useRoute } from '@react-navigation/native';

const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthState, fillLoginDetails } = useAuth();
    const route = useRoute();

    const clearFromData = () => {
        setEmail("");
        setPassword("");
    }


    const signInWithGoogle = async () => {
        // const supported = await Linking.canOpenURL(`${HOST}/google-login/`);

        // console.log("supported", supported)
        // if (supported) {
        //     const result = await Linking.openURL(`${HOST}/google-login/`)
        //     console.log("Google Login Result:", result);
        //     const code = route.params?.code;
        //     console.log("Route:", route);
        // } else {
        //     Alert.alert(`Some Error Occured while opening the url: ${url}`);
        // }


        try {
            const result = await promptAsync();
            console.log('Auth URL:', result); // Log the URL
            if (result.type === 'success') {
                // The URL is in result.url to send it to backend
                console.log('Authentication successful');
                // Handle the successful authentication
            } else {
                console.log('Google Sign In was canceled or failed');
            }
        } catch (error) {
            console.error('Error during Google Sign In:', error);
        }
    }


    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: googleConfig.androidClientId,
        expoClientId: googleConfig.clientId,
        // androidClientId: "",
        // scopes: googleConfig.scopes,
        // authorizationEndpoint: `${HOST}/google-login/`,
        // redirectUri: makeRedirectUri({
        //     useProxy: true,
        // }),
    });


    const sendCodeToBackend = async (code) => {
        try {
            const response = await fetch(`${HOST}/auth/google/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });
            const data = await response.json();
            console.log("Backend response:", data);
            // Handle the authentication result here (e.g., save token, update state)
        } catch (error) {
            console.error("Error sending code to backend:", error);
        }
    };

    const onSubmitHandler = () => {
        payloadData = {
            username: email,
            email: email,
            password: password
        }
        loginUser(payloadData)
            .then((res) => {
                // console.log("res", res.data)
                if (!res.data.access) {
                    Alert.alert("Login Failed", res.data.status ? res.data.status : "Please try again", [
                        {
                            text: "OK",
                            onPress: () => { },
                        },
                    ]);
                    // clearFormData();
                } else {
                    console.log("Successfully Logged in!");

                    setToken(res.data.access);
                    setLoginStatus("true");
                    setUsername(res.data.user.first_name);
                    setUserEmail(res.data.user.email);
                    setUserId(res.data.user.pk);
                    fillLoginDetails();
                    // clearFromData();

                    setAuthState({
                        token: res.data.access,
                        status: 'true',
                        username: res.data.user.first_name,
                        email: res.data.user.email,
                        userId: res.data.user.pk
                    })

                    // props.navigation.navigate('All Goals');
                }
            })
            .catch((err) => {
                Alert.alert("Login Failed", "Please try again", [
                    {
                        text: "OK",
                        onPress: () => { },
                    },
                ]);
                // reset form
                // clearFormData();
                console.log("Error while Login", err)
            });

    }

    return (
        <Provider>
            <KeyboardAvoidingView style={styles.container}>
                <Text style={styles.header}> Login</Text>
                <ScrollView
                    style={styles.boxContainer}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <Card style={styles.card}>
                        <Card.Content>
                            <PaperTextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                mode="outlined"
                                label="Email"
                            />

                            <PaperTextInput
                                style={styles.input}
                                value={password}
                                secureTextEntry
                                onChangeText={setPassword}
                                mode="outlined"
                                label="password"
                            />

                            <Button mode="contained" style={styles.btnLoginup} onPress={onSubmitHandler}>
                                Login
                            </Button>

                            <TouchableOpacity
                                onPress={() => {
                                    props.navigation.navigate("Signup")
                                }}
                            >
                                <Text style={[styles.signUp, styles.widthStyle]}>
                                    Don't have an account? Sign Up
                                </Text>
                            </TouchableOpacity>

                            <Button mode="contained" style={styles.btnGoogleLogin} onPress={signInWithGoogle}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <GoogleLogo />
                                    <Text
                                        style={{
                                            marginLeft: 8,
                                            color: 'white',
                                        }}>
                                        Sign in with Google
                                    </Text>
                                </View>
                            </Button>
                        </Card.Content>

                    </Card>
                </ScrollView>
            </KeyboardAvoidingView>
        </Provider>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: "center"
    },
    boxContainer: {
        width: "100%",
        marginBottom: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        marginBottom: 20,
    },
    btnLoginup: {
        marginTop: 5,
        borderRadius: 5,
    },
    btnGoogleLogin: {
        flex: 1,
        marginTop: 20,
        borderRadius: 5,
        marginBottom: 20,
        alignItems: 'center',
        backgroundColor: "#dd4b39",
        paddingTop: 10,
    },
    card: {
        backgroundColor: "white",
    },
    signUp: {
        marginTop: 25,
    },
    widthStyle: {
        width: "80%",
        maxWidth: 390,
    },
})