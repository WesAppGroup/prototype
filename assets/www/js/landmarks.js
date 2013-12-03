var counter = 0;
var landmarks_JSON = '[{"value":{"longitude":"-72.654283", "facility_id":"F_336", "latitude":"41.554999", "search_terms":"200 High St, Eclectic, Eclectic Society, Phi Nu Theta, fraternity", "url":null, "name":"Eclectic", "id":"P_385", "description":"200 High Street", "campus_map_building_id":null},"key":1}, {"value":{ "longitude":null, "facility_id":"F_46", "latitude":null, "search_terms":"Winchester House, anthropology, Anthropology Department", "url":null, "name":"Anthropology", "id":"P_387", "description":"Winchester House", "campus_map_building_id":null}, "key":2}]';

$(document).ready(function() {
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

  function writeLandmarks(c) {
    $("#lm_list").append("<li><div class='wm_c_dnum'>" +
                              "<div class='wm_c_dep'>" +
                              c.value.name +
                              "</div>" + 
                              "<div class='wm_c_cnum'>" +
                              c.value.id +
                              "</div>" +
                              "</div>" +
                              "<div class='wm_c_info'>" +
                              "<div class='wm_c_title'>" +
                              c.value.description + 
                              "</div>" +
                             
                              "</div>" +

                              "</div>" + 
                              "</li>"
                            );
  }

});

		
