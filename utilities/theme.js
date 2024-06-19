import { DefaultTheme } from "react-native-paper";

export const customTheme = {
    heading: {},
    colors: {
        primary: '#f4511e', //#000080
        bgColor: "white",
        drawerbg: '#f4511e', //#0d0d77
    },
};

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "#2C387E",
        accent: "yellow",
    },
    myOwnProperty: customTheme,
};

export default theme;