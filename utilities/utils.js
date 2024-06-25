import { Text } from "react-native";
import { getToken } from "../config/storageCOnfig,";

export const RedStar = () => {
    return <Text style={{ color: "red" }}>*</Text>;
};

export const fetchToken = async () => {
    let token = await getToken();
    console.log("token", token);
    return token
}