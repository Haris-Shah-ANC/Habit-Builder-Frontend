import { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text } from "react-native"
import { Provider, TextInput as PaperTextInput, Button, Card } from "react-native-paper";
import { resendValidationEmail, signUpUser } from "./authNetworkCalls";
import { fillLoginDetails, setLoginStatus, setToken, setUserEmail, setUsername } from "../../config/storageCOnfig,";
import { useRoute } from "@react-navigation/native";
import Spinner from "../../utilities/Spinner";
import { useAuth } from "./AuthProvider";

const Signup = (props) => {

    const [spinner, setSpinner] = useState(false);
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");
    const route = useRoute();

    const { setAuthState } = useAuth();

    const clearFormData = () => {
        setName("");
        setPassword("");
        setConfirmPassword("");
    }

    // const resendEmail = () => {
    //     const payloadData = { email: email }
    //     resendValidationEmail(payloadData)
    //         .then((res) => {
    //             console.log("res", res.data)
    //         })
    //         .catch((err) => {
    //             console.log("Error while Resending Email", err.response.data)
    //         })
    // }

    const onSubmitHandler = () => {
        if (!firstName && !lastName && !password && !confirmPassword) {
            alert("Please fill all the required details for adding Task")
            return
        }
        else if (password !== confirmPassword) {
            alert("Password and confirm password do not match")
            return
        }
        payloadData = {
            token: route.params?.token,
            password: password,
            firt_name: firstName,
            last_name: lastName,
            date_of_birth: null,
            gender: "",
            city: "",
            zip_code: "",
            mobile_number: ""
        }

        setSpinner(true);
        signUpUser(payloadData)
            .then((res) => {
                // console.log("res", res.data)
                if (res.data.success !== true) {
                    Alert.alert("SignUp Failed", res.data.status ? res.data.status : "Please try again", [
                        {
                            text: "OK",
                            onPress: () => { },
                        },
                    ]);
                    setSpinner(false);
                    // clearFormData();
                } else {
                    console.log("Successfully Signed Up!");

                    setToken(res.data?.data?.token?.access);
                    setLoginStatus("true");

                    setAuthState({
                        token: res.data?.data?.token?.access,
                        status: 'true',
                        username: `${res.data?.data?.user?.first_name} ${res.data?.data?.user?.last_name}`,
                        email: res.data?.data?.user?.email,
                        userId: res.data?.data?.user?.id
                    })
                    setSpinner(false);
                    // clearFormData();
                }
            })
            .catch((err) => {
                setSpinner(false);
                Alert.alert("SignUp Failed", "Please try again", [
                    {
                        text: "OK",
                        onPress: () => { },
                    },
                ]);
                // clearFormData();
                console.log("Error while Signup", err)
            });
    };

    return (
        <Provider>
            {spinner ? (
                <Spinner />
            ) : (
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
                                    value={firstName}
                                    onChangeText={setFirstName}
                                    mode="outlined"
                                    label="First Name"
                                />

                                <PaperTextInput
                                    style={styles.input}
                                    value={lastName}
                                    onChangeText={setLastName}
                                    mode="outlined"
                                    label="Last Name"
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
                                Continue
                            </Button>

                            {/* <Button mode="contained" style={styles.btnSingup} onPress={resendEmail}>
                            Resend Mail
                        </Button> */}
                        </Card>
                    </ScrollView>
                </KeyboardAvoidingView>
            )}
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