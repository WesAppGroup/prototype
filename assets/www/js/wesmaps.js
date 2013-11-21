/* Javascript for WesMaps 
 */
/* AJAX request */
var httpRequest;
var coursesJSON;
var coursesArray = [];

var SERVER_URL = "http://stumobile0.wesleyan.edu/courses/all"

function startWesmaps() {}

$(document).ready(function() {
  $("#wm_search_button").on("click", function(e) {
    console.log("search submitted");

    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert("Failed");
      return false;
    }

    httpRequest.onreadystatechange = alertContents;
    httpRequest.open("GET", SERVER_URL, true)
    httpRequest.send();

  });

  function alertContents() {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        coursesJSON = $.parseJSON(httpRequest.responseText);
        var counter = 0;
        for (var c in coursesJSON) {
          console.log(coursesJSON[c].value);
          createCourse(coursesJSON[c].value);
           /* for testing only write first 10 */
          if (counter < 10) {
            writeCourse(coursesJSON[c].value); 
          }
          counter++;
        }
      }
      else {
        alert("Failed")
      }
    }
  }

  function writeCourse(c) {
    $("#wm_courses").append("<li><p>" + c.courseTitle + "</p></li>");
  }

  function createCourse(course) {
    coursesArray.push({ id   : course.courseCourseid,
                   dep  : course.courseDepartment,
                   desc : course.courseDescription,
                   genEd: course.courseGenEdArea,
                   cnum : course.courseNumber,
                   sem  : course.courseSemester,
                   title: course.courseTitle
                  });

    console.log(course.courseCourseid);
    console.log(course.courseDepartment);
    console.log(course.courseDescription);
    console.log(course.courseGenEdArea);
    console.log(course.courseNumber);
    console.log(course.courseSemester);
    console.log(course.courseTitle);
    
  }
});
