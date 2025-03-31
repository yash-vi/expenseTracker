import { View, Text, Alert, StyleSheet } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../ui/Button";
import getFormattedDate from "../util/date";

const ExpForm = ({onCancel, onSubmit, submitButtonLabel, defaultVal}) => {

  const [inputVals, setInputVals] = useState({
    amount: defaultVal ? defaultVal.amount.toString() : "",
    date: defaultVal ? getFormattedDate(defaultVal.date): "",
    description: defaultVal ? defaultVal.description.toString() : "",
  });

  const inputChangeHandler = (inputId, enteredValue) => {
    setInputVals((currInputVals) => {
      return {
        ...currInputVals,
        [inputId]: enteredValue,
      };
    });
  };

  const submitHandler = () => {
    const expData = {
      amount: +inputVals.amount,
      date: new Date(inputVals.date),
      description: inputVals.description,
    };

    const amtIsValid = !isNaN(expData.amount) && expData.amount > 0;
    const dateIsValid = expData.date.toString() !== 'Invalid Date';
    const descIsValid = expData.description.trim().length > 0;

    if(!amtIsValid || !dateIsValid || !descIsValid ){
      Alert.alert('Invalid Input!', 'Please check your input values!');
      return;
    }

    onSubmit(expData);
  }

  return (
    <View style={styles.root}>
      <Text style={styles.title}> Your expense:</Text>
      <View style={styles.ipRow}>
        <Input
          label="Amount"
          style={styles.rowIp}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputVals.amount,
          }}
        />
        <Input
          label="Date"
          style={styles.rowIp}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputVals.date,
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputVals.description,
        }}
      />
            <View style={styles.buttonView}> 
              <Button mode="flat" onPress={onCancel} style={styles.button}> Cancel </Button>
              <Button onPress={submitHandler} style={styles.button}> {submitButtonLabel} </Button>
            </View>
    </View>
  );
};
export default ExpForm;

const styles = StyleSheet.create({
  root: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 10,
  },
  ipRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowIp: {
    flex: 1,
  },
  buttonView:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center'
  },
  button:{
    minWidth: 120,
    marginHorizontal: 8,
  },
});
