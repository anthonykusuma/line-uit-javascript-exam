var tbody = document.getElementsByTagName("tbody")[0];
var timer;
var isTimerOn = false;

// Function to populate the table
function fillTable() {
  var rows = [];
  for (var n = 0; n < TABLE_DATA.length; n++) {
    rows.push("<tr><td>" + TABLE_DATA[n].id   + "</td>" + 
                  "<td><img src=\"" + TABLE_DATA[n].thumbnailUrl  + "\" /></td>" + 
                  "<td>" + TABLE_DATA[n].name + "</td>" + 
                  "<td>" + TABLE_DATA[n].price  + "</td></tr>");
  }
  tbody.innerHTML = rows.join("");
}

// Shuffle every second
function shuffle() {
	TABLE_DATA.sort(function(a, b){return 0.5 - Math.random()});
	fillTable();
	timer = setTimeout(function(){ shuffle() }, 1000);
}

// Sort Function
function SortByPrice(x, y) {
	var priceDesc = y.price - x.price;
    if (priceDesc != 0) {
        return priceDesc;
    }
    return x.id - y.id;
}

window.onload=function() {
    fillTable();
    document.getElementById("stop").disabled = true;

    // Sorting Price Descending, if the price is same, sort ID ascending onclick
    document.getElementById("sort").onclick=function() {
        TABLE_DATA.sort(SortByPrice);
        fillTable();
    }

    // Start Random onclick
    document.getElementById("start").onclick=function() {
    	if(isTimerOn == false) {
			isTimerOn == true;
			shuffle();
		}
		document.getElementById("start").disabled = true;
		document.getElementById("stop").disabled = false;
		document.getElementById("sort").disabled = true;
    }

    // Stop Random onclick

    document.getElementById("stop").onclick=function() {
    	clearTimeout(timer);
    	isTimerOn = false;
    	document.getElementById("start").disabled = false;
		document.getElementById("stop").disabled = true;
		document.getElementById("sort").disabled = false;

    }

}