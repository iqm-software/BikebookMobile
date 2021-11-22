/*
extracts the services from the service groups
Args:
 - business

*/
export const ExtractServicesFromServiceGroups = (business) => {
  let services = [];
  if (business && business.serviceGroups && business.serviceGroups.length > 0) {
    for (var serviceGroupKey in business.serviceGroups) {
      var serviceGroup = business.serviceGroups[serviceGroupKey];
      if (serviceGroup.enabled && serviceGroup.services && serviceGroup.services.length > 0) {
        for (var serviceKey in serviceGroup.services) {
          var service = serviceGroup.services[serviceKey];
          if (service.enabled) {
            services.push(service);
          }
        }
      }
    }
  }
  return services;
};
