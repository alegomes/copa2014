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
    if ($window.scrollTop() > offset.top) {
      $following_bar.css("height", $header_body.height());
    } else {
      $following_bar.css("height", 0);
    }
  });
    
});