import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ExtractServicesFromServiceGroups } from "../../../utils/BusinessUtils";

export default function ServicesRoute({ business }) {
  var services = ExtractServicesFromServiceGroups(business);
  return (
    <View style={styles.container}>
      <View style={styles.page}>
        <ScrollView>
          <Text style={{ color: "rgb(95, 99, 104)", fontSize: 9, textAlign: "center", marginBottom: 20 }}>
            Prices are subject to change depending on servicing requirements
          </Text>
          {services &&
            services.map((service, index) => (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                  borderBottomColor: "#E5E5E5",
                  borderBottomWidth: index == services.length - 1 ? 0 : "1px",
                  textAlign: "center",
                }}
              >
                <Text style={{ fontSize: 22, fontFamily: "PublicSans_600SemiBold" }}>{service.name}</Text>
                <Text style={{ fontSize: 15, fontFamily: "PublicSans_400Regular", marginTop: 10, color: "#5f6368", textAlign: "center" }}>
                  {service.description}
                </Text>
                <Text style={{ fontSize: 22, fontFamily: "PublicSans_500Medium", marginTop: 10, textAlign: "center" }}>£{service.price}</Text>
              </View>
            ))}
        </ScrollView>
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
