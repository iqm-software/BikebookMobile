import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Alert, Image, TouchableOpacity, Pressable, FlatList, useWindowDimensions } from "react-native";
import Text from "../components/Text";
import Button from "react-native-button";
import RNPickerSelect from "react-native-picker-select";
import { SearchOptions } from "../settings/SearchOptions";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput, Divider } from "react-native-paper";
import CustomSnackbar from "../components/Snackbar";
export default function Search({ navigation }) {
  const [postcode, onPostcodeChange] = React.useState("");
  const [radius, setRadius] = useState("1");
  const [service, setService] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [postcodeSnackbarVisible, setPostcodeSnackbarVisible] = useState(false);
  const layout = useWindowDimensions();
  // navigate to the search results page
  const onSearch = () => {
    if (!postcode || /^\s*$/.test(postcode)) {
      setPostcodeSnackbarVisible(true);
      return;
    }
    navigation.navigate("SearchResults", { postcode, service, radius });
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomSnackbar text={"Postcode is required."} visible={postcodeSnackbarVisible} setVisible={setPostcodeSnackbarVisible} />
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={{ uri: "https://bikebook.co.uk/Images/Logos/bikebook-logo-min-lg.png" }} />
      </View>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.titleText}>
          Find local <Text style={styles.goldText}>mechanics </Text>
          and compare <Text style={styles.goldText}>services</Text>
        </Text>
        <Text style={styles.subTitleText}>Join other satisfied cyclists who have found a service through bikebook.</Text>
        {/* <TextInput placeholder='Postcode' style={styles.searchInput} onChangeText={onPostcodeChange} value={postcode} /> */}
        <View style={styles.searchInputContainer}>
          <TextInput
            left={<TextInput.Icon color='rgb(40, 51, 74)' style={{ marginTop: 12 }} name='map-marker' />}
            mode={"outlined"}
            theme={{ roundness: 8 }}
            placeholder='Postcode'
            outlineColor={"#fff"}
            activeOutlineColor={"#28334A"}
            style={styles.searchInput}
            onChangeText={onPostcodeChange}
            value={postcode}
          />
        </View>
        <RNPickerSelect
          onValueChange={(value) => {
            setRadius(value);
          }}
          value={radius}
          items={[
            { label: "Within 1 mile", value: "1" },
            { label: "Within 3 miles", value: "3" },
            { label: "Within 5 miles", value: "5" },
            { label: "Within 10 miles", value: "10" },
            { label: "Within 30 miles", value: "30" },
            { label: "Within 50 miles", value: "50" },
          ]}
          style={{
            ...radiusSelectStyles,
          }}
          Icon={() => {
            return (
              <View
                style={{
                  backgroundColor: "transparent",
                  borderTopWidth: 10,
                  borderTopColor: "gray",
                  borderRightWidth: 10,
                  borderRightColor: "transparent",
                  borderLeftWidth: 10,
                  borderLeftColor: "transparent",
                  width: 0,
                  height: 0,
                }}
              />
            );
          }}
        />
        <RNPickerSelect
          onValueChange={(value) => setService(value)}
          value={service}
          placeHolder={{}}
          items={[
            ...SearchOptions.services
              .filter((x) => x.type == "service")
              .map((item) => {
                return { label: item.name, value: item.serviceId };
              }),
          ]}
          style={{
            ...servicesSelectStyles,
          }}
          Icon={() => {
            return (
              <View
                style={{
                  backgroundColor: "transparent",
                  borderTopWidth: 10,
                  borderTopColor: "gray",
                  borderRightWidth: 10,
                  borderRightColor: "transparent",
                  borderLeftWidth: 10,
                  borderLeftColor: "transparent",
                  width: 0,
                  height: 0,
                }}
              />
            );
          }}
        />
        <TouchableOpacity
          style={styles.whatServiceTextContainer}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Text style={styles.whatServiceText}>What service do I need?</Text>
        </TouchableOpacity>
        {/* <TextInput placeholder='Services' style={styles.servicesInput} onChangeText={onPostcodeChange} value={postcode} /> */}
        <Button containerStyle={styles.buttonContainer} style={styles.button} title='Search' onPress={onSearch}>
          Search
        </Button>
      </ScrollView>
      <View style={styles.centeredView}>
        <Modal
          animationType='slide'
          transparent={true}
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableOpacity style={styles.closeIcon} onPress={() => setModalVisible(false)}>
            <AntDesign name='closecircleo' size={32} color='black' />
          </TouchableOpacity>

          <ScrollView style={styles.modalView}>
            <View style={styles.dialogContainer}>
              <Text style={styles.dialogMainTitle}>What service should I get?</Text>
              <Text style={styles.dialogText}>
                Knowing what service is best for you and when to get it done is imperative for maintaining your bicycle and riding experience,
                preventing accidents and improving rider safety. This short but sweet guide aims to provide you with some useful information on when
                you should get your bicycle serviced and what service to choose.
              </Text>
              <Text style={styles.dialogText}>Key indicators that your bike is not running at its optimal performance and is due for a service:</Text>
              <View style={styles.dialogList}>
                <Text style={styles.listItem}>1. A squeaking chain can be a sign of insufficient lubrication.</Text>
                <Text style={styles.listItem}>2. Grinding, skipping or clicking noises from the gears indicate that they need adjustment.</Text>
                <Text style={styles.listItem}>
                  3. Your bike chain should never fall off the sprocket; if it does, your derailleurs may need adjustment.
                </Text>
                <Text style={styles.listItem}>4. Both brakes should engage smoothly and quietly, with only a short pull on the lever.</Text>
                <Text style={styles.listItem}>
                  5. Any rattles, wobbles or creaks should be investigated early; usually it's an easy fix, but it's best to catch it early.
                </Text>
              </View>
              <Text style={styles.dialogText}>
                If you're noticing any of these, or you notice that your bicycle feels different whist you're out on a ride it may be time for a
                service or a tune-up. As with any mechanical device, prevention is better than cure.
              </Text>
              <Text style={styles.dialogText}>
                While bicycle repair shops all offer their own unique service, it's quite common to find 3 price plans which we've called:
              </Text>
              <View style={styles.dialogList}>
                <Text style={styles.listItem}>1. Premium/Gold Service</Text>
                <Text style={styles.listItem}>2. Standard/Silver Service</Text>
                <Text style={styles.listItem}>3. Basic/Bronze Service</Text>
              </View>
              <Text style={styles.dialogText}>We recommend:</Text>
              <Text style={styles.dialogTextBold}>Basic/Bronze - Every 6 months</Text>
              <Text style={styles.dialogTextBold}>General faults after 6 months:</Text>
              <View style={styles.dialogList}>
                <Text style={styles.listItem}>1. Brakes require slightly more force than before</Text>
                <Text style={styles.listItem}>2. Squeaky chain when riding</Text>
                <Text style={styles.listItem}>3. Clicking or rattling from the gears, and the gears not always shifting first time.</Text>
                <Text style={styles.listItem}>4. Tyres slightly deflated"</Text>
              </View>
              <Text style={styles.dialogTextBold}>Standard/Silver - Every 12 months</Text>
              <Text style={styles.dialogTextBold}>General faults after 12 months:</Text>
              <View style={styles.dialogList}>
                <Text style={styles.listItem}>1. Brakes require excess force to engage</Text>
                <Text style={styles.listItem}>2. Chain showing signs of rust and stiffness</Text>
                <Text style={styles.listItem}>3. Clicking or rattling from the gears, and gears not shifting first time.</Text>
                <Text style={styles.listItem}>4. Tyres and valves worn/damaged from use.</Text>
                <Text style={styles.listItem}>5. Wheel spokes look uneven</Text>
                <Text style={styles.listItem}>6. Handlebars do not look straight</Text>
              </View>

              <Text style={styles.dialogTextBold}>Premium/Gold - Every 18-24 months</Text>
              <Text style={styles.dialogTextBold}>General faults after 18-24 months:</Text>
              <View style={styles.dialogList}>
                <Text style={styles.listItem}>1. Brakes require full pressure to engage or do not engage.</Text>
                <Text style={styles.listItem}>2. Chain completely stiff or 'over stretched'</Text>
                <Text style={styles.listItem}>
                  3. Any bearings such as the hubs, headset or brackets showing signs of wear through squeaking or grinding
                </Text>
                <Text style={styles.listItem}>4. Gears require excess force to shift or do not shift</Text>
                <Text style={styles.listItem}>5. Any cracks or damage to the frame</Text>
              </View>
              <Text style={styles.dialogText}>6. Here's what you should expect to receive from different service price plans:</Text>
              <Text style={styles.dialogTextBold}>Basic/Bronze:</Text>
              <View style={styles.dialogList}>
                <Text style={styles.listItem}>1. Frame and Fork alignment checked.</Text>
                <Text style={styles.listItem}>2. Adjustment of the gears and brakes.</Text>
                <Text style={styles.listItem}>3. Chain lubricated and checked.</Text>
                <Text style={styles.listItem}>4. Tyres inflated to specified pressures.</Text>
              </View>
              <Text style={styles.dialogTextBold}>Standard/Silver - Every included in Basic/Bronze plus:</Text>
              <View style={styles.dialogList}>
                <Text style={styles.listItem}>1. Frame and fork - General inspection.</Text>
                <Text style={styles.listItem}>2. Wheels removed, trued, tensioned and bearings adjusted.</Text>
                <Text style={styles.listItem}>3. Tyres and Valves checked for wear and damage.</Text>
                <Text style={styles.listItem}>4. Headset and bottom bracket checked for movement and adjustment.</Text>
                <Text style={styles.listItem}>5. Chain, cassette and chain set cleaned and checked for wear and lubricated.</Text>
                <Text style={styles.listItem}>6. Bottom bracket checked for operation and adjustment.</Text>
                <Text style={styles.listItem}>7. All cables checked for wear and fraying.</Text>
                <Text style={styles.listItem}>8. All brakes checked for wear and alignment.</Text>
                <Text style={styles.listItem}>
                  9. Front and rear derailleurs checked for condition and function. Adjustment of indexing and limits if required.
                </Text>
              </View>

              <Text style={styles.dialogTextBold}>Premium/Gold - Everything included in Basic/Bronze and Standard/Silver plus:</Text>
              <View style={styles.dialogList}>
                <Text style={styles.listItem}>1. Full strip down to frame and forks, frame cleaned and alignment check.</Text>
                <Text style={styles.listItem}>2. Hubs disassembled, cleaned and inspected.</Text>
                <Text style={styles.listItem}>3. Headset removed, cleaned re-greased and checked for movement.</Text>
                <Text style={styles.listItem}>4. Bottom bracket cleaned, re-greased and checked for movement.</Text>
              </View>
              <Text style={styles.dialogText}>
                Despite these different servicing plans being broadly similar across different mechanics, it must be noted that all services will vary
                slightly. Therefore, please take this into consideration and we urge you check the details of each service displayed on each mechanics
                profile.
              </Text>
            </View>
          </ScrollView>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dialogList: {
    marginLeft: 10,
    margin: 10,
  },
  listItem: {
    marginVertical: 4,
    fontFamily: "PublicSans_400Regular",
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#DAEAF2",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "PublicSans_400Regular",
  },
  scrollContainer: {
    height: "100%",
    width: "100%",
    padding: 20,
  },
  searchInputContainer: {
    borderRadius: 8,
    width: "100%",
    height: 45,
    marginTop: 0,
    marginBottom: 6,
    fontSize: 16,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 8,
  },
  searchInput: {
    fontSize: 16,
    width: "100%",
    height: 48,
    borderRadius: 8,
    backgroundColor: "white",
  },
  servicesInput: {
    height: 38,
    margin: 12,
    marginTop: 0,
    padding: 10,
    borderRadius: 8,
    width: "85%",
    backgroundColor: "white",
  },
  titleText: {
    fontFamily: "RedHatDisplay_700Bold",
    marginTop: 90,
    fontSize: 31,
    fontWeight: "700",
    padding: 23,
    paddingBottom: 0,
    paddingHorizontal: 0,
    color: "rgb(40, 51, 74)",
    textAlign: "center",
  },
  subTitleText: {
    fontSize: 18,
    marginBottom: 10,
    paddingTop: 20,
    fontWeight: "400",
    padding: 20,
    paddingLeft: 0,
    paddingRight: 10,
    marginLeft: 5,
    textAlign: "left",
    width: "92%",

    color: "rgba(0,0,0,0.64)",
  },
  whatServiceText: {
    fontSize: 16,
    marginBottom: 0,
    paddingBottom: 0,
    marginTop: 8,
    paddingTop: 0,
    fontWeight: "500",
    padding: 20,
    paddingLeft: 0,
    paddingRight: 10,
    marginLeft: 5,
    textAlign: "left",
    width: "92%",
    color: "rgba(0,0,0,0.76)",
  },
  whatServiceTextContainer: {
    width: "92%",
  },
  buttonContainer: {
    borderRadius: 8,
    backgroundColor: "rgb(40, 51, 74)",
    width: "100%",
    padding: 10,
    height: 50,
    overflow: "hidden",
    marginTop: 30,
    alignItems: "center",
    display: "flex",
    marginBottom: 30,
  },
  button: {
    color: "white",
    height: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: 5,
  },
  goldText: {
    color: "#d8a31a",
  },
  logoContainer: {
    backgroundColor: "#DAEAF2",
    width: "100%",
    height: 40,
    position: "absolute",
    top: 60,
    width: "60%",
    zIndex: 10,
  },
  logo: {
    height: 40,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    marginTop: 30,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    paddingTop: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    height: "100%",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  dialogContainer: {
    paddingBottom: 50,
    flex: 1,
  },
  dialogMainTitle: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "RedHatDisplay_700Bold",
    color: "#28334A",
    textAlign: "center",
    marginBottom: 10,
  },
  dialogTitle: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "RedHatDisplay_700Bold",
    color: "#28334A",
  },
  dialogText: {
    marginVertical: 10,
    fontSize: 16,
    fontFamily: "PublicSans_400Regular",
  },
  dialogTextBold: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "PublicSans_700Bold",
  },
  closeIcon: {
    position: "absolute",
    right: 15,
    top: 45,
    zIndex: 5000,
  },
});

const selectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    color: "black",
    backgroundColor: "white",
    height: 50,
    borderRadius: 8,
    width: "100%",
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    color: "black",
    backgroundColor: "white",
    height: 50,
    borderRadius: 8,
    width: "100%",
  },
  iconContainer: {
    top: 20,
    right: 13,
  },
};

const servicesSelectStyles = StyleSheet.create(selectStyles);
const radiusSelectStyles = StyleSheet.create({
  ...selectStyles,
  inputIOS: {
    ...selectStyles.inputIOS,
    marginTop: 10,
    marginBottom: 10,
  },
  iconContainer: {
    top: 30,
    right: 13,
  },
});
