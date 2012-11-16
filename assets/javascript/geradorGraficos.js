function geraCirculo(value, width, height, radius, extrapolation_radius_rate, position_variation, line_weight, line_weight_delta, extrapolation_line_weight_delta, json) {

    var r = Raphael(value, width, height),
        R = radius,
        init = true,
        param1 = {
            stroke: "#fff",
            "stroke-width": line_weight,
            "box-shadow": "0 0 10px #000"
        },
        param2 = {
            stroke: "#fff",
            "stroke-width": line_weight
        },
        param3 = {
            stroke: "#fff",
            "stroke-width": line_weight - line_weight_delta
        },
        param4 = {
            stroke: "#fff",
            "stroke-width": line_weight + extrapolation_line_weight_delta
        },
        hash = document.location.hash;

    // Custom Attribute
    r.customAttributes.arc = function (value, total, R, colorParam) {
        var alpha = 360 / total * value,
          a = (90 - alpha) * Math.PI / 180,
          x = position_variation + R * Math.cos(a),
          y = position_variation - R * Math.sin(a),
          color = "hsb(".concat(Math.round(R) / 186, ",", value / total, ", .75)"), path;

        var color = colorParam;

        if (total == value) {
            path = [["M", position_variation, position_variation - R], ["A", R, R, 0, 1, 1, position_variation - 0.01, position_variation - R]];
        } else {
            path = [["M", position_variation, position_variation - R], ["A", R, R, 0, +(alpha > 180), 1, x, y]];
        }
        return {path: path, stroke: color};
    };

    var orange = r.path().attr(param4).attr({arc: [0, 100, R, "rgba(219, 132, 1, 1)"]});
    var gray = r.path().attr(param1).attr({arc: [0, 100, R, "rgba(200, 200, 200, 1)"]});
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

    //Verifica Dados Extrapolados
    var contratado = json.contratado;
    var contratado_extrapolado = 0;
    if (json.contratado > json.previsto) {
        contratado = json.previsto;
        contratado_extrapolado = json.contratado - json.previsto;
    }
    var executado = json.executado <= json.previsto ? json.executado : json.previsto;

    (function () {
        updateVal(contratado_extrapolado, json.previsto, R+extrapolation_radius_rate, orange, "rgba(219, 132, 1, 1)");
        updateVal(json.previsto, json.previsto, R, gray, "rgba(180, 180, 180, 1)");
        updateVal(contratado, json.previsto, R, yellow, "rgba(241, 190, 42, 1)");
        updateVal(executado, json.previsto, R, green, "rgba(57, 181, 74, 1)");

        
        init = false;
    })();
}


function geraGrafico(id, json) {
    var r = Raphael(id);

    var valores_contratados = [];
    var valores_executados = [];
    var datas = [];
    for (var i in json) {
        var obj = json[i];
        valores_contratados.push(Math.floor(100 * (obj['valor_contratado'] / obj['valor_previsto'])));
        valores_executados.push(Math.floor(100 * (obj['valor_executado'] / obj['valor_previsto'])));
        datas.push(i);
    }

    var lines = r.linechart(20, 15, 196, 96, 
        [datas,datas], // Eixo - X
        [valores_contratados,valores_executados], //Eixo - Y
        {axisxstep: datas.length-1, axis: "0 0 1 1", symbol: "circle", smooth: false, colors: ['rgba(241, 190, 42, 1)','rgba(57, 181, 74, 1)']}
    ).hoverColumn(function () {
        this.tags = r.set();

        for (var i = 0, ii = this.y.length; i < ii; i++) {
            this.tags.push(r.tag(this.x, this.y[i], this.values[i]+"%", 0, 4).insertBefore(this).attr([{ fill: "#fff" }, { fill: this.symbols[i].attr("fill") }]));
        }
    }, function () {
        this.tags && this.tags.remove();
    });

    lines.symbols.attr({ r: 4 });

    //Eixo X
    var items = lines.axis[0].text.items;
    for (var i in items) {
        var achou = false;
        for (var j in json) {
            if (items[i].attr('text') == (j.toString())) {
                items[i].attr('text', json[j]["data"]);
                achou = true;
                break;
            }
        }
        if (!achou) {
            items[i].remove();
        }
    }

    //Eixo Y
    var itens = lines.axis[1].text.items;
    for (var i = 0; i < itens.length; i++) {
        itens[i].attr('text',itens[i].attr('text')+'%');
    }
}