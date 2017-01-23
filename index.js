$(function(){
	
	var TOPICS = [];
	var QTN = [];
	var nCorrect;
	var $QBox = $('#qtnDisplay'), $ABox = $('#ansDisplay');

	
	//	prevent links
	$('body').on('click', 'a', function(e) {	
		console.log(e.target);
		e.preventDefault();
	})
	
	//	button -> upload
	$('#addFile').on('click', 'button', function(e) {	
		$('#upload').trigger('click');
	})
	
	//	handler for when a file is uploaded
	$('#upload').on('change', function(e) {
		if (!e.target.value || e.target.value.substr(-5) !== '.json') return;
		var fData = new FormData(document.getElementById('addFile'));
		fData.append('filename', e.target.name);
		$.ajax({
			url: 'upload.php',
			processData: false,
			contentType: false,
			data: fData,
			type: 'POST',
			success: function(data, status) {
				TOPICS = [], QTN = [], nCorrect = 0;
				var dataObj = JSON.parse(data);
				var $edit_main = $('#edit-main');
				$edit_main.empty();
				
				for (type in dataObj) {
					var $row = $('<div class="row edit-topic"><div class="col-sm-12">' + type  + '</div></div>');
					var $col = $('<div class="col"></div>');
					for (Q in dataObj[type]) {
						$col.append('<div class="row"><div class="col-sm-1"></div><div class="col">' + Q + '</div><div class="col">' + dataObj[type][Q] + '</div></div>');
						QTN.push(new Question(Q, dataObj[type][Q], TOPICS.length));
					}
					$row.append($col);
					$edit_main.append($row);
					TOPICS.push(type);
				}
				
				var $btnsPanel = $('#btnsPanel');
				if ($btnsPanel.children().length === 0) {
					$btnsPanel.append(makeBtn('showAns', 'SHOW'));
					$btnsPanel.append(makeBtn('right', 'CORRECT'));
					$btnsPanel.append(makeBtn('wrong', 'WRONG'));
					$btnsPanel.children(':not("#showAns")').hide();
				}
				
				displayNextQ();
				$edit_main.parent().parent().show();
				
				function makeBtn(ID, text) {
					var button = '<div class="col text-center"><button></button></div>';
					var $button = $(button).attr('id', ID);
					$button.children().text(text);
					return $button;
				}
				
				function makeRow(topic, topicObj){
					var $row = $('<div class="row edit-topic"><div class="col-sm-6">' + topic  + '</div><div class="col"></div></div>');
					
				}
			}
		})
	})
	
	//	right,wrong button handler
	$('#btnsPanel').on('click', '#right, #wrong', function(e) {
		$this = $(this);
		if ($this.attr('id') === 'right') {
			nCorrect++;
			if (nCorrect === QTN.length) {
				$this.hide().siblings().hide();
			}
		}
		displayNextQ();

	})
	
	//	show answer handler
	$('#btnsPanel').on('click', '#showAns', function(e) {
		var $showAns = $(this);
		
		$showAns.hide();
		$ABox.show();
		$showAns.siblings().show();
	})
	
	
	//	display next question & answer
	function displayNextQ() {
		$('#stats').text(nCorrect + ' / ' + QTN.length);
		if (nCorrect === QTN.length) {
			$QBox.text('');
			$ABox.text('');
			return;
		}
		var n = parseInt(Math.random() * (QTN.length-nCorrect));
		var temp = QTN[n];
		QTN[n] = QTN[QTN.length-nCorrect-1];
		var nextQ = QTN[QTN.length-nCorrect-1] = temp;
		$QBox.text(nextQ.Q);
		$ABox.text(nextQ.A);
		$ABox.hide();
		$('#right, #wrong').hide();
		$('#showAns').show();
	}
	
	function Question (Q, A, d) {
		this.Q = Q;
		this.A = A;
		this.topic = d;
	}
	
})