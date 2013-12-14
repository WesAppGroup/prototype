var menus_url = "http://stumobile0.wesleyan.edu/static/usdan.json";

$(document).ready(function() {
  
    console.log("Loading menus...");
    try{
      $.get(menus_url, function(data) {
          var json_data = data;
          if (json_data === undefined){
            json_data = '[{"meal":"Breakfast","category":"classics","food":"CAGE FREE SCRAMBLED EGGS","description":null},{"meal":"Breakfast","category":"classics","food":"CAGE FREE SCRAMBLED EGGS","description":"with cheddar and monterey jack cheeses"},{"meal":"Lunch","category":"STOCKPOT","food":"CREAMY POTATO LEEK SOUP","description":null},{"meal":"Lunch","category":"MONGOLIAN GRILL","food":"roasted chicken ","description":"white wine velouté"},{"meal":"Dinner","category":"mongolian grill","food":"slider night! ","description":"beef sliders vegetable wraps made without gluten wraps available upon request seasoned house made potato chips"},{"meal":"Dinner","category":"pastabilities","food":"fresh made pasta ","description":"farfalle whole grain penne"},{"meal":"Brunch","category":"classics","food":"buttermilk pancakes ","description":null}]';
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
});
