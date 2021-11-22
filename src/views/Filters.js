import React, { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View, ScrollView, useWindowDimensions } from "react-native";
import Button from "react-native-button";
import Modal from "react-native-modal";
import Text from "../components/Text";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput, Divider, Checkbox } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { SearchOptions } from "../settings/SearchOptions";
import CustomSnackbar from "../components/Snackbar";

export default function Filters({ setData, searchForm, setSearchForm, filtersVisible, setFiltersVisible, navigation, route }) {
  const [postcode, onPostcodeChange] = React.useState("BN31HS");
  const [checked, setChecked] = React.useState(false);
  const [postcodeSnackbarVisible, setPostcodeSnackbarVisible] = useState(false);
  const [radius, setRadius] = useState("1");
  const [service, setService] = useState(0);
  const layout = useWindowDimensions();

  // update search form
  const onUpdateClicked = () => {
    // Validate the postcode
    if (!postcode || /^\s*$/.test(postcode)) {
      // Display the snackbar
      setPostcodeSnackbarVisible(true);
      return;
    }

    // Empty the data
    setData([]);

    // Update the search form
    setSearchForm({
      ...searchForm,
      values: { ...searchForm.values, postcode: postcode, radius: radius, bikeServiceTypes: [service] },
      totalItemCount: 0,
    });

    // Hide the filters
    setFiltersVisible(false);
  };

  return (
    <View style={styles.centeredView}>
      <CustomSnackbar position={"top"} text={"Postcode is required."} visible={postcodeSnackbarVisible} setVisible={setPostcodeSnackbarVisible} />
      <Modal
        animationType='slide'
        transparent={true}
        coverScreen={true}
        isVisible={filtersVisible}
        onSwipeComplete={() => setFiltersVisible(false)}
        swipeDirection='down'
        hasBackdrop={false}
        style={styles.modal}
      >
        <View style={{ ...styles.modalView, width: layout.width }}>
          <TouchableOpacity style={styles.closeIcon} onPress={() => setFiltersVisible(false)}>
            <View style={{ width: 100, height: 4, borderRadius: 100, backgroundColor: "grey" }}></View>
          </TouchableOpacity>

          <ScrollView>
            {/* <TextInput mode={"outlined"} label='Email' value={""} /> */}
            <Text style={styles.titleText}>Update Filters</Text>
            <Text style={styles.subTitleText}>Refine your search</Text>
            <Divider style={{ marginBottom: 30, height: 1 }} />
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
          </ScrollView>
          <Button containerStyle={styles.buttonContainer} style={styles.button} title='Search' onPress={onUpdateClicked}>
            Update
          </Button>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: { margin: 0, bottom: 0 },
  modalView: {
    backgroundColor: "#DAEAF2",
    bottom: 0,
    position: "absolute",
    borderRadius: 20,
    marginTop: 80,
    padding: 25,
    paddingTop: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
  },
  dialogList: {
    marginLeft: 10,
    margin: 10,
  },
  listItem: {
    marginVertical: 4,
    fontFamily: "PublicSans_400Regular",
    fontSize: 16,
  },
  titleText: {
    fontFamily: "RedHatDisplay_700Bold",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 3,
    paddingHorizontal: 23,
    paddingBottom: 0,
    color: "rgb(40, 51, 74)",
    textAlign: "center",
  },
  subTitleText: {
    fontFamily: "PublicSans_400Regular",
    fontSize: 20,
    marginBottom: 20,
    paddingHorizontal: 23,
    paddingBottom: 0,
    color: "rgba(40, 51, 74, 0.75)",
    textAlign: "center",
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
  },
  button: {
    color: "white",
    height: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: 5,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
    top: 5,
    right: 130,
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
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    backgroundColor: "white",
    height: 50,
    borderRadius: 8,
    width: "90%",
    marginLeft: 20,
  },
  iconContainer: {
    top: 20,
    right: 17,
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
    right: 17,
  },
});
