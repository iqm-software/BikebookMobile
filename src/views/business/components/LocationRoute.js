import moment from "moment";
import React from "react";
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Divider } from "react-native-paper";

export default function LocationRoute({ business }) {
  const layout = useWindowDimensions();
  return (
    <View style={styles.container}>
      <View style={{ ...styles.page, padding: 0, margin: 0, paddingTop: 0, paddingHorizontal: 0 }}>
        <MapView
          style={{ width: "100%", height: "40%" }}
          initialRegion={{
            latitude: business.latitude,
            longitude: business.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: business.latitude,
              longitude: business.longitude,
            }}
          />
        </MapView>
        <ScrollView style={{ padding: 10 }}>
          <Text selectable={true} style={{ fontSize: 20, fontWeight: "600", fontFamily: "PublicSans_600SemiBold", marginBottom: 10 }}>
            Shop Address
          </Text>
          <Text selectable={true} style={{ marginBottom: 3, fontFamily: "PublicSans_400Regular", fontSize: 16 }}>
            {business.displayName}
          </Text>
          {business.addressLine2 && (
            <Text selectable={true} style={{ marginBottom: 3, fontFamily: "PublicSans_400Regular", fontSize: 16 }}>
              {business.addressLine1}
            </Text>
          )}
          {business.addressLine2 && (
            <Text selectable={true} style={{ marginBottom: 3, fontFamily: "PublicSans_400Regular", fontSize: 16 }}>
              {business.addressLine2}
            </Text>
          )}
          {business.addressLine2 && (
            <Text selectable={true} style={{ marginBottom: 3, fontFamily: "PublicSans_400Regular", fontSize: 16 }}>
              {business.town}
            </Text>
          )}
          {business.addressLine2 && (
            <Text selectable={true} style={{ marginBottom: 3, fontFamily: "PublicSans_400Regular", fontSize: 16 }}>
              {business.postcode}
            </Text>
          )}
          <Divider style={{ height: 1, marginTop: 10 }} />
          <Text selectable={true} style={{ marginTop: 10, fontSize: 20, fontWeight: "600", fontFamily: "PublicSans_600SemiBold", marginBottom: 10 }}>
            Opening Hours
          </Text>
          <View style={{ justifyContent: "space-between", flexDirection: "row", width: layout.width - 40, marginBottom: 5 }}>
            <Text selectable={true} style={{ fontFamily: "PublicSans_600SemiBold", fontSize: 16 }}>
              Monday
            </Text>
            <Text selectable={true} style={{ fontFamily: "PublicSans_400Regular", fontSize: 16 }}>
              {business.mondayOpeningTime == null
                ? "Closed"
                : `${moment(business.mondayOpeningTime).format("HH:mm")} - ${moment(business.mondayClosingTime).format("HH:mm")}`}
            </Text>
          </View>
          <View style={{ justifyContent: "space-between", flexDirection: "row", width: layout.width - 40, marginBottom: 5 }}>
            <Text selectable={true} style={{ fontFamily: "PublicSans_600SemiBold", fontSize: 16 }}>
              Tuesday
            </Text>
            <Text selectable={true} style={{ fontFamily: "PublicSans_400Regular", fontSize: 16 }}>
              {business.tuesdayOpeningTime == null
                ? "Closed"
                : `${moment(business.tuesdayOpeningTime).format("HH:mm")} - ${moment(business.tuesdayClosingTime).format("HH:mm")}`}
            </Text>
          </View>
          <View style={{ justifyContent: "space-between", flexDirection: "row", width: layout.width - 40, marginBottom: 5 }}>
            <Text selectable={true} style={{ fontFamily: "PublicSans_600SemiBold", fontSize: 16 }}>
              Wednesday
            </Text>
            <Text selectable={true} style={{ fontFamily: "PublicSans_400Regular", fontSize: 16 }}>
              {business.wednesdayOpeningTime == null
                ? "Closed"
                : `${moment(business.wednesdayOpeningTime).format("HH:mm")} - ${moment(business.wednesdayClosingTime).format("HH:mm")}`}
            </Text>
          </View>
          <View style={{ justifyContent: "space-between", flexDirection: "row", width: layout.width - 40, marginBottom: 5 }}>
            <Text selectable={true} style={{ fontFamily: "PublicSans_600SemiBold", fontSize: 16 }}>
              Thursday
            </Text>
            <Text selectable={true} style={{ fontFamily: "PublicSans_400Regular", fontSize: 16 }}>
              {business.thursdayOpeningTime == null
                ? "Closed"
                : `${moment(business.thursdayOpeningTime).format("HH:mm")} - ${moment(business.thursdayClosingTime).format("HH:mm")}`}
            </Text>
          </View>
          <View style={{ justifyContent: "space-between", flexDirection: "row", width: layout.width - 40, marginBottom: 5 }}>
            <Text selectable={true} style={{ fontFamily: "PublicSans_600SemiBold", fontSize: 16 }}>
              Friday
            </Text>
            <Text selectable={true} style={{ fontFamily: "PublicSans_400Regular", fontSize: 16 }}>
              {business.tuesdayOpeningTime == null
                ? "Closed"
                : `${moment(business.fridayOpeningTime).format("HH:mm")} - ${moment(business.fridayClosingTime).format("HH:mm")}`}
            </Text>
          </View>
          <View style={{ justifyContent: "space-between", flexDirection: "row", width: layout.width - 40, marginBottom: 5 }}>
            <Text selectable={true} style={{ fontFamily: "PublicSans_600SemiBold", fontSize: 16 }}>
              Saturday
            </Text>
            <Text selectable={true} style={{ fontFamily: "PublicSans_400Regular", fontSize: 16 }}>
              {business.saturdayOpeningTime == null
                ? "Closed"
                : `${moment(business.saturdayOpeningTime).format("HH:mm")} - ${moment(business.saturdayClosingTime).format("HH:mm")}`}
            </Text>
          </View>
          <View style={{ justifyContent: "space-between", flexDirection: "row", width: layout.width - 40, marginBottom: 5 }}>
            <Text selectable={true} style={{ fontFamily: "PublicSans_600SemiBold", fontSize: 16 }}>
              Sunday
            </Text>
            <Text selectable={true} style={{ fontFamily: "PublicSans_400Regular", fontSize: 16 }}>
              {business.sundayOpeningTime == null
                ? "Closed"
                : `${moment(business.sundayOpeningTime).format("HH:mm")} - ${moment(business.sundayClosingTime).format("HH:mm")}`}
            </Text>
          </View>
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
