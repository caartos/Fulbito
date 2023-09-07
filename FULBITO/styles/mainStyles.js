import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 19,
    textAlign: "center",
    color: "#1d4b26",
  },
  button: {
    borderRadius: 5,
    borderColor: "#1d4b26",
    borderWidth: 2,
    backgroundColor: "#a681ef",
    width: "auto",
    height: "auto",
    paddingHorizontal: 10,
    paddingVertical: 2,
    margin: 5,
  },
  buttonText: {
    color: "#baffc9",
    fontSize: 17,
    textAlign: "center",
    paddingTop: 2,
  },
  textInput: {
    height: 40,
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: 200,
    alignSelf: "center",
    borderColor: "#1d4b26",
    borderWidth: 2,
  },
  forgotPass: {
    textAlign: "center",
    color: "#1d4b26",
  },
  formContainer: {
   marginTop: 60
  },
});

export default styles;
