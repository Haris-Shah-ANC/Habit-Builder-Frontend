import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Button, Card, TextInput } from "react-native-paper";
import DropDownPicker from 'react-native-dropdown-picker';
import { addNewSubGoal, createNewUnit, fetchAllSubGoals, fetchUserDefinedUnits, updateSubGoal } from "../../NetworkCalls/networkCalls";
import { capitalizeFirstLetter } from "../../utilities/utils";

export const AddNewSubGoal = (props) => {
    let action = props.actionType;
    let subGoalTitle = props?.subGoalData?.taskname;
    let taskCount = props?.subGoalData?.times;
    let unitValue = props?.subGoalData?.user_defined_unit ? props?.subGoalData?.user_defined_unit : props?.subGoalData?.system_defined_unit
    const [subGoalName, setSubGoalName] = useState(action === "edit" ? subGoalTitle : "");
    const [count, setCount] = useState(action === "edit" ? taskCount : "");
    const [unitList, setUnitList] = useState([]);
    const [openDropDown, setOpenDropDown] = useState(false);
    const [value, setValue] = useState(action === "edit" ? unitValue : null);
    const [newItemText, setNewItemText] = useState('');
    const hasFeatchedUnits = useRef(false);
    const [showAddNew, setShowAddNew] = useState(false);

    const getSubGoalList = (goalId) => {
        fetchAllSubGoals(goalId)
            .then((res) => {
                let result = res.data;
                props.udpateSubGoalsList(result.data.tasks);
            })
            .catch((err) => {
                console.log("Error while Fetching SubGoal List", err);
            })
    }

    const getUnitsList = () => {
        if (hasFeatchedUnits.current) return;
        fetchUserDefinedUnits()
            .then((res) => {
                let result = res.data;
                setUnitList([{ label: 'Add New Unit', value: 'add_new' }, ...result.data])
                hasFeatchedUnits.current = true;
            })
            .catch((err) => {
                console.log("Error while Fetching Unit List", err);
                hasFeatchedUnits.current = true;
            })
    }

    useEffect(() => {
        getUnitsList();
    }, [])

    const handleValueChange = (val) => {
        if (val === 'add_new') {
            setOpenDropDown(false);
            setShowAddNew(true);
            setValue(null);
        } else {
            setValue(val);
            setShowAddNew(false);
        }
    };

    const addNewItem = (itemText) => {
        if (itemText.trim() !== '') {
            let payloadData = { unit: itemText }
            createNewUnit(payloadData)
                .then((res) => {
                    let result = res.data.result;
                    const newItem = { label: capitalizeFirstLetter(result.unit), value: result.unit.toLowerCase() };
                    setUnitList((prevItems) => [
                        ...prevItems.filter((item) => item.value !== 'add_new'),
                        newItem,
                        { label: 'Add New', value: 'add_new' },
                    ]);
                    setValue(newItem.value);
                    setNewItemText('');
                    setShowAddNew(false);
                })
                .catch((err) => {
                    console.log("Error while creating Unit", err);
                })
        }
        else {
            alert("Please Enter Unit First")
        }
    };

    const CreateNewSubGoal = (goalId) => {
        let systemDefinedUnits = ["nos", "kms", "hrs"]
        let isUnitSystemDefined = systemDefinedUnits.includes(value)
        let subGoalId = props?.subGoalData?.id;

        if (!value) {
            alert("Please select a Unit")
        }
        else if (!subGoalName) {
            alert("Please enter the Task Name");
        }
        else if (count == 0) {
            alert("Please enter count");
        }
        let payloadData = {
            taskname: subGoalName,
            topicid: goalId,
            times: count,
            user_defined_unit: !isUnitSystemDefined ? value : null,
            system_defined_unit: isUnitSystemDefined ? value : null
        }

        // console.log("payloadData", payloadData);

        if (action === "edit") {
            updateSubGoal(payloadData, subGoalId)
                .then((res) => {
                    let result = res.data;
                    setNewItemText('');
                    props.closeOption(false);
                    getSubGoalList(goalId);
                })
                .catch((err) => {
                    console.log("Error while updating SubGoal", err);
                })
        }
        else {
            addNewSubGoal(payloadData)
                .then((res) => {
                    let result = res.data;
                    setNewItemText('');
                    props.closeOption(false);
                    getSubGoalList(goalId);
                })
                .catch((err) => {
                    console.log("Error while creating SubGoal", err);
                })
        }
    }

    return (
        <Card style={styles.container}>
            <Card.Content>
                {(unitList && unitList.length) > 0 &&
                    <DropDownPicker
                        style={styles.dropdown}
                        open={openDropDown}
                        value={value}
                        items={unitList}
                        setOpen={setOpenDropDown}
                        setValue={setValue}
                        setItems={setUnitList}
                        onSelectItem={(item) => handleValueChange(item.value)}
                        listMode="SCROLLVIEW"
                    />
                }
                {showAddNew && (
                    <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: "center", padding: 5 }}>
                        <TextInput
                            value={newItemText}
                            onChangeText={setNewItemText}
                            label="Enter new unit"
                            style={{ height: 45, width: "60%", marginRight: "auto" }}
                            mode="outlined"
                        />
                        <Button
                            onPress={() => addNewItem(newItemText)}
                            mode="contained-tonal"
                            style={{ width: "30%", height: 45 }}
                        >
                            Add
                        </Button>
                    </View>
                )}
                <TextInput
                    style={styles.nameInput}
                    mode="outlined"
                    label="Task Name"
                    value={subGoalName}
                    onChangeText={setSubGoalName}
                />
                <View>
                    <TextInput
                        style={styles.unitInput}
                        mode="outlined"
                        label={action === "edit" ? "Total Count" : "Count"}
                        value={count.toString()}
                        onChangeText={setCount}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.btnContainer}>
                    <Button
                        onPress={() => props.closeOption(false)}
                        mode="outlined"
                    >
                        Cancel
                    </Button>
                    <Button
                        onPress={() => CreateNewSubGoal(props.goalId)}
                        mode="outlined"
                    >
                        Save
                    </Button>
                </View>
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        backgroundColor: "white",
        marginBottom: 1,
    },
    nameInput: {
        marginBottom: 15,
        height: 45,
    },
    unitInput: {
        marginBottom: 15,
        height: 45,
        width: "100%"
    },
    btnContainer: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    dropdown: {
        marginBottom: 10,
    },
    addNewItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    addNewInput: {
        flex: 1,
        marginRight: 10,
        height: 40,
    },
    dropdownItem: {
        padding: 10,
    },
})