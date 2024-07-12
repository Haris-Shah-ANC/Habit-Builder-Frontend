import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, Provider, Button } from 'react-native-paper'

const Register = () => {

    const [email, setEmail] = useState("");

    return (
        <Provider>
            <View style={styles.container}>
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
                <Button mode='elevated' style={styles.btn}>
                    Send mail
                </Button>
            </View>


        </Provider>
    )
}

export default Register

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
        marginTop: 5,
        borderRadius: 5,
    },
})