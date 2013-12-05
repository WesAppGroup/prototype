var counter = 0;
// update when server is ready
var landmarks_data_url = "?????????????????????";


$(document).ready(function() {

  try {
    console.log("attempting to fetch landmarks data from server")
      $.get(
				landmarks_data_url, function(data) {
	  			landmarks_JSON = data
        }
      );
      if (landmarks_JSON == undefined){
				throw err
      }
  } catch (err) {
    var landmarks_JSON = '[{"value":{"longitude":"-72.654283", "facility_id":"F_336", "latitude":"41.554999", "search_terms":"200 High St, Eclectic, Eclectic Society, Phi Nu Theta, fraternity", "url":null, "name":"Eclectic", "id":"P_385", "description":"200 High Street", "campus_map_building_id":null},"key":1}, {"value":{ "longitude":null, "facility_id":"F_46", "latitude":null, "search_terms":"Winchester House, anthropology, Anthropology Department", "url":null, "name":"Anthropology", "id":"P_387", "description":"Winchester House", "campus_map_building_id":null}, "key":2}]';
    landmarksJSON = $.parseJSON(landmarks_JSON);

    $(document).on("click","#wm_icon", function() {
      counter = 0;
      $("#lm_list").empty();

      var search = $("#lm_bar > input").val();
      var searchRE = new RegExp(search, 'i');
      for (var c in landmarksJSON) {
        if (counter < 10) {  //limit to 10 results
          if (searchRE.test(landmarksJSON[c].value.search_terms)) {
            writeLandmarks(landmarksJSON[c]);
            counter++;
          }
        }
        else {
          break
        }
      }
    });
	};

  function writeLandmarks(c) {
    $("#lm_list").append("<li><div class='lm_c_dnum'>" +
                              "<div class='lm_c_dep'>" +
                              c.value.name +
                              "</div>" + 
                              "<div>" +
                              c.value.id +
                              "</div>" +
                              "</div>" +
                              "<div class='lm_c_info'>" +
                              "<div class='lm_c_title'>" +
                              c.value.description + 
                              "</div>" +
                             
                              "</div>" +

                              "</div>" + 
                              "</li>"
                            );
  }
});


		
