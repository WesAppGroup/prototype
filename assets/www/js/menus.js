/* Javascript Menus
*/
var menusUrl = "http://stumobile0.wesleyan.edu/static/usdan.json";
var mHttpReq;

function startMenus() { 
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

  function writeMenu(json) {
    console.log(json);
    var html = "<div>";
    if (json.breakfast) {
      html += "<div><h4 class = 'menu_meal'>Breakfast</h4><div class='menu_items'>";
      for (var p in json.breakfast) {
        if (json.breakfast.hasOwnProperty(p)) {
          html += "<p>"+json.breakfast[p]+"</p>";
        }
      }
      html += "</div></div>";
    }
    console.log(html);
    if (json.brunch) {
      html += "<div><h4 class = 'menu_meal'>Brunch</h4><div class='menu_items'>";
      for (var p in json.brunch) {
        if (json.lunch.hasOwnProperty(p)) {
          html += "<p>"+json.brunch[p]+"</p>";
        }
      }
      html += "</div></div>";
    }
    console.log(html);
    if (json.lunch) {
      html += "<div><h4 class = 'menu_meal'>Lunch</h4><div class='menu_items'";
      for (var p in json.lunch) {
        if (json.lunch.hasOwnProperty(p)) {
          if (json.lunch[p][0] === 'Dinner') {
            break;
          }
          html += "<p>"+json.lunch[p]+"</p>";
        }
      }
      html += "</div></div>";
    }
    console.log(html);
    if (json.dinner) {
      html += "<div><h4 class = 'menu_meal'>Dinner</h4><div class='menu_items'";
      for (var p in json.dinner) {
        if (json.dinner.hasOwnProperty(p)) {
          html += "<p>"+json.dinner[p]+"</p>";
        }
      }
      html += "</div></div>";
    }
    $("#menus_content").html(html);
  }
}
