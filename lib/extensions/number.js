Number.prototype.toCurrency = function(decimalPlaces){                               
  decimalPlaces = (decimalPlaces === undefined) ? 2 : decimalPlaces;
  var nStr = (decimalPlaces != null) ? this.toFixed(decimalPlaces) : this.toString();
	var x = nStr.split('.');
	var x1 = x[0];
	var x2 = x.length > 1 ? ',' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + '.' + '$2');
	}
	return x1 + x2;
}  

//TODO napravi i formatiranje za kolicinu, ono ako ima decimal onda se pokazuje inace ne