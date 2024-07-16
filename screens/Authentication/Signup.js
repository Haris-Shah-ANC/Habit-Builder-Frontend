import { useState } from "react";
import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text } from "react-native"
import { Provider, TextInput as PaperTextInput, Button, Card } from "react-native-paper";
import { resendValidationEmail, signUpUser } from "./authNetworkCalls";
import { fillLoginDetails, setLoginStatus, setToken, setUserEmail, setUsername } from "../../config/storageCOnfig,";


const Signup = (props) => {

    let [name, setName] = useState("Harish");
    let [email, setEmail] = useState("shakeelahmad9867@gmail.com");
    let [password, setPassword] = useState("haris123");
    let [confirmPassword, setConfirmPassword] = useState("haris123");

    const clearFormData = () => {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    }

    const resendEmail = () => {
        console.log("resendEmail")
        const payloadData = { email: email }
        resendValidationEmail(payloadData)
            .then((res) => {
                console.log("res", res.data)
            })
            .catch((err) => {
                console.log("Error while Resending Email", err.response.data)
            })
    }

    const onSubmitHandler = () => {
        if (!name && !email && !password && !confirmPassword) {
            alert("Please fill all the details for adding Task")
            return
        }
        else if (password !== confirmPassword) {
            alert("Password and confirm password do not match")
            return
        }
        payloadData = {
            username: email,
            email: email,
            password1: password,
            password2: confirmPassword
        }
        // signUpUser(payloadData)
        //     .then((res) => {
        //         console.log("res", res.data)
        //         if (res.data.success !== true) {
        //             Alert.alert("SignUp Failed", res.data.status ? res.data.status : "Please try again", [
        //                 {
        //                     text: "OK",
        //                     onPress: () => { },
        //                 },
        //             ]);
        //             //reset all data
        //             // clearFormData();
        //             // disable loader 
        //         } else {
        //             console.log("Successfully Signed Up!");

        //             setToken(res.data.data.access);
        //             setLoginStatus("true");
        //             setUsername(res.data.data.name);
        //             setUserEmail(res.data.data.email);
        //             // setUserId(res.data);
        //             fillLoginDetails();
        //             // clearFormData();
        //             props.navigation.navigate('HomePage');
        //         }
        //     })
        //     .catch((err) => {
        //         Alert.alert("SignUp Failed", "Please try again", [
        //             {
        //                 text: "OK",
        //                 onPress: () => { },
        //             },
        //         ]);
        //         // reset all fields
        //         // clearFormData();
        //         console.log("Error while Signup", err)
        //     });

        signUpUser(payloadData)
            .then((res) => {
                console.log("res", res.data)
            })
            .catch((err) => {
                Alert.alert("SignUp Failed", "Please try again", [
                    {
                        text: "OK",
                        onPress: () => { },
                    },
                ]);
                console.log("Error while Signup", err.response.data)
            })
    };

    return (
        <Provider>
            <KeyboardAvoidingView style={styles.container}>
                <Text style={styles.header}>Signup</Text>
                <ScrollView
                    style={styles.boxContainer}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <Card style={styles.card}>
                        <Card.Content>
                            <PaperTextInput
                                style={styles.input}
                                value={name}
                                onChangeText={setName}
                                mode="outlined"
                                label="Name"
                            />

                            <PaperTextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                mode="outlined"
                                label="email"
                            />

                            <PaperTextInput
                                style={styles.input}
                                value={password}
                                secureTextEntry
                                onChangeText={setPassword}
                                mode="outlined"
                                label="password"
                            />

                            <PaperTextInput
                                style={styles.input}
                                value={confirmPassword}
                                secureTextEntry
                                onChangeText={setConfirmPassword}
                                mode="outlined"
                                label="confirm password"
                            />
                        </Card.Content>

                        <Button mode="contained" style={styles.btnSingup} onPress={onSubmitHandler}>
                            Send Mail
                        </Button>

                        <Button mode="contained" style={styles.btnSingup} onPress={resendEmail}>
                            Resend Mail
                        </Button>
                    </Card>
                </ScrollView>
            </KeyboardAvoidingView>
        </Provider>
    )
}

export default Signup;

const styles = StyleSheet.create({
    container: {
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
    btnSingup: {
        margin: 15,
        borderRadius: 5,
    },
    card: {
        backgroundColor: "white"
    },
})