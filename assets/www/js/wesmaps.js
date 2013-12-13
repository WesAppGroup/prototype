/* Javascript for WesMaps 
 */
/* AJAX request */
var cHttpRequest;
var sHttpRequest;
var coursesJSON;
var sectionsJSON;
var COURSES_SEARCH = 'http://stumobile0.wesleyan.edu/courses/search/';
var SECTIONS_BY_ID = 'http://stumobile0.wesleyan.edu/sections/by-id/';
var dim;
var liHeight;
var liH;

function startWesmaps() {
  dim = getWindowSizes();
  console.log(dim[0] + '\t' + dim[1]);
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
  function getLiHeight() {
    return $($('li')[0]).height();
  }

  $(document).on("click",".wm_c_expand", function() {
    var that = $(this);
    var li = $(this).parent().parent();
    var info = $(this).parent();
    var tbody = info.children('.wm-table').children('table').children('tbody');

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
      var text = tbody.children('tr').children('td').children('.wm_c_desc');
      var scH = 0;
      var taH = 0;
      var loops = 0;
      liH = getLiHeight();
      liHeight = getLiHeight();
      if (that.children('i').hasClass('fa-plus-square-o')) {
        console.log("expanding course");
        tbody.children('tr').children('.wm_c_prof').html(parseProf(s.sectionProfessors)); 
        tbody.children('tr').children('.wm_c_time').html(s.sectionTime);
        tbody.children('tr').children('.wm_c_loc').html(s.sectionLocation);
        tbody.children('tr').children('.wm_c_seats').html('seats: ' + s.sectionSeats_available);

        info.children('.wm-table').removeClass('hidden');

        that.html("<i class='fa fa-minus-square-o fa-3x'></i>");
        info.addClass('wm-info-expanded');

        console.log("liH: "+liH+"\t");
        li.children('.wm_c_dnum').height(dim[1] / 10);

        scH = text[0].scrollHeight;
        taH = text.innerHeight();
        
        if (li.data().liHeight) {
          li.height(li.data().liHeight);
        }
        else {
          while (scH > (text.innerHeight())) {
            console.log('liH: '+liH+'\t');
            console.log('taH: '+taH+'\t');
            console.log('The scrollHeight '+text[0].scrollHeight+' is bigger than the textheight '+text.innerHeight());
            console.log("liHeight "+li.height());
            li.height(liHeight + 10);
            liHeight += 10;
            text.height(taH + 10);
            taH += 10;
            loops += 1;
            if (loops > 300) {
              console.log("<<<<<<<<<<<<<<<<<<<<<<SHSIIIIIT>>>>>>>>>>>>>>>>>");
              break;
            }
            console.log("liH: "+liH+"\t");
          }
          li.height(li.height() + dim[1] / 2.5);
          li.data("liHeight", li.height());
        }
      }
      else {
        console.log("collapsing course");
        console.log("liH: "+liH+"\t");
        that.html("<i class='fa fa-plus-square-o fa-3x'></i>");
        info.removeClass('wm-info-expanded');
        info.children('.wm-table').addClass('hidden');
        console.log('collapsing liH: '+liH+'\t');
        li.height(dim[1] / 10);
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

/* Gets screen dimensions */
function getWindowSizes() {
  var windowHeight = 0, windowWidth = 0;
  if (typeof (window.innerWidth) == 'number') {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
  } 
  else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
    windowHeight = document.documentElement.clientHeight;
    windowWidth = document.documentElement.clientWidth;
  } 
  else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
    windowHeight = document.body.clientHeight;
    windowWidth = document.body.clientWidth;
  }
  return [windowWidth, windowHeight];
}
