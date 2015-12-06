autosize($('.m-equipDetail .equipCommentInput textarea'));


var m_equipDetail = {};



m_equipDetail.commentAdd_validate = function() {
	'use strict';
	var elem_equipCommentInput_textarea = $('.m-equipDetail .equipCommentInput textarea');
	var comment = elem_equipCommentInput_textarea.val();
	var errorText = '';


	if (comment.length === 0) {
		errorText += '<h3 style="text-align:center;">Comments can\'t be blank.</h3>';
	}

	if (errorText.length > 0) {
		bootstrapDialog('error', errorText);

		return false;
	}


	return true;
};



m_equipDetail.commentAdd_parse = function() {
	'use strict';
	var elem_equipCommentInput_textarea = $('.m-equipDetail .equipCommentInput textarea');
	var comment = elem_equipCommentInput_textarea.val();

	var obj = {
		equipComment	: prepForSQL(comment)
	};


	return obj;
};



m_equipDetail.commentList_populate = function(equipID) {
	'use strict';
	var elem_equipCommentList = $('.m-equipDetail .equipCommentList');


	$.ajax({
		type: 'POST',
    url: 'php/dist/sql-read-equipCommentList.php',
    data: {
    	'equipID' : equipID
    },
    dataType: 'json',
    success: function(results) {
    	refresh(results.html);
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) { 
    	var msg = 'Status: ' + textStatus + '\n' + 'Error: ' + errorThrown;
  		bootstrapDialog('error', msg);

  		return 'AJAX error';
  	}
	});


	function refresh(html) {
		elem_equipCommentList.find('table tbody').html(html);
	}
};