/* Javascript for rss feeds
*/
function startHours() {
};

var menusUrl = "http://stumobile0.wesleyan.edu/static/usdan.json";
var mHttpReq;

$(document).ready(function() {
  /*
  mHttpReq = new XMLHttpRequest();

  if (!mHttpReq) {
    alert('Server request failed');
    return false;
  }

  mHttpReq.onreadystatechange = alertMenu;
  mHttpReq.open("GET", menusUrl, true);
  mHttpReq.send();
  console.log("Loading menus...");

  function alertMenu() {
    if (mHttpReq.readyState === 4) {
      if (mHttpReq.status === 200) {
        console.log('menus JSON received');
        writeMenu($.parseJSON(mHttpReq.responseText));
      }
      else {
        alert("menus request failed");
      }
    }
  }
  */
  function writeMenu(json) {
    var html = "<div>";
    console.log(json);
    var bHtml = "";
    if (json.breakfast) {
      html += "<h4>Breakfast</h4>";
      for (var p in json.breakfast) {
        if (json.breakfast.hasOwnProperty(p)) {
          html += "<p>"+json.breakfast[p]+"</p>";
        }
      }
    }
    console.log(html);
    if (json.brunch) {
      html += "<h4>Brunch</h4>";
      for (var p in json.brunch) {
        if (json.lunch.hasOwnProperty(p)) {
          html += "<p>"+json.brunch[p]+"</p>";
        }
      }
    }
    console.log(html);
    if (json.lunch) {
      html += "<h4>Lunch</h4>";
      for (var p in json.lunch) {
        if (json.lunch.hasOwnProperty(p)) {
          if (json.lunch[p][0] === 'Dinner') {
            break;
          }
          html += "<p>"+json.lunch[p]+"</p>";
        }
      }
    }
    console.log(html);
    if (json.dinner) {
      html += "<h4>Dinner</h4>";
      for (var p in json.dinner) {
        if (json.dinner.hasOwnProperty(p)) {
          html += "<p>"+json.dinner[p]+"</p>";
        }
      }
    }
    console.log(html);


    $('#menus_content').html(html);
  }
});
