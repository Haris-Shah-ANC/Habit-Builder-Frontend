import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ToastAndroid, Alert } from 'react-native'
import { TextInput, Provider, Button, ActivityIndicator } from 'react-native-paper'
import { sendVerificationEmail } from './authNetworkCalls';
import Spinner from '../../utilities/Spinner';

const Register = (props) => {

    const [email, setEmail] = useState("");
    const [spinner, setSpinner] = useState(false);

    const sendMail = () => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const isValidEmail = emailRegex.test(email);
        if (!email || !isValidEmail) {
            alert("Please enter a valid email")
            return
        }
        const payloadData = {
            email: email,
            send_type: "normal"
        }
        setSpinner(true);
        sendVerificationEmail(payloadData)
            .then((res) => {
                // console.log("res", res.data);
                setSpinner(false);
                if (res.data.success !== true) {
                    ToastAndroid.show(res.data.status, ToastAndroid.SHORT);
                } else {
                    setSpinner(false);
                    setEmail("");
                    Alert.alert("Success", res.data.message ? res.data.message.status : "", [
                        {
                            text: "OK",
                            onPress: () => { },
                        },
                    ]);
                }
            })
            .catch((err) => {
                setSpinner(false);
                console.log("Error occured while sending email", err);
            })
    }

    return (
        <Provider>
            <View style={styles.container}>
                <View style={spinner ? [styles.modalStyle] : [{ display: "none" }]}>
                    <Spinner />
                </View>
                <Text style={styles.header}>
                    Sing up or Sign in
                </Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    mode="outlined"
                    label="Email"
                />
                <Button mode='contained' style={styles.btn} onPress={sendMail}>
                    Send mail
                </Button>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.navigate("Login")
                    }}
                >
                    <Text style={[styles.signInText, styles.widthStyle]}>
                        Already have an account? Sign in
                    </Text>
                </TouchableOpacity>
            </View>
        </Provider>
    )
}

export default Register

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontWeight: 'heavy',
        marginVertical: "10%",
    },
    container: {
        flex: 1,
        padding: 20,
        alignItems: "center"
    },
    input: {
        marginBottom: 20,
        width: "100%",
        marginVertical: 20
    },
    btn: {
        width: "100%",
        marginTop: "10%",
        borderRadius: 5,
    },
    signInText: {
        marginTop: "5%",
        fontWeight: 'heavy',
    },
    modalStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.6,
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        zIndex: 1,
    },
})