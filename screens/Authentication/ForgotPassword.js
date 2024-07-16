import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TextInput, Provider, Button } from 'react-native-paper'
import { sendResetPasswordEmail } from './authNetworkCalls';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const sendMail = () => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const isValidEmail = emailRegex.test(email);
        if (!email || !isValidEmail) {
            alert("Please enter a valid email")
            return
        }
        // TODO : replace the payload and code according to actual response
        const payloadData = {
            email: email
        }
        sendResetPasswordEmail(payloadData)
            .then((res) => {
                console.log("res", res.data);
                // TODO : show alert messages according to the api response
            })
            .catch((err) => {
                console.log("Error occured while sending email", err);
            })
    }

    return (
        <Provider>
            <View style={styles.container}>
                <Text style={styles.header}>
                    Forgot Password?
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
            </View>
        </Provider>
    )
}

export default ForgotPassword


const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontWeight: 'heavy',
        marginBottom: 20,
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
    }
})