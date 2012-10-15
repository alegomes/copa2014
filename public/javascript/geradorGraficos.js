function geraCirculo(value, json) {
    var r = Raphael(value, 204, 204),
        R = 89,
        init = true,
        param1 = {
            stroke: "#fff",
            "stroke-width": 24,
            "box-shadow": "0 0 10px #000"
        },
        param2 = {
            stroke: "#fff",
            "stroke-width": 20
        },
        param3 = {
            stroke: "#fff",
            "stroke-width": 16
        },
        hash = document.location.hash;

    // Custom Attribute
    r.customAttributes.arc = function (value, total, R, colorParam) {
     	var alpha = 360 / total * value,
     	  a = (90 - alpha) * Math.PI / 180,
     	  x = 102 + R * Math.cos(a),
     	  y = 102 - R * Math.sin(a),
     	  color = "hsb(".concat(Math.round(R) / 186, ",", value / total, ", .75)"), path;

     	var color = colorParam;

     	if (total == value) {
     		path = [["M", 102, 102 - R], ["A", R, R, 0, 1, 1, 101.99, 102 - R]];
     	} else {
     		path = [["M", 102, 102 - R], ["A", R, R, 0, +(alpha > 180), 1, x, y]];
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
		updateVal(json.previsto, json.previsto, R, red, "rgba(179, 42, 47, 1)");
		updateVal(json.contratado, json.previsto, R, yellow, "rgba(241, 190, 42, 1)");
		updateVal(json.executado, json.previsto, R, green, "rgba(57, 181, 74, 1)");
		init = false;
	})();
}


function geraGrafico(id, json) {
    var r = Raphael(id);
    
    var lines = r.linechart(20, 10, 208, 100, 
        [[0, 1, 2, 3],[0, 1, 2, 3]], // Eixo - X
        [[0, 12, 30, 55],[0, 10, 20, 25]], //Eixo - Y
        { axis: "0 0 1 1", symbol: "circle", smooth: true, colors: ['rgba(241, 190, 42, 1)','rgba(57, 181, 74, 1)']}
    ).hoverColumn(function () {
        this.tags = r.set();

        for (var i = 0, ii = this.y.length; i < ii; i++) {
            this.tags.push(r.tag(this.x, this.y[i], this.values[i], 165, 10).insertBefore(this).attr([{ fill: "#fff" }, { fill: this.symbols[i].attr("fill") }]));
        }
    }, function () {
        this.tags && this.tags.remove();
    });

    lines.symbols.attr({ r: 4 });

    //Eixo X
    lines.axis[0].text.items[0].attr('text', "11/1988");
    lines.axis[0].text.items[1].attr('text', "");
    lines.axis[0].text.items[2].attr('text', "12/1988");
    lines.axis[0].text.items[3].attr('text', "");
    lines.axis[0].text.items[4].attr('text', "01/1989");
    lines.axis[0].text.items[5].attr('text', "");
    lines.axis[0].text.items[6].attr('text', "02/1989");

    //Eixo Y
    var itens = lines.axis[1].text.items;
    for (var i = 0; i < itens.length; i++) {
        itens[i].attr('text',itens[i].attr('text')+'%');
    }
}











