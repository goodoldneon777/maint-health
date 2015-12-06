function isValidDate(str) {
  // Dependencies: momentjs.
  var d = moment(str);


  // If it doesn't contain 2 a hyphens (-), forward slashes (/), or back slashes (\).
  if ( ifNull(str.match(RegExp(/\-/g)), '').length != 2  &&  ifNull(str.match(RegExp(/\//g)), '').length != 2  &&  ifNull(str.match(RegExp(/\\/g)), '').length != 2 ) {
    return false;
  }

  // If it isn't a valid date.
  if (!d.isValid()) {
  	return false;
  }

  return true;
}


function stringToDate(str) {
  // Dependencies: momentjs.
  var d = moment(str);


  // Fix for when IE defaults to 19** dates.
  if (d.year() < 2000) {
    d.add(100, 'year');
  }

  return d;
}



function prepForSQL(val, type) {
  if (val !== null) {
    val = val.replace(/'/g, "''");  //Escape single quotes.
    val = val.replace(/\\/g, "\\\\");  //Escape backslashes.
  }

  if ( (type === 'date')  &&  (val !== '') ) {
    val = stringToDate(val);
    val = moment(val).format("YYYY/M/D HH:mm");
  }

	if ( (val === '')  ||  (val === null) ) {
		return 'NULL';
	} else {
		return "'" + val + "'";
	}

}


function getURLVariable(variable) {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}


function removeChar(str, char) {
  return str.split(char).join('');
}


function countChar(str, char) {
  var search = '/\\' + char + '/g';
  return str.match(RegExp(search)).length;
}


function ifNull(val, replace) {
  if (val === null) {
    return replace;
  } else {
    return val;
  }
}



function bootstrapDialog(type, msg) {
  switch (type) {
    case 'success':
      var dialog = new BootstrapDialog({
        title: '<span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>&nbsp;&nbsp;Success',
        type: BootstrapDialog.TYPE_SUCCESS,
        message: msg,
        closable: false,
        buttons: [{
          label: 'OK',
          hotkey: 13,
          action: function(){
            dialog.close();
          }
        }]
      });
      dialog.open();
      break;
    case 'error':
      var dialog = new BootstrapDialog({
        title: '<span class="glyphicon glyphicon-ban-circle" aria-hidden="true"></span>&nbsp;&nbsp;Error',
        type: BootstrapDialog.TYPE_DANGER,
        message: msg,
        closable: false,
        buttons: [{
          label: 'OK',
          hotkey: 13,
          action: function(dialogRef){
            dialog.close();
          }
        }]
      });
      dialog.open();
      break;
    default:
      break;
    }
}




