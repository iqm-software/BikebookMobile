import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AboutRoute({ business }) {
  return (
    <View style={styles.container}>
      <View style={styles.page}>
        <Text selectable={true} style={{ fontSize: 20, fontWeight: "600", fontFamily: "PublicSans_600SemiBold", marginBottom: 10 }}>
          About {business.displayName}
        </Text>
        <Text selectable={true} style={{ marginBottom: 10, fontFamily: "PublicSans_400Regular", fontSize: 16 }}>
          {business.aboutTheBusiness}
        </Text>
        <View style={{ marginTop: 5 }}>
          <View style={{ flexDirection: "row" }}>
            <MaterialIcons name='local-phone' size={19} color='black' />
            <Text selectable={true} style={{ marginLeft: 3, fontSize: 16 }}>
              {business.contactNumber}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 3 }}>
            <MaterialIcons name='email' size={19} color='black' />
            <Text selectable={true} style={{ marginLeft: 3, fontSize: 16 }}>
              {business.contactEmail}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: "#DAEAF2",
  },
  page: {
    padding: 10,
    paddingTop: 15,
    margin: 6,
    height: 50,
    backgroundColor: "white",
    width: "95%",
    height: "95%",
    borderRadius: 4,
    paddingHorizontal: 20,
    overflow: "hidden",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    marginBottom: 5,
    marginTop: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  summary: {
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
  },
  distance: {
    fontSize: 14,
    color: "rgba(41,43,45, 0.8)",
  },
  list: {
    width: "96%",
  },
  image: {
    width: 38,
    height: 38,
    marginRight: 6,
  },
  rightSection: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  resultsText: {
    padding: 7,
  },
});
