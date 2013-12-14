var menus_url = "http://stumobile0.wesleyan.edu/static/usdan.json";

function startHours() { 
    console.log("Loading menus...");
    try{
      $.get(menus_url, function(data) {
          var json_data = data;
          if (json_data === undefined){
            throw err;
          }
          
          $.each($.parseJSON(json_data), function() {         
            var current_item = this;
            if (current_item.description == null){
              current_item.description = '';
            }
            var html_to_append = '<li><span class="menu_item_heading">[';
            html_to_append += current_item.category.toUpperCase() + '] ' + current_item.food;
            html_to_append += '</span><span class="menu_item_details">';
            html_to_append += current_item.description + '</span></li>';
            
            switch(current_item.meal.toLowerCase()){
              case "breakfast":
                $("#menu_breakfast > ul").append(html_to_append);
                $("#menu_breakfast").removeClass("hidden");
                break;
              case "brunch":
                $("#menu_brunch > ul").append(html_to_append);
                $("#menu_brunch").removeClass("hidden");
                break;
              case "lunch":
                $("#menu_lunch > ul").append(html_to_append);
                $("#menu_lunch").removeClass("hidden");
                break;
              case "dinner":
                $("#menu_dinner > ul").append(html_to_append);
                $("#menu_dinner").removeClass("hidden");
                break;
              default:
                console.log("Something went wrong");
            }
          });                
        }
      );
    }
    catch(err){
      console.log("Something went wrong");
    }
}
