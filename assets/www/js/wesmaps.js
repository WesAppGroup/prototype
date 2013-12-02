/* Javascript for WesMaps 
 */
/* AJAX request */
var cHttpRequest;
var sHttpRequest;
var coursesJSON;
var sectionsJSON;
var coursesCounter = 0;
var COURSES_URL = 'http://stumobile0.wesleyan.edu/courses/all';
var SECTIONS_URL = 'http://stumobile0.wesleyan.edu/sections/all';


function startWesmaps() {
  /* AJAX request for all the course and section information*/
  cHttpRequest = new XMLHttpRequest();

  if (!cHttpRequest) {
    alert("Failed");
    return false;
  }

  cHttpRequest.onreadystatechange = coursesAlert;
  cHttpRequest.open("GET", COURSES_URL, true);
  cHttpRequest.send();
  console.log('course request sent');

  sHttpRequest = new XMLHttpRequest();
  if (!sHttpRequest) {
    alert("Failed");
    return false;
  }
  sHttpRequest.onreadystatechange = sectionsAlert;
  sHttpRequest.open("GET", SECTIONS_URL, true);
  sHttpRequest.send();
  console.log('sections request sent');

  function coursesAlert() {
    if (cHttpRequest.readyState === 4) {
      if (cHttpRequest.status === 200) {
        coursesJSON = $.parseJSON(cHttpRequest.responseText);
      }
      else {
        alert("Course request Failed");
      }
    }
  }
  function sectionsAlert() {
    if (sHttpRequest.readyState === 4) {
      if (sHttpRequest.status === 200) {
        sectionsJSON = $.parseJSON(sHttpRequest.responseText);
      }
      else {
        alert("Sections request Failed");
      }
    }
  }

  $(document).on("click","#wm_icon", function() {
    coursesCounter = 0;
    $("#wm_courses").empty();

    var search = $("#wm_bar > input").val();
    var searchRE = new RegExp(search, 'i');
    for (var c in coursesJSON) {

      if (coursesCounter < 10) {  //limit to 10 results
        if (searchRE.test(coursesJSON[c].value.courseTitle)) {
          writeCourse(coursesJSON[c]);
          coursesCounter++;
        }
      }
      else {
        break;
      }
    }
  });

  function writeCourse(c) {
    coursesCounter++;
    $("#wm_courses").append("<li><div class='wm_c_dnum'>" +
                              "<div class='wm_c_dep'>" +
                              c.value.courseDepartment +
                              "</div>" + 
                              "<div class='wm_c_cnum'>" +
                              c.value.courseNumber +
                              "</div>" +
                              "</div>" +
                              "<div class='wm_c_info'>" +
                              "<div class='wm_c_title'>" +
                              c.value.courseTitle + 
                              "</div>" +
                              "<div class='wm_c_expand' id='wm_c_" + c.key + "'>" +
                              "<i class='fa fa-plus-square-o fa-3x'></i>" +
                              "</div>" +
                              "<table class='hidden'>" +
                              "<tr>" +
                              "<td class='wm_c_prof'></td>" +
                              "<td class='wm_c_time'></td>" +
                              "</tr>" + 
                              "<tr>" +
                              "<td class='wm_c_seats'></td>" +
                              "<td class='wm_c_loc'></td>" +
                              "</tr>" +
                              "<tr>" + 
                              "<td class='wm_c_desc'></td>" +
                              "</tr>" + 
                              "</table>" + 
                              "</div>" + 
                              "</li>"
                            );
    $('#wm_c_' + c.key).data('key', c.key);
  }

  $(document).on("click",".wm_c_expand", function() {
    var li = $(this).parent().parent();
    var info = $(this).parent();
    var key = $(this).data().key;
    var sect;
    var crse;
    if ($(this).parent().children('.wm_c_expand').children('i').hasClass('fa-plus-square-o')) {
      console.log($(this).data());
      for (var s in sectionsJSON) {
        if (sectionsJSON[s].key === key) {
          sect = sectionsJSON[s].value;
          break;
        }
      }
      for (var c in coursesJSON) {
        if (coursesJSON[c].key === key) {
          crse = coursesJSON[c].value;
          break;
        }
      }
      info.children('table').children('tbody').children('tr').children('.wm_c_desc').html(crse.courseDescription);
      info.children('table').children('tbody').children('tr').children('.wm_c_prof').html(parseProf(sect.sectionProfessors)); 
      info.children('table').children('tbody').children('tr').children('.wm_c_time').html(sect.sectionTime);
      info.children('table').children('tbody').children('tr').children('.wm_c_loc').html(sect.sectionLocation);
      info.children('table').children('tbody').children('tr').children('.wm_c_seats').html('seats: ' + sect.sectionSeats_available);
      info.children('table').removeClass('hidden');
      info.children('.wm_c_expand').html("<i class='fa fa-minus-square-o fa-3x'></i>");
      info.addClass('wm-info-expanded');
    }
    else {
      info.children('.wm_c_expand').html("<i class='fa fa-plus-square-o fa-3x'></i>");
      info.removeClass('wm-info-expanded');
      info.children('table').addClass('hidden');

    }
  });
}
/* Parses string from course JSON in the form
  {instructor=\u003eemoran, first_name=\u003eEdward, last_name=\u003eMoran}
*/
function parseProf (prof) {
  var re = /.*?\u003e(.*?),.*?\u003e(.*?),.*?\u003e(.*?)\}/;
  var m = re.exec(prof);
  var fName = m[2];
  var lName = m[3];
  return fName + ' ' + lName;
}
