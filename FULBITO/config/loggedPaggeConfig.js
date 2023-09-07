import IoniconsIcon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const functionField = [
    {
      title: "Create New FULBITO",
      navigate: "CreateNewFulbito",
      icon: <IoniconsIcon name="ios-football" size={40} color={"#baffc9"} />,
    },
    {
      title: "Join FULBITO",
      navigate: "SearchFulbito",
      icon: (
        <MaterialCommunityIcons name="soccer-field" size={40} color={"#baffc9"} />
      ),
    },
    {
      title: "My FULBITOS",
      navigate: "MyFulbitos",
      icon: <FontAwesome5 name="trophy" size={40} color={"#baffc9"} />,
    },
    {
      title: "My Predictions",
      navigate: "Predictions",
      icon: <IoniconsIcon name="ios-football" size={40} color={"#baffc9"} />,
    },
    {
      title: "FULBITO Rules",
      navigate: "Predictions",
      icon: <MaterialCommunityIcons name="file-document-edit" size={40} color={"#baffc9"} />,
    },
  ];

  export default functionField