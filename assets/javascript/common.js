function formatFloatToString(number) {
	var string = number.toString();

	var count = 0;
	var result = "";

	var startIndex = (string.indexOf(".") != -1 ? string.indexOf(".") : string.length);

	for (var i = startIndex - 1; i >= 0; i--) {
		result = string[i] + result;

		count++;
		if (count % 3 == 0 && i != 0) {
			result = "." + result;
		}
	}

	var endString = string.substring(startIndex+1, string.length);
	if (endString.length < 2) {
		for (var i = 0; i <= 2-endString.length; i++) {
			endString += "0";
		}
	}
	return result + "," + endString;
}

function formatPercent(value, base) {
	return Math.floor(((value / base) * 100));
}

$(function() {

	var $following_bar	= $(".following-header"),
			$header_body		= $(".following-header-body"),
      $window					= $(window),
      offset					= $(".corpo").offset();

  $window.scroll(function() {
    if ($window.scrollTop() > offset.top - 70) {
      $following_bar.css("height", $header_body.height());
    } else {
      $following_bar.css("height", 0);
    }
  });

  $(".receive-updatings-button").click(function(e) {
  	e.preventDefault();

  	var modal = $("#receiveUpdatesModal");
  	modal.removeClass("hide");
  	modal.addClass("in");
  });

  $("#receiveUpdatesModal .submit").click(function(e) {
  	e.preventDefault();

  	var value = $("#email").val();
  	if ($.trim(value).length > 0) {
  		$("#receiveUpdatesForm").submit();
  	} else {
  		alert("Informe um e-mail para receber as atualizações do OpenCopa.");
  	}
  });

  $(".message").each(function() {
    var self = $(this);
    if ($.trim($("span", self).html()).length > 0) {
      self.css("height", 30);
    }

    setTimeout(function() {
      self.css("height", 0);
    }, 5000);
  });
    
});