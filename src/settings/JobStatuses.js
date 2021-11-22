const JobStatuses = [
  {
    type: "NotStarted",
    // color: "#F5CF87",
    color: "rgb(129, 177, 255)",
    backgroundColor: "rgb(217, 232, 255)",
    name: "Not Started",
  },
  {
    type: "WaitingForBike",
    // color: "#E0E0D1",
    color: "rgb(255, 120, 0)",
    backgroundColor: "rgb(255, 215, 179)",
    name: "Waiting For Bike",
  },
  {
    type: "PendingCollection",
    // color: "#E0995E",
    color: "rgb(51, 151, 221)",
    backgroundColor: "rgb(194, 224, 245)",
    name: "Pending Collection",
  },
  {
    type: "WaitingForParts",
    // color: "#76C2AF",
    color: "rgb(255, 127, 171)",
    backgroundColor: "rgb(255, 217, 230)",
    name: "Waiting For Parts",
  },
  {
    type: "WorkingOn",
    // color: "#C75C5C",
    color: "rgb(168, 117, 255)",
    backgroundColor: "rgb(229, 214, 255)",
    name: "Working On",
  },
  {
    type: "BikeReady",
    color: "rgb(107, 201, 80)",
    // color: "#77B3D4",
    backgroundColor: "rgb(211, 239, 202)",
    name: "Bike Ready",
  },
  {
    type: "Completed",
    color: "rgb(102, 118, 132)",
    // color: "#919EAB",
    backgroundColor: "rgb(209, 214, 218)",
    name: "Completed",
  },
];

export default JobStatuses;
