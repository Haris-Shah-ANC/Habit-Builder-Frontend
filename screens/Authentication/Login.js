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

    console.log("data in params", props.route)
    const signInWithGoogle = async () => {
        const supported = await Linking.canOpenURL(`${HOST}/google-login/`);

        if (supported) {
            const result = await Linking.openURL(`${HOST}/google-login/`)
        } else {
            Alert.alert(`Some Error Occured while opening the url: ${url}`);
        }

    }


    const onSubmitHandler = () => {
        console.log("onSubmitHandler")
        payloadData = {
            username: email,
            email: email,
            password: password
        }
        console.log("Login Payload", payloadData)
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
                    // setLoginStatus("true");
                    // setUsername(res.data.user.first_name);
                    // setUserEmail(res.data.user.email);
                    // setUserId(res.data.user.pk);
                    // fillLoginDetails();
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