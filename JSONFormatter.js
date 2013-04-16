var JSONFormatter = (function() {
  function repeat(str, count) {
  	return new Array(count + 1).join(str);
	}

	function trim(str) {
		return str.replace(/^\s+|\s+$/g, "");
	}

	function formatJson(str) {
		str = trim(str);
		var newStr = '';
		var pos = 0;
		var strLength = str.length;
		var indentStr = '    ';
		var newLine = '\n';
		var char = '';
		var isString = false;

		for ( var i = 0; i < strLength; i++) {

			char = str.charAt(i);

			if (char == '"') {
				if (i > 0 && str.charAt(i - 1) !== '\\') {
					isString = !isString;
				}
			}

			if (!isString) {

				if (char == '}' || char == ']') {
					newStr += newLine;
					pos = pos - 1;
					newStr += repeat(indentStr, pos);
					newStr += char;
				} else if (char == '{' || char == '[') {
					newStr += (char + newLine);
					pos = pos + 1;
					newStr += repeat(indentStr, pos);
				} else if (char == ',') {
					newStr += (char + newLine);
					newStr += repeat(indentStr, pos);
				} else {
					newStr += char;
				}
			} else {
				newStr += char;
			}
		}

		return newStr;
	}

	return {
		format : formatJson
	};
})();
