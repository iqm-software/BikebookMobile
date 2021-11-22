import React from "react";
import { StyleSheet, Text, useWindowDimensions } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import AboutRoute from "./components/AboutRoute";
import LocationRoute from "./components/LocationRoute";
import ServicesRoute from "./components/ServicesRoute";

export default function Business({ route }) {
  var business = route.params.business;
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    { key: "About", title: "About" },
    { key: "Location", title: "Location" },
    { key: "Services", title: "Services" },
  ]);

  const renderScene = SceneMap({
    About: () => <AboutRoute business={business} />,
    Location: () => <LocationRoute business={business} />,
    Services: () => <ServicesRoute business={business} />,
  });

  return (
    <TabView
      renderTabBar={(props) => (
        <TabBar
          renderLabel={({ route, focused, color }) => (
            <Text style={{ color: "black", fontFamily: "PublicSans_500Medium", fontSize: 16, margin: 0 }}>{route.title}</Text>
          )}
          {...props}
          indicatorStyle={{ backgroundColor: "black" }}
          style={{ backgroundColor: "white" }}
        />
      )}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
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
