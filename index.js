$(function(){
	/*
	 *	escape questions and answers
	 *	before sending to server
	 *
	 */
	var TOPICS = [];
	var QTN = [];
	var nCorrect;
	var $QBox = $('#qtnDisplay'), $ABox = $('#ansDisplay');
	var TestObj;
	var file_name;

	
	$('body').on('click', 'a', function(e) {	
		console.log(e.target);
		e.preventDefault();
	})
	
	//	button -> upload
	$('#addFile').on('click', 'button', function(e) {	
		$('.upload').trigger('click');
	})
	
	//	handler for when a file is uploaded
	$('.upload').on('change', function(e) {
		if (!e.target.value || e.target.value.substr(-5) !== '.json') return;
		var fData = new FormData(document.getElementById('addFile'));
		file_name = fData.get('userfile').name;
		$.ajax({
			url: 'upload.php',
			processData: false,
			contentType: false,
			data: fData,
			type: 'POST',
			success: function(data, status) {
				TOPICS = [], QTN = [], nCorrect = 0;
				TestObj = JSON.parse(data);
				var dataObj = TestObj;
				var $edit_main = $('#edit-main');
				$edit_main.empty();
				
				/*
				 * <div id="edit-main">
				 * 	<$row>
				 * 		<col> TOPIC
				 * 		<$col>
				 * 			<$innerRow>
				 * 				<offset col>
				 * 				<col> question
				 * 				<col> answer
				 * 				<col> 
				 * 					<button>
				 * 						<img> 
				 * 
				 */
				
				for (type in dataObj) {
					var $row = $('<div class="row edit-topic"><div class="col-sm-12"><div class="row justify-content-between"><div class="col-sm-10 font-weight-bold">' + type  + '</div><div class="col-sm-1 text-center"><button class="edit-addQ btn btn-success">+Q</button></div></div></div></div>');
					var $col = $('<div class="col"><div class="row hidden-xl-down">' + type + '</div></div>');
					for (Q in dataObj[type]) {
						var $innerRow = $('<div class="row"></div>');	//	replace with makeRow function(?)
						$innerRow.append('<div class="col-sm-1"></div>');
						$innerRow.append('<div class="col edit-qtn">' + Q + '</div>');
						$innerRow.append('<div class="col edit-ans">' + dataObj[type][Q]+'</div>');
						$innerRow.append('<div class="col-sm-1 text-center"><button class="edit-btn"><img class="img-edit" src="edit-icon.png"></button><button class="save-btn"><img class="img-save" src="save-icon.png"></button><button class="clear-btn"><img class="img-clear" src="clear.png"></button></div>')
						$innerRow.find('button:not(".edit-btn")').hide();
						$col.append($innerRow);
						QTN.push(new Question(Q, dataObj[type][Q], TOPICS.length));
					}
					$row.append($col);
					$edit_main.append($row);
					TOPICS.push(type);
				}
				
				var $btnsPanel = $('#btnsPanel');
				if ($btnsPanel.children().length === 0) {
					$btnsPanel.append(makeBtn('showAns', 'SHOW'));
					$btnsPanel.append(makeBtn('right', 'RIGHT'));
					$btnsPanel.append(makeBtn('wrong', 'WRONG'));
					$btnsPanel.children(':not("#showAns")').hide();
				}
				
				displayNextQ();
				$edit_main.parent().parent().show();
				
				function makeBtn(ID, text) {
					var button = '<div class="col text-center"><button class="w-100"></button></div>';
					var $button = $(button).attr('id', ID);
					$button.children().text(text);
					return $button;
				}

			}
		})
	})
	
	//	add question handler
	$('#edit-main').on('click', '.edit-addQ', function(e){
		e.preventDefault();
		var $col = $(this.parentNode.parentNode.parentNode).siblings()
		
		var $innerRow = $('<div class="row newQ">');
		 $innerRow.append('<div class="col-sm-1"></div>');
		 $innerRow.append('<div class="col edit-qtn"><input class="form-control" type="text" placeholder="Question"></div>');
		 $innerRow.append('<div class="col edit-ans"><input class="form-control" type="text" placeholder="Answer"></div>');
		 $innerRow.append('<div class="col-sm-1 text-center"><button class="edit-btn"><img class="img-edit" src="edit-icon.png"></button><button class="save-btn"><img class="img-save" src="save-icon.png"></button><button class="clear-btn"><img class="img-save" src="clear.png"></button></div>');
		 $innerRow.find('.img-edit').parent().hide();
		 $col.append($innerRow);
	})
	
	/*
				 * <div id="edit-main">
				 * 	<$row>
				 * 		<col> TOPIC
				 * 		<$col>
				 * 			<$innerRow>
				 * 				<offset col>
				 * 				<col> question
				 * 				<col> answer
				 * 				<col> 
				 * 					<button>
				 * 						<img> 
				 * 
				 */
	
	//	new topic handler
	$('#edit-top-panel').on('click', '#topic-new', function(e) {
		$(this).hide();
		var $row = $('<div class="row edit-topic">');
		$row.append('<div class="col-sm-12"><div class="row justify-content-between"><div class="col-sm-10 font-weight-bold"><input type="text" class="form-control" placeholder="New topic"></div><div class="col-sm-1 text-center"><button id="topic-add" class="btn btn-success">ADD</button></div></div></div>');
		$('#edit-main').prepend($row);
	})
	
	//	add topic handler
	$('#edit-main').on('click', '#topic-add', function(e) {
		var $this = $(this);
		var $thisParent = $(this.parentNode);
		//	escape topic
		var topic = $('<div>').text($this.parent().siblings().children().val()).html();
		$this.parent().siblings().empty().html(topic);
		
		var $addQBtn = $('<button>');
		$addQBtn.addClass('edit-addQ btn btn-success').text('+Q');
		$this.replaceWith($addQBtn)
		var $col = $('<div class="col">');
		$col.append('<div class="row hidden-xl-down">'+ topic + '</div>');
		$thisParent.parent().parent().after($col);
		TestObj[topic] = new Object();
		$('#topic-new').show();
	})
	
	//	edit button handler
	$('#edit-main').on('click', 'button.edit-btn', function(e) {
		var $btn = $(this);
		$btn.parent().siblings(':gt(0)').each(function(ind, col) {
			var $col = $(col);
			var original = $col.text();
			var $txtbox = $('<input class="form-control" type="text">').val(original);
			var $original = $col.hasClass('edit-qtn') ? $('<p class="hidden-xl-down">' + original + '</p>') : "";
			$col.empty();
			$col.append($original);
			$col.append($txtbox);
		})
		$btn.hide().siblings().show();
	})
	
	//	save button handler
	$('#edit-main').on('click', 'button.save-btn', function(e) {
		var $this = $(this);
		
		var $qtn = $this.parent().siblings('.edit-qtn');
		var qtn = $qtn.children(':last').val();	//	get Q
		var $ans = $this.parent().siblings('.edit-ans');
		var ans = $ans.children(':last').val();	//	get A
		var originalQ = $qtn.children(':first').html();	//	get original Q
		var type = $this.parent().parent().siblings(':first').html();
		
		if (qtn === "") {	//	delete question
			$this.parent().parent().remove();
			delete TestObj[type][originalQ];
		}
		else {
			delete TestObj[type][originalQ];	//	delete question in TestObj
			
			//	escape input
			$qtn.empty().text(qtn);
			qtn = $qtn.html();	
			$ans.empty().text(ans);
			ans = $ans.html();
			$this.prev().show();
			$this.hide().next().hide();
			
			//	add to TestObj
			TestObj[type][qtn] = ans;
		}
		//	show download button
		var $wrapper = $('#edit-top-panel');
		if ($wrapper.children().children('#download').length != 0) return;
		//	$wrapper.show();
		$wrapper.children().append('<button id="download" type="button" class="btn btn-success"><img class="img-download" src="download.png"></button>');
		
	})
	
	//	download handler
	$('#edit-top-panel').on('click', '#download', function(e) {
		var jsonStr = JSON.stringify(TestObj);
		var $form = $(this).siblings();
		$form.find('[name="TestObj"]').val(jsonStr);
		$form.find('[name="filename"]').val(file_name);
		$form.trigger('submit');
	})
	
	//	clear button handler
	$('#edit-main').on('click', 'button.clear-btn', function(e) {
		var $btn = $(this)
		$btn.parent().siblings('.edit-qtn, .edit-ans').children().val('');
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