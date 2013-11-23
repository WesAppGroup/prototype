/* Javascript for WesMaps 
 */
/* AJAX request */
var wmHttpRequest;
var coursesJSON;
var wmScroll;
var coursesCounter = 0;

var SERVER_URL = "http://stumobile0.wesleyan.edu/courses/all"

function startWesmaps() {

  var wmScroll = new iScroll('wm_wrapper', { hScrollBar : false,
                                             vScrollBar : false,
                                             hScroll    : false,
                                             bounce     : true
                                            });
  /* AJAX request for all the course information */
  console.log("search submitted");

  wmHttpRequest = new XMLHttpRequest();

  if (!wmHttpRequest) {
    alert("Failed");
    return false;
  }

  wmHttpRequest.onreadystatechange = alertContents;
  wmHttpRequest.open("GET", SERVER_URL, true)
  wmHttpRequest.send();

  function alertContents() {
    if (wmHttpRequest.readyState === 4) {
      if (wmHttpRequest.status === 200) {
        coursesJSON = $.parseJSON(wmHttpRequest.responseText);
        console.log(coursesJSON);
      }
      else {
        alert("Failed")
      }
    }
  }

  $(document).on("keyup","#wm_search_bar > input", function() {
    console.log(this.value);
    if (this.value.length > 2) {
      var search = new RegExp(this.value, 'i');
      console.log(coursesJSON);
      for (var c in coursesJSON) {

        if (coursesCounter < 50) {  //limit to 50 results
          console.log(c);
          console.log(coursesJSON[c].value);
          console.log(coursesJSON[c].value.courseTitle);
          if (search.test(coursesJSON[c].value.courseTitle) ||
              search.test(coursesJSON[c].value.courseNumber) ||
              search.test(coursesJSON[c].value.courseDepartment) ||
              search.test(coursesJSON[c].value.courseProfessor)) {

            writeCourse(coursesJSON[c]);
          }
        }
        else {
          break
        }
      }
      
      for 
    }
  });

  function removeCourse(c) {
    coursesCounter--;


    setTimeout(function() {
      wmScroll.refresh();
    }, 0);
  }

  function writeCourse(c) {
    coursesCounter++;
    $("#wm_courses").append("<li><div class='wm_dep_num'>" +
                              "<div class='wm_dep'>" +
                              c.value.courseDepartment +
                              "</div>" + 
                              "<div class='wm_num'>" +
                              c.value.courseNumber +
                              "</div>" +
                              "</div>" +
                              "<div class='wm_course_info'>" +
                              "<div class='wm_course_title'" +
                              c.value.courseTitle + 
                              "</div>" +
                              "<div class='wm_course_prof'>" +
                              c.value.courseProfessor +
                              "</div>" +
                              "<div class='wm_course_time'>" +
                              c.value.courseTime +
                              "</div>" +
                              "</div>" + 
                              "</li>"
                            );
    setTimeout(function() {
      wmScroll.refresh();
    }, 0);
  }
}
