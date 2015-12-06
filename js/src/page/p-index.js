var page = {};


page.start = function() {
	'use strict';


	page.watch();

	page.initialize();

};


page.initialize = function() {
	'use strict';

	$('.m-equipList .equipTable tbody tr').first().click();
};


page.watch = function() {
	'use strict';
	var equipID = null;
	var equipStatusRollback = null;
	var equipStatus = null;
	var elem_equipListRow = $('.m-equipList .equipTable tbody tr');
	var elem_equipStatusDropdown = $('.m-equipDetail .equipStatusDropdown select');
	var elem_equipCommentInput_textarea = $('.m-equipDetail .equipCommentInput textarea');
	var elem_equipCommentInput_submit = $('.m-equipDetail .equipCommentInput .submit');


	elem_equipListRow.click(function() {
		page.refresh_equipDetail( $(this) );
	});


	elem_equipStatusDropdown.click(function() {
		// Store the selected 'equipment status' value before the user changes it. This will allow for rolling back the change.
		equipStatusRollback = $(this).val();
	});
	elem_equipStatusDropdown.change(function() {
    equipStatus = $(this).val();

    page.update_db_equipStatus(elem_equipStatusDropdown, equipStatusRollback);
	});


	elem_equipCommentInput_submit.click(function() {
		var equipComment = elem_equipCommentInput_textarea.val();
		page.insert_db_equipComment(equipComment);
	});

};



page.insert_db_equipComment = function(equipComment) {
	'use strict';
	var equipID = page.get_equipID();
	var obj = {};
	var elem_equipCommentInput_textarea = $('.m-equipDetail .equipCommentInput textarea');


	if ( m_equipDetail.commentAdd_validate() ) {	//If the comment is valid.
		obj = m_equipDetail.commentAdd_parse();	//Parse the comment.

		submit();	//Add the comment to the database.

		m_equipDetail.commentList_populate(equipID);	//Refresh the comment list.

		elem_equipCommentInput_textarea.val('');	//Clear comment input.
	} else {
		return false;
	}
  // page.refresh_equipList_equipStatus(equipID);



	function submit() {
		$.ajax({
			type: 'POST',
	    url: 'php/dist/sql-insert-equipComment.php',
	    data: {
	    	'equipID' : equipID,
	    	'equipComment': obj.equipComment
	    },
	    dataType: 'json',
	    success: function(results) {
	    	if (results.status === 'success') {
	    		var msg = '<h3 style="text-align:center;">Successfully update equipment status.</h3>';

	    		// bootstrapDialog('success', msg);
	    	} else {
	    		var msg = '<h3 style="text-align:center;">There was a problem. Database not updated.</h3>';

	    		bootstrapDialog('error', msg);
	    	}
	    },
	    error: function(XMLHttpRequest, textStatus, errorThrown) { 
	    	var msg = 'Status: ' + textStatus + '\n' + 'Error: ' + errorThrown;

    		bootstrapDialog('error', msg);
    	}
		});
	
		return;
	}
};



page.update_db_equipStatus = function(elem_equipStatusDropdown, equipStatusRollback) {
	'use strict';
	var equipID = page.get_equipID();
	var equipStatus = elem_equipStatusDropdown.val();


	// var dialog = new BootstrapDialog({
	// 	title: '<span class="glyphicon glyphicon-warning-sign" aria-hidden="true"></span>&nbsp;&nbsp;Warning',
	// 	type: BootstrapDialog.TYPE_WARNING,
	// 	message: '<h3 style="text-align:center;">This will change the status of the equipment. \n \nAre you sure?</h3>',
	// 	closable: false,
	// 	buttons: [
	// 		{
	// 			label: 'Cancel',
	// 			hotkey: 27,
	// 			action: function(){
	// 				dialog.close();
	// 			}
	// 		},
	// 		{
	// 			label: 'OK',
	//       cssClass: 'btn-warning',
	// 			hotkey: 13,
	// 			action: function(){
	// 				dialog.close();
	// 				submit();
 //          page.refresh_equipList_equipStatus(equipID);
	// 			}
	// 		}
	// 	]
	// });
	// dialog.open();


	submit();


	function submit() {
		$.ajax({
			type: 'POST',
	    url: 'php/dist/sql-update-equipStatus.php',
	    data: {
	    	'equipID' : equipID,
	    	'equipStatus': equipStatus
	    },
	    dataType: 'json',
	    success: function(results) {
	    	if (results.status === 'success') {
	    		// var msg = '<h3 style="text-align:center;">Successfully update equipment status.</h3>';

	    		// bootstrapDialog('success', msg);
  				page.refresh_equipList_equipStatus(equipID);
	    	} else {
	    		var msg = '<h3 style="text-align:center;">There was a problem. Database not updated.</h3>';

	    		bootstrapDialog('error', msg);
	    	}
	    },
	    error: function(XMLHttpRequest, textStatus, errorThrown) { 
	    	var msg = 'Status: ' + textStatus + '\n' + 'Error: ' + errorThrown;

    		bootstrapDialog('error', msg);
    	}
		});
	
		return;
	}
};



page.get_equipID = function() {
	'use strict';
	var selectedRow = $('.m-equipList .equipTable .highlight').parent();
	var classArr = selectedRow.attr('class').split(' ');
	var equipID = null;


	$.each(classArr, function( index, value ) {
		if (value.substring(0, 7) === 'equipID') {
	  	equipID = value.substring(value.indexOf('-') + 1);
	  }
	});


	return equipID;
};



page.refresh_equipDetail = function(selectedRow) {
	'use strict';
	var equipID = null;


	// Handle highlighting.
	$('.m-equipList .equipTable .highlight').removeClass('highlight');
	selectedRow.find('.equipName').addClass('highlight');


	// Get equipment ID.
	var classArr = selectedRow.attr('class').split(' ');

	$.each(classArr, function( index, value ) {
	  if (value.substring(0, 7) === 'equipID') {
	  	equipID = value.substring(value.indexOf('-') + 1);
	  }
	});


	m_equipDetail.commentList_populate(equipID);


	$.ajax({
		type: 'POST',
    url: 'php/dist/sql-read-equipDetail.php',
    data: {
    	'equipID' : equipID
    },
    dataType: 'json',
    success: function(results) {
    	$('.m-equipDetail .equipName').html(results.equipName);
    	$('.m-equipDetail .equipStatusDropdown select').val(results.equipStatus);
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) { 
    	var msg = 'Status: ' + textStatus + '\n' + 'Error: ' + errorThrown;

    	bootstrapDialog('error', msg);
    }
	});
};



page.refresh_equipList_equipStatus = function(equipID) {
	'use strict';


	$.ajax({
		type: 'POST',
    url: 'php/dist/sql-read-equipDetail.php',
    data: {
    	'equipID' : equipID
    },
    dataType: 'json',
    success: function(results) {
    	refresh_statusColor(equipID, results.statusColor);
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) { 
    	var msg = 'Status: ' + textStatus + '\n' + 'Error: ' + errorThrown;

    	bootstrapDialog('error', msg);
    }
	});

	
	function refresh_statusColor(equipID, color) {
		'use strict';
		var elemTarget = $('.m-equipList .equipTable tbody .equipID-' + equipID + ' .status');

		elemTarget.css('background-color', color);
	}

};








page.start();