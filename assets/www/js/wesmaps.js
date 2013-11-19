/* Javascript for WesMaps 
 */
/* AJAX request */
var httpRequest;
var coursesJSON;

function startWesmaps() {
  $("#wm_search_bar").submit(function() {
    console.log("form submitted");

    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert("Failed");
      return false;
    }

    httpRequest.onreadystatechange = alertContents;
    httpRequest.open("GET", SERVER_URL)
    httpRequest.send();

  });

  function alertContents() {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        coursesJSON = httpRequest.responseText;
        console.log(coursesJSON); 
      }
      else {
        alert("Failed");
      }
    }
  }

  function writeCourse(course) {
    $("wm_courses").append("<li><h3>" + course.name + "</h3><p>" + course.prof + "</p></li>");
  }
  $("#wm_courses").append("<li><span class='course_title'>Functional Javascript </span><span class='course_prof'>Michael Fogus</span><p>Mon, Wed, Fri 9:00-10:00am</p></li>");
  $("#wm_courses").append("<li><span class='course_title'>Javascript: The Good Parts </span><span class='course_prof'>Douglas Crawford</span><p>Tue, Thu 9:00-10:20am</p></li>");
  $("#wm_courses").append("<li><span class='course_title'>Javascript: The Definitive Guide </span><span class='course_prof'>David Flanagan</span><p>Mon, Wed 1:10-2:30pm</p></li>");
    });
};

