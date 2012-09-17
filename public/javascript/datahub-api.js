window.DATAHUB_URL = 'http://thedatahub.org/api/rest';
window.DataHubApi = {
  getResourceList: function(ref) {
    var resources = [];
    $.ajax({
      url: DATAHUB_URL + "/dataset/" + ref,
      dataType: 'json',
      type: "GET",
      async:false,
      success: function(json) {
        if(json.resources.length <= 4)
        {
          resources = json.resources;
        }
        else
        {
          resources[0] = json.resources[json.resources.lenght - 4]
          resources[1] = json.resources[json.resources.lenght - 3]
          resources[2] = json.resources[json.resources.lenght - 2]
          resources[3] = json.resources[json.resources.lenght - 1]
        }
      }
    });
    return resources;
  }
};