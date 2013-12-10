/* Javascript for WesMaps 
 */
/* AJAX request */
var cHttpRequest;
var sHttpRequest;
var coursesJSON;
var sectionsJSON;
var COURSES_SEARCH = 'http://stumobile0.wesleyan.edu/courses/search/';
var SECTIONS_BY_ID = 'http://stumobile0.wesleyan.edu/sections/by-id/';

function startWesmaps() {
  
  /* Searches database for courses matching search and update dom */
  $(document).on("click","#wm_icon", function() {
    $("#wm_courses").empty();

    var search = $("#wm_bar > input").val();
    var req = COURSES_SEARCH + search;

    /* AJAX request for course search */
    cHttpRequest = new XMLHttpRequest();

    if (!cHttpRequest) {
      alert("Failed");
      return false;
    }

    cHttpRequest.onreadystatechange = alertCourses;
    cHttpRequest.open("GET", req, true);
    cHttpRequest.send();
    console.log('course request sent');
    
    /* courses search callback */
    function alertCourses() {
      if (cHttpRequest.readyState === 4) {
        if (cHttpRequest.status === 200) {
          coursesJSON = undefined;
          coursesJSON = $.parseJSON(cHttpRequest.responseText);
          console.log("courses json received");
          console.log(coursesJSON);
          writeCourses();
        }
        else {
          alert("Course request Failed");
        }
      }
    }
  });

  function writeCourses() {
    var lastCourse = 0;
    var i = 0;
    var c;

    for (var cn in coursesJSON) {
      if (coursesJSON[cn].value) {
        c = coursesJSON[cn].value;
        if (lastCourse === c.courseCourseid) {
          i++;
        }
        else {
          i = 0;
        }
        lastCourse = c.courseCourseid;
        $("#wm_courses").append("<li><div class='wm_c_dnum'>" +
                                  "<div class='wm_c_dep'>" +
                                  c.courseDepartment +
                                  "</div>" + 
                                  "<div class='wm_c_cnum'>" +
                                  c.courseNumber +
                                  "</div>" +
                                  "</div>" +
                                  "<div class='wm_c_info'>" +
                                  "<div class='wm_c_title'>" +
                                  c.courseTitle + 
                                  "</div>" +
                                  "<div class='wm_c_expand' id='wm_c_" + c.courseCourseid + "'>" +
                                  "<i class='fa fa-plus-square-o fa-3x'></i>" +
                                  "</div>" +
                                  "<div class='wm-table hidden'>" +
                                  "<table>" +
                                  "<tr>" +
                                  "<td class='wm_c_prof'></td>" +
                                  "<td class='wm_c_time'></td>" +
                                  "</tr>" + 
                                  "<tr>" +
                                  "<td class='wm_c_seats'></td>" +
                                  "<td class='wm_c_loc'></td>" +
                                  "</tr>" +
                                  "<tr>" +
                                  "<td class='wm_c_sem'>" + c.courseSemester + "</td>" +
                                  "<td class='wm_c_gea'>" + c.courseGenEdArea + "</td>" +
                                  "</tr>" +
                                  "<tr>" + 
                                  "<td><textarea class='wm_c_desc'>"+ c.courseDescription + "</textarea></td>" +
                                  "</tr>" + 
                                  "</table>" + 
                                  "</div>" +
                                  "</div>" + 
                                  "</li>"
                                );
        $('#wm_c_' + c.courseCourseid).data('ccid', c.courseCourseid);
        $('#wm_c_' + c.courseCourseid).data('sid', i);
      }
    }
  }

  $(document).on("click",".wm_c_expand", function() {
    var that = $(this);
    var li = $(this).parent().parent();
    var info = $(this).parent();
    var tbody = info.children('.wm-table').children('table').children('tbody');
    var liHeight = li.height();

    var ccid = $(this).data().ccid ? $(this).data().ccid : 0;
    var sid = $(this).data().sid ? $(this).data().sid : 0;
    console.log("CCID: " + ccid + "|| SID: " + sid);
    var req = SECTIONS_BY_ID + ccid;
    
    /* AJAX sections request */
    sHttpRequest = new XMLHttpRequest();
    if (!sHttpRequest) {
      alert("Failed");
      return false;
    }

    sHttpRequest.onreadystatechange = showSection;
    sHttpRequest.open("GET", req, true);
    sHttpRequest.send();
    console.log('sections request sent');

    /* Section request callback */
    function showSection() {
      if (sHttpRequest.readyState === 4) {
        if (sHttpRequest.status === 200) {
          sectionsJSON = undefined;
          sectionsJSON = $.parseJSON(sHttpRequest.responseText);
          console.log('sections json received');
          console.log(sectionsJSON);
          console.log("sid: "+sid+" json: "+stringify(sectionsJSON));
          if (sid < sectionsJSON.length) {
            expandSection(sectionsJSON[sid].value);
          }
          else if (sectionsJSON.length > 0) {
            expandSection(sectionsJSON[sectionsJSON.length-1].value); 
          }
          else {
            expandSection({"key":"NA","value":{"sectionCourseid":"NA","sectionLocation":"NA","sectionProfessors":"NA","sectionSeats_available":"NA","sectionTime":"NA"}});
          }
        }
        else {
          alert("Sections request Failed");
        }
      }
    } 
    /* expands a course to show its section information */
    function expandSection(s) {
      if (that.children('i').hasClass('fa-plus-square-o')) {
        console.log("expanding course");
        tbody.children('tr').children('.wm_c_prof').html(parseProf(s.sectionProfessors)); 
        tbody.children('tr').children('.wm_c_time').html(s.sectionTime);
        tbody.children('tr').children('.wm_c_loc').html(s.sectionLocation);
        tbody.children('tr').children('.wm_c_seats').html('seats: ' + s.sectionSeats_available);

        info.children('.wm-table').removeClass('hidden');

        that.html("<i class='fa fa-minus-square-o fa-3x'></i>");
        info.addClass('wm-info-expanded');

        li.addClass('wm-li-expanded');  
        $('.wm_c_desc').height(400-2.5*liHeight);
      }
      else {
        console.log("collapsing course");
        that.html("<i class='fa fa-plus-square-o fa-3x'></i>");
        info.removeClass('wm-info-expanded');
        info.children('.wm-table').addClass('hidden');
        li.removeClass('wm-li-expanded');
        li.children('.wm_c_dnum').height('100%');
      }
    }
  });
}

/* Parses string from course JSON in the form
  {instructor=\u003eemoran, first_name=\u003eEdward, last_name=\u003eMoran}
*/
function parseProf (prof) {
  var fName;
  var lName;
  var m;
  var re = /.*?\u003e(.*?),.*?\u003e(.*?),.*?\u003e(.*?)\}/;
  if (re.test(prof)) {
    m = re.exec(prof);
    fName = m[2];
    lName = m[3];
    return fName + ' ' + lName;
  }
  else {
    return prof;
  }
}

function stringify(obj) {
 var t = typeof (obj);
  if (t != "object" || obj === null) {
    //simple data type
    if (t == "string") obj = '"'+obj+'"';
      return String(obj);
  }
  else {
    // recurse array or object
    var n, v, json = [], arr = (obj && obj.constructor == Array);
    for (n in obj) {
      v = obj[n]; t = typeof(v);
      if (t == "string") v = '"'+v+'"';
      else if (t == "object" && v !== null) v = JSON.stringify(v);
      json.push((arr ? "" : '"' + n + '":') + String(v));
    }
    return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
  }
}
