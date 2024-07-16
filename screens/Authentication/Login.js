import { Alert, KeyboardAvoidingView, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Button, Card, Provider, TextInput as PaperTextInput } from "react-native-paper";
import { HOST } from "../../config/config";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { GoogleLogo } from "../../utilities/HeaderButtons";
import { connectSocialAccount, googleLoginUser, loginUser } from "./authNetworkCalls";
import { fillLoginDetails, setLoginStatus, setToken, setUserEmail, setUserId, setUsername } from "../../config/storageCOnfig,";
import { useAuth } from "./AuthProvider";
import { useRoute } from '@react-navigation/native';
import Spinner from "../../utilities/Spinner";

const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [spinner, setSpinner] = useState(false);
    const route = useRoute();

    const { setAuthState, fillLoginDetails, authState } = useAuth();
    const { token } = authState;

    const clearFromData = () => {
        setEmail("");
        setPassword("");
    }

    const signInWithGoogle = async () => {
        try {
            const supported = await Linking.canOpenURL(`${HOST}/google-login/`);
            if (supported) {
                await Linking.openURL(`${HOST}/google-login/`);
            } else {
                throw new Error("Can't open URL");
            }
        } catch (error) {
            setSpinner(false);
            Alert.alert("Login Failed", "Please try again", [
                { text: "OK", onPress: () => { } },
            ]);
        }
    };

    useEffect(() => {
        console.log("token==>", route.path)
        if (route.params?.token) {
            socialLogin(route.params.token);
        }
    }, [route.params?.token]);

    const socialLogin = (code) => {
        setSpinner(true);
        const payloadData = {
            access_token: "",
            code: code,
            id_token: ""
        }
        console.log("payloadData", payloadData);

        // if token exists connect users Social Account else login using callback URL code
        if (token) {
            connectSocialAccount(payloadData, token)
                .then((res) => {
                    console.log("res", res.data)
                    if (!res.data.access) {
                        console.log("Google Login Failed");
                        Alert.alert("Login Failed", res.data.status ? res.data.status : "Please try again", [
                            {
                                text: "OK",
                                onPress: () => { },
                            },
                        ]);
                        setSpinner(false);
                    } else {
                        console.log("Successfully Logged in using Google");

                        setToken(res.data.access);
                        setLoginStatus("true");
                        setAuthState({
                            token: res.data.access,
                            status: 'true',
                            username: res.data.user.first_name,
                            email: res.data.user.email,
                            userId: res.data.user.pk
                        })
                        setSpinner(false);
                        Alert.alert("Login Failed", "Please try again", [
                            {
                                text: "OK",
                                onPress: () => { },
                            },
                        ]);
                    }
                })
                .catch((err) => {
                    setSpinner(false);
                })
        } else {
            console.log("googleLoginUser")
            googleLoginUser(payloadData)
                .then((res) => {
                    console.log("res", res.data)
                    if (!res.data.access) {
                        console.log("Google Login Failed");
                        Alert.alert("Login Failed", res.data.status ? res.data.status : "Please try again", [
                            {
                                text: "OK",
                                onPress: () => { },
                            },
                        ]);
                        setSpinner(false);
                        // clearFormData();
                    } else {
                        console.log("Successfully Logged in using Google");

                        setToken(res.data.access);
                        setLoginStatus("true");
                        setAuthState({
                            token: res.data.access,
                            status: 'true',
                            username: res.data.user.first_name,
                            email: res.data.user.email,
                            userId: res.data.user.pk
                        })
                        setSpinner(false);
                    }
                })
                .catch((err) => {
                    setSpinner(false);
                    console.log("Error occured while Google Signin", err);
                    // status code 400 indicates user email already exist so navigate to social connect page
                    if (err.response?.status === 400) {
                        props.navigation.navigate('ConnectAccount');
                    }
                    else {
                        Alert.alert("Login Failed", "Please try again", [
                            {
                                text: "OK",
                                onPress: () => { },
                            },
                        ]);
                    }
                })
        }
    }


    const onSubmitHandler = () => {
        setSpinner(true);
        console.log("onSubmitHandler")
        let payloadData = {
            username: email,
            email: email,
            password: password
        }
        console.log("Login Payload", payloadData)
        loginUser(payloadData)
            .then((res) => {
                console.log("res", res.data)
                if (res.data.success !== true) {
                    Alert.alert("Login Failed", res.data.status ? res.data.status : "Please try again", [
                        {
                            text: "OK",
                            onPress: () => { },
                        },
                    ]);
                    setSpinner(false);
                    // clearFormData();
                } else {
                    console.log("Successfully Logged in!");

                    setToken(res.data.token.access);
                    setLoginStatus("true");
                    // setUsername(res.data.user.first_name);
                    // setUserEmail(res.data.user.email);
                    // setUserId(res.data.user.pk);
                    // fillLoginDetails();
                    // clearFromData();

                    setAuthState({
                        token: res.data.token.access,
                        status: 'true',
                        username: res.data.user.first_name,
                        email: res.data.user.email,
                        userId: res.data.user.id
                    })
                    setSpinner(false);

                    // props.navigation.navigate('HomePage');
                }
            })
            .catch((err) => {
                setSpinner(false);
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
            {spinner ? (
                <Spinner />
            ) : (
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
                                <TouchableOpacity
                                    onPress={() => {
                                        props.navigation.navigate("ForgotPassword")
                                    }}
                                >
                                    <Text style={styles.forgotPassword}>
                                        FORGOT PASSWORD?
                                    </Text>
                                </TouchableOpacity>
                                <Button mode="contained" style={styles.btnLoginup} onPress={onSubmitHandler}>
                                    Login
                                </Button>

                                <TouchableOpacity
                                    onPress={() => {
                                        props.navigation.navigate("Register")
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
            )}
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
        fontWeight: 'heavy',
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
    forgotPassword: {
        alignSelf: "flex-end",
        marginBottom: 10,
        fontSize: 13,
        color: "#3498db",
        fontWeight: "bold"
    }
})