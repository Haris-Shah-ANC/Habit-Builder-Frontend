import { Alert, KeyboardAvoidingView, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Button, Card, Provider, TextInput as PaperTextInput } from "react-native-paper";
import { HOST } from "../../config/config";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import { GoogleLogo } from "../../utilities/HeaderButtons";
import { loginUser } from "./authNetworkCalls";
import { fillLoginDetails, setLoginStatus, setToken, setUserEmail, setUsername } from "../../config/storageCOnfig,";


const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const clearFromData = () => {
        setEmail("");
        setPassword("");
    }

    const signInWithGoogle = () => {
        Linking.openURL(`${HOST}/accounts/`)
    }

    const onSubmitHandler = () => {
        payloadData = {
            email: email,
            password: password
        }
        loginUser(payloadData)
            .then(async (res) => {
                console.log("res", res.data)
                if (res.data.success !== true) {
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
                    setUsername(res.data.name);
                    setUserEmail(res.data.email);
                    // setUserId(res.data);
                    fillLoginDetails();
                    // clearFromData();
                    props.navigation.navigate('All Goals');
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