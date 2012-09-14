function geraCirculo(value, json) {
    var r = Raphael(value, 236, 236),
        R = 96,
        init = true,
        param1 = {
            stroke: "#fff",
            "stroke-width": 28,
            "box-shadow": "0 0 10px #000"
        },
        param2 = {
            stroke: "#fff",
            "stroke-width": 24
        },
        param3 = {
            stroke: "#fff",
            "stroke-width": 20
        },
        hash = document.location.hash;
      
    // Custom Attribute
    r.customAttributes.arc = function (value, total, R, colorParam) {
     	var alpha = 360 / total * value,
     	  a = (90 - alpha) * Math.PI / 180, 
     	  x = 116 + R * Math.cos(a), 
     	  y = 116 - R * Math.sin(a), 
     	  color = "hsb(".concat(Math.round(R) / 200, ",", value / total, ", .75)"), path;
   
     	var color = colorParam;

     	if (total == value) {
     		path = [["M", 116, 116 - R], ["A", R, R, 0, 1, 1, 115.99, 116 - R]];
     	} else {
     		path = [["M", 116, 116 - R], ["A", R, R, 0, +(alpha > 180), 1, x, y]];
     	}
     	return {path: path, stroke: color};
    };
   
    var red = r.path().attr(param1).attr({arc: [0, 100, R, "rgba(255, 0, 0, 1)"]});
    var yellow = r.path().attr(param2).attr({arc: [0, 100, R, "rgba(0, 0, 255, 1)"]});
    var green = r.path().attr(param3).attr({arc: [0, 100, R, "rgba(0, 255, 0, 1)"]});


	function updateVal(value, total, R, hand, color) {
		if (total == 31) {
			// month
			var d = new Date;
			d.setDate(1);
			d.setMonth(d.getMonth() + 1);
			d.setDate(-1);
			total = d.getDate();
		}

		// var color = "hsb(".concat(Math.round(R) / 100, ",", value / total, ", .75)");

		if (init) {
			hand.animate({arc: [value, total, R, color]}, 900, ">");
		} else {
			if (!value || value == total) {
				value = total;
				hand.animate({arc: [value, total, R, color]}, 750, "bounce", function () {
					hand.attr({arc: [0, total, R, color]});
				});
			} else {
				hand.animate({arc: [value, total, R, color]}, 750, "elastic");
			}
		}
	}

	(function () {
	  console.log(json);
		updateVal(json.previsto, json.previsto, R, red, "rgba(179, 42, 47, 1)");
		updateVal(json.contratado, json.previsto, R, yellow, "rgba(241, 190, 42, 1)");
		updateVal(json.executado, json.previsto, R, green, "rgba(57, 181, 74, 1)");
		init = false;
	})();
}















