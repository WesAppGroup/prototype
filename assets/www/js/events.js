function startEvents() {
  console.log("starting events")
  // $(function() {
  //   var options = {
  //     classes: 'mm-light',
  //     modal: true
  //   };

  //   options.position = 'left';
  //   options.zposition = 'next';
  //   $('#event_list').mmenu(options);

  //   options.position = 'bottom';
  //   options.zposition = 'front';
  //   $('#popup-1').mmenu(options);

  //   options.position = 'right';
  //   options.zposition = 'next';
  //   $('#tooltip-2').mmenu(options);
  // });

  resizeMap = function() {
    console.log("window size change")
    $('#map-canvas').css("height", $(window).height() - 80);
  }

  $(document).ready(function() {
    resizeMap();
  });

  $(window).resize(function() {
    resizeMap();
  });

  function parse_events(event_obj) {
    // var events = [];
    var event_obj = event_obj.map(function(element) {
      return element.value;
    }).map(function(element) {
      element.eventTime = new Date(element.eventTime * 1000);
      return element
    })
    console.log(event_obj)
    return event_obj
  }
  var events = parse_events(event_data);

  var infowindow;

  function initialize() {

    var styles_array =
      [{
      "featureType": "poi.school",
      "stylers": [{
        "hue": "#91ff00"
      }, {
        "saturation": 43
      }, {
        "lightness": -5
      }, {
        "gamma": 0.99
      }, {
        "visibility": "on"
      }]
    }, {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [{
        "hue": "#3bff00"
      }, {
        "saturation": 30
      }]
    }, {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [{
        "hue": "#00bbff"
      }, {
        "gamma": 0.85
      }, {
        "saturation": -31
      }, {
        "lightness": -43
      }]
    }, {
      "featureType": "landscape.man_made",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#808080"
      }, {
        "saturation": -56
      }, {
        "lightness": 78
      }, {
        "gamma": 1
      }]
    }, {
      "featureType": "poi.sports_complex",
      "elementType": "geometry.fill",
      "stylers": [{
        "visibility": "on"
      }, {
        "weight": 0.7
      }, {
        "gamma": 0.64
      }, {
        "hue": "#e6ff00"
      }, {
        "saturation": -39
      }, {
        "lightness": -5
      }]
    }, {
      "featureType": "road.local",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#E2FFF3"
      }, {
        "gamma": 0.72
      }, {
        "lightness": 89
      }, {
        "saturation": -100
      }]
    }, {
      "featureType": "road.local",
      "elementType": "geometry.stroke",
      "stylers": [{
        "saturation": -49
      }, {
        "lightness": -50
      }, {
        "visibility": "on"
      }, {
        "color": "#ab8080"
      }, {
        "weight": 0.2
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#E2FFF3"
      }, {
        "gamma": 0.72
      }, {
        "lightness": 89
      }, {
        "saturation": -100
      }]
    }];

    var pale_dawn = [{
      "featureType": "water",
      "stylers": [{
        "visibility": "on"
      }, {
        "color": "#acbcc9"
      }]
    }, {
      "featureType": "poi.school",
      "stylers": [
        // { "hue": "#F8F0CE" }, 
        {
          "saturation": 13
        }, {
          "lightness": -5
        }, {
          "gamma": 0.99
        }, {
          "visibility": "on"
        }
      ]
    }, {
      "featureType": "landscape",
      "stylers": [{
        "color": "#f2e5d4"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{
        "color": "#c5c6c6"
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [{
        "color": "#e4d7c6"
      }]
    }, {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [{
        "color": "#fbfaf7"
      }]
    }, {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [{
        "color": "#c5dac6"
      }]
    }, {
      "featureType": "administrative",
      "stylers": [{
        "visibility": "on"
      }, {
        "lightness": 33
      }]
    }, {
      "featureType": "road"
    }, {
      "featureType": "poi.park",
      "elementType": "labels",
      "stylers": [{
        "visibility": "on"
      }, {
        "lightness": 20
      }]
    }, {}, {
      "featureType": "road",
      "stylers": [{
        "lightness": 20
      }]
    }]

    l2 = google.maps.MapTypeId.ROADMAP
    mapOptions = {
      center: new google.maps.LatLng(41.5526833, -72.6612454),
      zoom: 15,
      panControl: false,
      zoomControl: false,
      // mapTypeId: layer,
      // mapTypeControlOptions: {
      //     mapTypeIds: [layer,l2]
      // },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scaleControl: false,
      minZoom: 13,
    };
    map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);
    // map.mapTypes.set(layer, new google.maps.StamenMapType(layer));
    map.setOptions({
      styles: pale_dawn
    });

    /* spreads out markers that are close */
    var oms = new OverlappingMarkerSpiderfier(map, {
      markersWontHide: true,
      keepSpiderfied: true
    });

    /*a Adds markers for all events in 'events' to the map
     */
    var markers = [];
    var currentIW = null;
    var infoWindow = new google.maps.InfoWindow();
    var icons = {
      'Auditions': 'iconV1.png',
      'Sports': 'iconV1BLUE.png',
      'Admissions': 'iconV1GREEN.png',
      'Theater': 'iconV1PURPLE.png',
      'Student Groups': 'iconV1BLUE.png',
      'Other': 'iconV1RED.png'
    };

    function markerize(pos, str, ev) {
      var marker = new google.maps.Marker({
        position: pos,
        map: map,
        icon: {
          url: "resources/" + icons[ev.eventCategory]
        }
      });
      marker.id = ev.eventName;

      var infowindow = new google.maps.InfoWindow({
        content: str,
        maxWidth: 200
      });

      oms.addMarker(marker);

      google.maps.event.addListener(marker, 'click', function() {
        if (currentIW != null) {
          currentIW.close();
        }
        infowindow.open(map, marker);
        currentIW = infowindow;
        // setTimeout(function() {
        //     button_link = document.getElementById("bodycontent").getElementsByTagName('a')[0];
        //     button_link.onclick = function() {
        //       $('#popup-1').trigger("open")
        //     };
        //   },
        //   100
        // );
        var more = document.getElementById("events_read_more");
        more.getElementsByTagName("h4")[0].innerHTML = ev.eventName;
        content = more.getElementsByTagName("div")[0].getElementsByTagName("div")[0]
        content.innerHTML = ""
        var time = document.createElement('div');
        time.innerHTML = ev.eventTime + "<br>" + "<br>";
        var description = document.createElement('div');
        description.setAttribute('class', 'well');
        description.innerHTML = ev.eventDescription;
        var link = document.createElement('a');
        link.setAttribute('href', ev.eventLink);
        link.innerHTML = "read original";
        content.appendChild(time)
        content.appendChild(description);
        content.appendChild(link);
      });

      google.maps.event.addListener(map, 'click', function() {
        infowindow.close();
        // $('#popup-1').trigger("close");
      });
      // console.log(marker)

      return marker;
    }

    /* Adds events to map
     */
    for (var i = 0; i < events.length; i++) {
      // console.log(events[i])
      if (events[i].eventTime === undefined) {
        // console.log("no event time")
      }
      if ((events[i].eventLatitude) != 0.0 && (events[i].eventLongitude) != 0.0) {
        try {
          var desc_short = events[i].eventDescription.slice(0, 140) + "...";
        } catch (err) {
          var desc_short = events[i].eventDescription;
        }
        var content_str = '<div id="infocontent">' +
          '<a href="' + events[i].eventLink +
          '" id="firstHeading" class="firstHeading" target="_blank">' +
          events[i].eventName + '</a>' +
          '<div id="bodycontent">' +
          '<p id="info_p">' + desc_short + '</p>' +
          '<a href="#" class="goto_page" value="events_read_more">Read More</a>' +
          '</div>' +
          '</div>';


        var pos = new google.maps.LatLng(events[i].eventLatitude, events[i].eventLongitude);
        var name = events[i].eventName;
        var cat = events[i].eventCategory;

        var m = markerize(pos, content_str, events[i]);

        markers.push(m);
      }
    }
    // console.log(markers)

    var colors = {
      'Auditions': 'rgba(255, 255, 255, 0.6)',
      'Sports': 'rgba(203, 251, 255, 0.78)',
      'Admissions': 'rgba(108, 228, 108, 0.85)',
      'Theater': 'rgba(214, 119, 214, 0.86)',
      'Student Groups': 'rgba(10, 100, 200, 0.85)',
      'Other': 'red'
    };


    var cats = ['Auditions', 'Sports', 'Admissions', 'Theater', 'Student Groups', 'Other'];
    var cats_dict = {
      'Auditions': [],
      'Sports': [],
      'Admissions': [],
      'Theater': [],
      'Student Groups': [],
      'Other': []
    };

    //Add event label divs (like location, etc..). Default will be time. Location will be sorted 
    //either alphabetically or by number of members in the group. Category the same.
    // return
    function sortCategory(events, checkbox) {
      console.log("SORTING CAT")
      var cats_dict = {
        'Auditions': [],
        'Sports': [],
        'Admissions': [],
        'Theater': [],
        'Student Groups': [],
        'Other': []
      };
      keys = Object.keys(cats_dict);

      var currenttime = new Date();

      for (var i = 0; i < events.length; i++) {
        for (var z = 0; z < keys.length; z++) {
          if (events[i].eventCategory == keys[z]) {
            if (checkbox) {
              cats_dict[keys[z]].push(events[i])
            } else {
              passed = events[i].eventTime < currenttime.getTime();
              // var passed = events[i].endtime.getTime()<currenttime.getTime();
              if (!passed) {
                cats_dict[keys[z]].push(events[i])
              }
            }
          }
        }
      }
      console.log(cats_dict)

      // Creating the divs for each
      var event_list = document.getElementById("events_ul")
      event_list.innerHTML = ""
      for (var i = 0; i < keys.length; i++) {

        var div_i = document.createElement('div');
        div_i.setAttribute('id', 'cat_' + keys[i])
        div_i.setAttribute('class', 'cat_label')
        div_i.innerHTML = keys[i]
        for (var z = 0; z < cats_dict[keys[i]].length; z++) {
          var newli = document.createElement('li')
          var ev = cats_dict[keys[i]][z]
          console.log(ev)

          newli.setAttribute('style', 'background:' + colors[ev.eventCategory]) //set color style of list here if desired

          var newa = document.createElement('a')
          console.log(ev.eventName)
          console.log("A")
          newa.setAttribute('id', ev.eventName)
          newa.setAttribute('class', "event_name")
          newa.setAttribute('href', '#')
          newa.innerHTML = ev.eventName + "<br>" + ev.eventTime
          newli.appendChild(newa)
          div_i.appendChild(newli);
        }
        event_list.appendChild(div_i)
      }
      add_row_click();
    }

    //CAN probably merge sortCategory with sortLocation later...
    function sortLocation(events, checkbox) {
      var locations = {
        'Other': []
      }
      var currenttime = new Date();

      for (var i = 0; i < events.length; i++) {
        console.log(events[i].eventLocation)
        // console.log(locations)
        // console.log(events[i].eventLocation in locations)
        if (!(events[i].eventLocation in locations)) {
          if (checkbox) {
            locations[events[i].eventLocation] = [events[i]]
          } else {
              passed = events[i].eventTime < currenttime.getTime();
            // var passed = events[i].endtime.getTime() < currenttime.getTime();
            if (!passed) {
              locations[events[i].eventLocation] = [events[i]]
            }
          }
        } else {
          if (checkbox) {
            locations[events[i].eventLocation].push(events[i])
          } else {
              passed = events[i].eventTime < currenttime.getTime();
            // var passed = events[i].endtime.getTime() < currenttime.getTime();
            if (!passed) {
              locations[events[i].eventLocation].push(events[i])
            }
          }
        }
      }

      // Creating the divs for each
      keys = Object.keys(locations)
      var event_list = document.getElementById("events_ul")
      event_list.innerHTML = ""
      for (var i = 0; i < keys.length; i++) {

        //console.log("ii")
        var div_i = document.createElement('div');
        div_i.setAttribute('id', 'cat_' + keys[i])
        div_i.setAttribute('class', 'cat_label')
        div_i.innerHTML = keys[i]
        for (var z = 0; z < locations[keys[i]].length; z++) {
          var newli = document.createElement('li')
          var ev = locations[keys[i]][z]

          newli.setAttribute('style', 'background:' + colors[ev.eventCategory]) //set color style of list here if desired

          var newa = document.createElement('a')
          newa.setAttribute('id', ev.eventName)
          newa.setAttribute('class', "event_name")
          newa.setAttribute('href', '#')
          newa.innerHTML = ev.eventName + "<br>" + ev.eventTime
          newli.appendChild(newa)
          div_i.appendChild(newli);
        }
        event_list.appendChild(div_i)
      }
      add_row_click();
    }


    function sortTime(events, checkbox) {
      var event_ul = document.getElementById("events_ul")
      event_ul.innerHTML = ""
      var currenttime = new Date();
      console.log(checkbox)

      //sort by time, past to future, what if event has no time?
      var event_list = events.sort(function compareTime(a, b) {
        if (a.eventTime < b.eventTime) {
          return -1
        }
        if (a.eventTime > b.eventTime) {
          return 1
        }
        return 0
      })


      if (!checkbox) {
        console.log("!checkbox == true")
        var event_list = events.filter(function(obj) {
          return (obj.eventTime > currenttime.getTime())
        })
        console.log(event_list.length)
        console.log(event_list)

      }
      console.log(event_list.length)
      console.log(event_list)
      // console.log(event_list.length)
      // console.log(event_list)


      // console.log(event_list.length)


      //create divs for each unique day
      var divs = {}
      for (i = 0; i < event_list.length; i++) {
        // console.log(divs)
        var i_time = event_list[i].eventTime.toString().split(" ", 3).join(" ")
        // console.log(i_time)
        if (!(i_time in divs)) {
          console.log("new date div")
          var div_i = document.createElement('div');
          div_i.setAttribute('id', 'time_' + i_time)
          div_i.setAttribute('class', 'time_label')
          div_i.innerHTML = i_time
          divs[i_time] = div_i
        }

        passed = false;
        if (event_list[i].eventTime < currenttime.getTime()) {
          passed = true;
        }

        var newli = document.createElement('li')
        if (passed) {
          newli.setAttribute('style', 'background: rgba(162, 162, 162, 0.86)')
        } else {
          newli.setAttribute('style', 'background:' + colors[events[i].eventCategory]) //set color style 
        }
        var newa = document.createElement('a')
        newa.setAttribute('id', events[i].eventName)
        newa.setAttribute('class', "e_event_name")
        newa.setAttribute('href', '#')
        newa.innerHTML = events[i].eventName + "<br>" + events[i].eventTime
        newli.appendChild(newa)
        divs[i_time].appendChild(newli);
      }
      for (i in divs) {
        event_ul.appendChild(divs[i]);
      }
      add_row_click();
    }

    //Need the data first to implement this feature
    function sortSource() {}



    function add_row_click() {
      // Adds a click listener to all the rows in the event table
      $(".event_name").each(function() {
        var m;
        var name = this.id;
        $(this).click(function() {
          for (var i = 0; i < markers.length; i++) {
            if (name == markers[i].id) {
              m = markers[i];
            }
          }
          if (m != undefined && m != null) {
            google.maps.event.trigger(m, "click");
            // console.log("SD");
            $('#event_list').trigger("close");
          }
        });
      });
    }

    add_row_click()

    google.maps.event.addListener(map, 'center_changed', function() {

      var sw = new google.maps.LatLng(41.54, -72.69);
      var ne = new google.maps.LatLng(41.565, -72.63);
      var allowedBounds = new google.maps.LatLngBounds(sw, ne);
      if (!allowedBounds.contains(map.getCenter())) {
        var C = map.getCenter();
        var X = C.lng();
        var Y = C.lat();

        var AmaxX = allowedBounds.getNorthEast().lng();
        var AmaxY = allowedBounds.getNorthEast().lat();
        var AminX = allowedBounds.getSouthWest().lng();
        var AminY = allowedBounds.getSouthWest().lat();

        if (X < AminX) {
          X = AminX;
        }
        if (X > AmaxX) {
          X = AmaxX;
        }
        if (Y < AminY) {
          Y = AminY;
        }
        if (Y > AmaxY) {
          Y = AmaxY;
        }

        map.setCenter(new google.maps.LatLng(Y, X));
      }
    });

    // Try HTML5 geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude,
          position.coords.longitude);

        var curr_pos = new google.maps.Marker({
          map: map,
          position: pos,
          // content: 'Location found using HTML5.'
        });

        // map.setCenter(pos);
      }, function() {
        handleNoGeolocation(true);
      });
    } else {
      // Browser doesn't support Geolocation
      handleNoGeolocation(false);
    }

    function handleNoGeolocation(errorFlag) {
      if (errorFlag) {
        var content = 'Error: The Geolocation service failed.';
      } else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
      }
    }

    //var checkbox=false; 

    // $('#category').change(function() {
    //   if (this.checked) {
    //     //checkbox=document.getElementById('e_old').checked;
    //     sortCategory(cats_dict, events, checkbox);
    //   }
    // });

    $('#e_old').change(function() {
      if (this.checked) {
        checkbox = true;
        console.log("Miu...?")
        if (document.getElementById('e_category').checked) {
          sortCategory(events, checkbox);
        } else if (document.getElementById('e_time').checked) {
          sortTime(events, checkbox);
        } else {
          sortLocation(events, checkbox);
        }

      } else {
        checkbox = false;
        if (document.getElementById('e_category').checked) {
          sortCategory(events, checkbox);
        } else if (document.getElementById('e_time').checked) {
          sortTime(events, checkbox);
        } else {
          sortLocation(events, checkbox);
        }

      }
    });

    $('#e_location').change(function() {
      if (this.checked) {
        checkbox = document.getElementById('e_old').checked;
        sortLocation(events, checkbox);
      }
    });

    $('#e_time').change(function() {
      if (this.checked) {
        checkbox = document.getElementById('e_old').checked;
        sortTime(events, checkbox);
        // console.log("Miu")
      }
    });

    $('#e_category').change(function() {
      if (this.checked) {
        checkbox = document.getElementById('e_old').checked;
        sortCategory(events, checkbox);
        // console.log("Miu")
      }
    });


    var checkbox = false;
    sortLocation(events, checkbox);


    // console.log(events)
    /* Logic for instant search of events list. It removes events
     * that do not match the search bar from the DOM and keeps
     * them in an array. It adds them back into the DOM when the
     * do match the text in the search bar.
     */

    var removed = [];
    $("#e_search_input").keyup(function(event) {
      var search_re = new RegExp(this.value, "i");
      $("#events_ul").children("div").each(function(index) {
        // console.log(as)
        for (i = 0; i < this.getElementsByTagName('li').length; i++) {
          // console.log(as[i].id)
          var as = this.getElementsByTagName('a')
          var event_name = as[i].id;
          if (!search_re.test(event_name)) {
            // console.log("HIDE")
            $(as[i]).hide();
          } else {
            // console.log("SHOW")
            $(as[i]).show();
          }
        }
      });
    });
  }
  // google.maps.event.addDomListener(window, 'load', initialize);
  initialize();
  setTimeout(function() {
    google.maps.event.trigger(map, 'resize');
    center = new google.maps.LatLng(41.5526833, -72.6612454);
    map.setCenter(center);
  }, 100);


}

$(document).ready(function() {
  $("#event_nav")[0].addEventListener("click", function() {
    startEvents()
    console.log("starting maps")
  })
})