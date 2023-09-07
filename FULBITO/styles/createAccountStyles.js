import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    color: "#1d4b26",
    margin: 2,
  },
  button: {
    borderRadius: 5,
    borderColor: "#1d4b26",
    borderWidth: 2,
    backgroundColor: "#a681ef",
    width: "auto",
    height: "auto",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 60,
  },
  mainTitle: {
    textAlign: "center",
    color: "#1d4b26",
    margin: 20,
    marginBottom: 30,
    fontSize: 30,
  },
  return: {
    textAlign: "center",
    color: "#1d4b26",
    marginBottom: 30,
    fontSize: 30,
    marginTop: 50,
  },
  buttonText: {
    color: "#baffc9",
    fontSize: 17,
    textAlign: "center",
    paddingTop: 2,
  },
  textInput: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: 200,
    alignSelf: "center",
    borderColor: "#1d4b26",
    borderWidth: 2,
  },
  inputContainer: {
    justifyContent: "center",
    backgroundColor: "#cef5bb",
    width: "80%",
    height: "auto",
    alignSelf: "center",
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: "#1d4b26",
    borderWidth: "1px",
  },
});

export default styles;
