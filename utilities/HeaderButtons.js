import { Ionicons } from '@expo/vector-icons';
import { HeaderButton, Item } from "react-navigation-header-buttons";

const CustomHeaderButton = (props) => {
    const { color, size } = props
    return (
        <HeaderButton
            {...props}
            IconComponent={Ionicons}
            iconSize={size ? size : 23}
            color={color ? color : "black"}
        />
    );
};

export const AddNewGoalButton = (props) => {
    return (
        <Item
            title="AddNewGoal"
            iconName="add-circle-outline"
            onPress={props.onPressHandler}
            color='black'
            size={30}
        />
    )
}

export const GoogleLogo = (props) => {
    return (
        <Ionicons
            name='logo-google'
            color='white'
            size={30}
        />
    )
}

export default CustomHeaderButton;