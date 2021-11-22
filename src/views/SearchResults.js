import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView, TextInput, Button, Alert, FlatList, Image, TouchableOpacity, useWindowDimensions } from "react-native";
import Text from "../components/Text";
import Collapsible from "react-native-collapsible";
import RNPickerSelect from "react-native-picker-select";
import Filters from "./Filters";
import { Rating } from "react-native-ratings";
import { Avatar, Divider, ActivityIndicator } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const defaultValues = {
  radius: 30,
  postcode: "",
  keywords: [],
  bikeServiceTypes: [0],
  orderByType: "Distance",
  pageNumber: 1,
  pageSize: 30,
};

const sortByOptions = [
  {
    label: "Rating",
    value: "Rating",
  },
  { label: "Price Low", value: "PriceLow" },
  { label: "Price High", value: "PriceHigh" },
  { label: "Distance", value: "Distance" },
];

export default function SearchResults({ navigation, route }) {
  const [data, setData] = useState(null);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [loadingMoreData, setLoadingMoreData] = useState(false);
  const layout = useWindowDimensions();
  const [searchForm, setSearchForm] = useState({
    values: {
      ...defaultValues,
      postcode: route && route.params && route.params.postcode ? route.params.postcode : defaultValues.postcode,
      bikeServiceTypes: route && route.params && route.params.service ? [route.params.service] : defaultValues.bikeServiceTypes,
      radius: route && route.params && route.params.radius ? route.params.radius : defaultValues.radius,
    },
    totalItemCount: 0,
  });

  // effect to load more data
  useEffect(() => {
    // do nothing if loading more data
    if (loadingMoreData) {
      return;
    }
    // set loading more data if available
    if (data != null) {
      setLoadingMoreData(true);
    }
    // send search request
    fetch(`https://api.bikebook.co.uk/business/search?pageNumber=${searchForm.values.pageNumber}&pageSize=${searchForm.values.pageSize}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...searchForm.values }),
    })
      .then((response) => response.json())
      .then((response) => {
        // Check the incoming data
        if (response.data == null || response.data.data == null) {
          // If no data was found, set empty data
          setData([]);
        } else {
          // update the search form with our new data
          setData(response.data.data);

          // Update the search form
          setSearchForm({ ...searchForm, totalItemCount: response.data.totalItemCount });
        }
      })
      .catch((error) => {
        // Log the error
        console.error(error);
      })
      .finally(() => {
        // set loading more data false
        setLoadingMoreData(false);
      });
  }, [searchForm.values]);

  // handles end reached event on search form
  const onEndReached = () => {
    // add page size to search form if needed
    if (searchForm.totalItemCount != 0 && data != null && data.length > 0) {
      if (data.length < searchForm.totalItemCount) {
        // Update the search form
        setSearchForm({ ...searchForm, values: { ...searchForm.values, pageSize: searchForm.values.pageSize + 10 } });
      }
    }
  };

  /*
  add order by type to the search form
  Args:
   - value
  */
  const updateSortBy = (value) => {
    // Check the values
    if (value != searchForm.values.orderByType && value != null) {
      // Empty the data
      setData([]);

      // Update the search form
      setSearchForm({ ...searchForm, values: { ...searchForm.values, orderByType: value } });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {data == null ? (
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 4,
            margin: 8,
            marginTop: 50,
            height: "100%",
            width: layout.width - 16,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator animating={true} color={"#28334A"} />
          <Text style={{ marginTop: 10 }}>Loading Results</Text>
        </View>
      ) : (
        <View>
          <View
            style={{
              width: layout.width,
              height: 50,
              backgroundColor: "white",
              flexShrink: 1,
              paddingHorizontal: 20,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1,
              marginBottom: 5,
              marginTop: 10,
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity onPress={() => setFiltersVisible(true)}>
              <Text style={{ fontWeight: "600" }}>Open Filters </Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "600", paddingRight: 8 }}>Sort By:</Text>
              <RNPickerSelect
                onValueChange={(value) => {
                  updateSortBy(value);
                }}
                style={{
                  ...sortBySelectStyles,
                }}
                value={searchForm.values.orderByType}
                items={sortByOptions}
                Icon={() => {
                  return (
                    <View
                      style={{
                        backgroundColor: "transparent",
                        borderTopWidth: 6,
                        borderTopColor: "gray",
                        borderRightWidth: 6,
                        borderRightColor: "transparent",
                        borderLeftWidth: 6,
                        borderLeftColor: "transparent",
                        width: 0,
                        height: 0,
                      }}
                    />
                  );
                }}
              />
            </View>
          </View>
          <View
            style={{
              marginHorizontal: 8,
              borderRadius: 4,
              marginTop: 4,
              marginBottom: 4,
              shadowOffset: {
                width: -1,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1,
              backgroundColor: "white",
            }}
          >
            <Text style={styles.resultsText}>
              <Text style={{ fontWeight: "700" }}>{searchForm.totalItemCount}</Text>
              <Text> mechanics found in your area | </Text>
              <Text>
                {data.length} of {searchForm.totalItemCount}
              </Text>
            </Text>
          </View>

          <FlatList
            style={{ ...styles.list, width: layout.width }}
            data={data}
            onEndReached={() => {
              onEndReached();
              console.log("end reached");
            }}
            renderItem={({ item }) => {
              const { businessId, displayName, distance, profilePicture, displayPrice, averageRating, reviewCount, contactEmail, contactNumber } =
                item;
              return (
                <View style={styles.item}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Business", { business: item });
                    }}
                    style={styles.summary}
                  >
                    <View style={{}}>
                      <View style={{ flexDirection: "row" }}>
                        {profilePicture && profilePicture.profilePictureUrl ? (
                          <Image
                            style={styles.image}
                            source={{
                              uri: profilePicture?.profilePictureUrl,
                            }}
                          />
                        ) : (
                          <Avatar.Text
                            color={"white"}
                            style={{ ...styles.image, backgroundColor: "#77B3D4" }}
                            size={32}
                            label={displayName.substring(0, 1)}
                          />
                        )}
                        <View style={styles.rightSection}>
                          <View>
                            <Text style={styles.title}>{displayName}</Text>
                            <Text style={styles.distance}>{distance} Miles Away</Text>
                          </View>
                        </View>
                      </View>
                      <View style={{ justifyContent: "flex-start", alignItems: "center", flexDirection: "row", marginTop: 5 }}>
                        <Rating
                          startingValue={averageRating}
                          defaultRating={averageRating}
                          type='star'
                          size={20}
                          imageSize={20}
                          ratingCount={5}
                          readonly={true}
                          isDisabled={true}
                        />
                        <Text style={{ marginLeft: 4 }}>
                          ({averageRating}, {reviewCount} Reviews)
                        </Text>
                      </View>
                      <View style={{ marginTop: 5 }}>
                        <View style={{ flexDirection: "row" }}>
                          <MaterialIcons name='local-phone' size={19} color='black' />
                          <Text style={{ marginLeft: 3 }}>{contactNumber}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <MaterialIcons name='email' size={19} color='black' />
                          <Text style={{ marginLeft: 3 }}>{contactEmail}</Text>
                        </View>
                      </View>
                      <View style={{ marginTop: 5 }}>
                        <View style={{ flexDirection: "row" }}>
                          <View style={{ flexDirection: "row", marginRight: 10, width: 120 }}>
                            {true ? (
                              <MaterialIcons name='check-circle-outline' size={19} color='#d8a31a' />
                            ) : (
                              <MaterialCommunityIcons name='close-circle-outline' size={19} color='rgb(128, 128, 128)' />
                            )}
                            <Text style={{ marginLeft: 3 }}>Bike Services</Text>
                          </View>
                          <View style={{ flexDirection: "row", width: 120 }}>
                            {true ? (
                              <MaterialIcons name='check-circle-outline' size={19} color='#d8a31a' />
                            ) : (
                              <MaterialCommunityIcons name='close-circle-outline' size={19} color='rgb(128, 128, 128)' />
                            )}
                            <Text style={{ marginLeft: 3 }}>Fittings</Text>
                          </View>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 2 }}>
                          <View style={{ flexDirection: "row", marginRight: 10, width: 120 }}>
                            {true ? (
                              <MaterialIcons name='check-circle-outline' size={19} color='#d8a31a' />
                            ) : (
                              <MaterialCommunityIcons name='close-circle-outline' size={19} color='rgb(128, 128, 128)' />
                            )}
                            <Text style={{ marginLeft: 3 }}>EBike Services</Text>
                          </View>
                          <View style={{ flexDirection: "row", width: 120 }}>
                            {true ? (
                              <MaterialIcons name='check-circle-outline' size={19} color='#d8a31a' />
                            ) : (
                              <MaterialCommunityIcons name='close-circle-outline' size={19} color='rgb(128, 128, 128)' />
                            )}
                            <Text style={{ marginLeft: 3 }}>Extras</Text>
                          </View>
                        </View>
                      </View>
                      <Divider style={{ width: "100%", margin: 10 }} />
                      <View style={{ padding: 4, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 14, marginRight: 6, marginTop: 5 }}>from</Text>
                        <Text style={{ fontWeight: "500", fontSize: 20 }}>£{displayPrice}.00</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={(item) => item.businessId}
            ListFooterComponent={
              loadingMoreData ? (
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                  <ActivityIndicator animating={true} color={"#28334A"} style={{ marginTop: 20 }} />
                  <Text style={{ marginTop: 10 }}>Loading Results</Text>
                </View>
              ) : (
                <View></View>
              )
            }
          />
        </View>
      )}
      <Filters
        setData={setData}
        searchForm={searchForm}
        setSearchForm={setSearchForm}
        filtersVisible={filtersVisible}
        setFiltersVisible={setFiltersVisible}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#DAEAF2",
  },
  item: {
    backgroundColor: "white",
    marginVertical: 4,
    marginHorizontal: 8,
    flexDirection: "column",
    borderRadius: 4,
    width: "95%",
    padding: 10,
    shadowOffset: {
      width: -1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  summary: {
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  distance: {
    fontSize: 14,
    color: "rgba(41,43,45, 0.8)",
  },
  list: {
    width: "100%",
  },
  image: {
    width: 38,
    height: 38,
    marginRight: 6,
    borderRadius: 100,
  },
  rightSection: {
    width: "80%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  resultsText: {
    padding: 7,
  },
});

const selectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    borderRadius: 4,
    color: "black",
    backgroundColor: "white",
    height: 40,
    borderRadius: 8,
    width: "92%",
    marginRight: 20,
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
    top: 18,
    right: 0,
  },
};

const sortBySelectStyles = StyleSheet.create(selectStyles);
