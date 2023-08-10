import { getDocs, query, collection, where } from "firebase/firestore";
import firebase from "firebase/compat/app";

const searchFulbito = async (text, callback) => {
  const db = firebase.firestore();
  
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "fulbitos"), where("name", ">=", text))
    );
    const searchData = [];
    querySnapshot.forEach((doc) => {
      const item = doc.data();
      //console.log(item)
      //console.log(doc.id)
      if (
        item.name.toLowerCase().startsWith(text.toLowerCase()) ||
        (item.admin && item.admin.userName.toLowerCase().startsWith(text.toLowerCase()))
      ) {
        searchData.push({ id: doc.id, ...item });
      }
    });
    //console.log(searchData)
    callback(searchData);
  } catch (error) {
    console.error("Error al buscar en la base de datos:", error);
    callback([]);
  }
};

export default searchFulbito;
