import React from "react";
import { FlatList, Text, View } from "react-native";
import { ListItem } from "@rneui/themed";

const ListRounds = ({ rounds, selectedValue, setSelectedValue, styles }) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleItemPress = (value) => {
    setSelectedValue(value);
    setExpanded(false);
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <Text
        style={[
          styles.checkBoxLeague,
          {
            width: "100%",
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: 10,
          },
        ]}
      >
        Rounds
      </Text>

      <ListItem.Accordion
        style={[styles.picker, { marginBottom: 10 }]}
        content={
          <ListItem.Content>
            <ListItem.Title>{selectedValue || "Rounds"}</ListItem.Title>
          </ListItem.Content>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        <View style={{ maxHeight: 300 }}>
          <FlatList
            style={{ marginBottom: 100 }}
            nestedScrollEnabled={true}
            data={rounds}
            renderItem={({ item }) => (
              <ListItem key={item} onPress={() => handleItemPress(item)}>
                <ListItem.Content>
                  <ListItem.Title>{item}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            )}
            keyExtractor={(item) => item}
          />
        </View>
      </ListItem.Accordion>
    </View>
  );
};

export default ListRounds;
