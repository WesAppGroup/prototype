var counter = 0;
var LANDMARKS = "http://stumobile0.wesleyan.edu/static/json/locations.json";
var lHttpReq;


function startLandmarks() {
  var lJSON;
  var json;
  lHttpReq = new XMLHttpRequest();
  if (!lHttpReq) {
    alert("server request failed");
    return false;
  }
  lHttpReq.onreadystatechange = alertLandmarks;
  lHttpReq.open("GET", LANDMARKS, true);
  lHttpReq.send();
  console.log("attempting to fetch landmarks")

  function alertLandmarks() {
    if (lHttpReq.readyState === 4) {
      if (lHttpReq.status === 200) {
        json = undefined;
        json = $.parseJSON(lHttpReq.responseText);
        lJSON = json.hasOwnProperty('locations') ? json.locations : undefined;
        console.log('landmarks json received');
        console.log(lJSON);
      }
      else {
        alert('landmarks request failed');
      }
    }
  }
  $(document).on("click","#landmarks_icon", function() {
    counter = 0;
    $("#lm_list").empty();

    if (!lJSON) {
      alert("No data");
      return false;
    }

    var search = $("#lm_bar > input").val();
    var searchRE = new RegExp(search, 'i');

    for (var c in lJSON) {
      console.log(lJSON[c]);        
      if (counter < 5 && lJSON.hasOwnProperty(c)) {  //limit to 5 results
        if (searchRE.test(lJSON[c].search_terms)) {
          writeLandmarks(lJSON[c]);
          counter++;
        }
      }
      else {
        break;
      }
    }
  });

  function writeLandmarks(c) {
    $("#lm_list").append("<li><div class='lm_c_dnum'>" +
                              "<div class='lm_c_dep'>" +
                              c.value.name +
                              "</div>" + 
                              "<div class='lm_c_cnum'>" +
                              //c.id +
                              "</div>" +
                              "</div>" +
                              "<div class='lm_c_info'>" +
                              "<div class='lm_c_title'>" +
                              c.value.address + 
                              "</div>" +
															"<div class='lm_c_expand' id='lm_c_" + c.key + "'>" +
                              "<i class='fa fa-plus-square-o fa-3x'></i>" +
                              "</div>" +
                              "<div class='lm-table hidden'>" +
                              "<table>" +

                              "<tr>" + 
                              "<td class='lm_c_desc'></td>" +
                              "</tr>" + 
                              "</table>" + 
                              "</div>" +
                              "</div>" +
                              "</li>"
                            );
		$('#lm_c_' + c.key).data('key', c.key);
  }
	
	$(document).on("click",".lm_c_expand", function() {
			//console.log(this);
			var li = $(this).parent().parent();
			//console.log(li);
      var info = $(this).parent();
      var key = $(this).data().key;
      var sect;
      var crse;

		 if ($(this).parent().children('.lm_c_expand').children('i').hasClass('fa-plus-square-o')) {
      //console.log($(this).data());
      console.log("miu "+key);
      for (var c in lJSON) {
				console.log(c);
        if (lJSON[c].key === key) {
					//console.log("miu"+key);
          crse = lJSON[c].value;
					console.log("miu"+crse);
          break;
        }
      }
      info.children('.lm-table').children('table').children('tbody').children('tr').children('.lm_c_desc').html(crse.description);

      info.children('.lm-table').children('table').children('tbody').children('tr').children('.lm_c_prof').html(crse.url); 

      info.children('.lm-table').removeClass('hidden');

      info.children('.lm_c_expand').html("<i class='fa fa-minus-square-o fa-3x'></i>");

      info.addClass('lm-info-expanded');
    }
    else {
      info.children('.lm_c_expand').html("<i class='fa fa-plus-square-o fa-3x'></i>");
      info.removeClass('lm-info-expanded');
      info.children('.lm-table').addClass('hidden');
    }
  });
}


		
