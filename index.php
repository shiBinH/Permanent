
<!--<!DOCTYPE html>-->
<html lang="en">
  <head>
    <title>Index</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
    <link rel="stylesheet" href="index.css">
  </head>
  <body class="basic">
    <div class="container">
    
      <div class="row">
        <div class="col">
          <h1 class="text-md-left text-center">
          	<a href="download.php" target="_blank">Permanent </a>
          </h1>
        </div>
        
      </div>
      
      <div class="row">
      	<div class="col-md-10">
      		<div class="row">
      			<div class="col-md-3">
      				<div id="leftPanel" class="row">
      					<div class="col-sm-12 text-md-left text-center">
      						<p class="h5">Intro to Object Oriented Programming</p>
      					</div>
    						<div class="col text-center">
    							<form id="addFile" method="post" action="upload.php" enctype="multipart/form-data">
    								<button type="button">ADD / CHANGE</button>
    								<input class="upload noDisplay" type="file" name="userfile">
    							</form>
    						</div>
      				</div>
      			</div>
                <div id="question" class="col-md-5">
                	<h2 class="text-md-left text-center h1">
                		Q
                	</h2> 
                	<p id="qtnDisplay" class="col">

                	</p>
                </div>
                <div id="answer" class="col-md-4">
                	<h2 class="text-md-left text-center h1">
                		A
                	</h2>
                	<p id="ansDisplay" class="col">
                	</p>
              	</div>
            </div>
        </div>
        <div class="col-md-2">
        	<div class="row">
        		<div class="col">
            	<p id="stats" class="h2 text-center">
            		N/A
            	</p>
            </div>
        	</div>
        	<div id="btnsPanel" class="row">
          </div>
        </div>      
      </div>

    </div>
    
    <div id="edit" class="container">
    	
    	<div id="edit-top-panel" class="row noDisplay">
    		<div class="col text-right">
    			<!--
  				<button id="download" type="button" class="btn btn-success">
  					<img class="img-download" src="download.png">
  				</button>-->
    		</div>
    	</div>
    	
      <div class="row highlight">
      	<div id="edit-main" class="col-md-11 offset-md-1">
      		<!-- 
      		<div class="row edit-topic">
      			<div class="col-sm-12">
      			  <div class="row justify-content-between">
      			   <div class="col-sm-10">
      			     Intro to Object Oriented Programming
      			   </div>
      			   <div class="col-sm-1 text-center">
      			     <a class="edit-addQ badge badge-success">
      			       +Q
      			     </a>
      			   </div>
      			  </div>
      			</div>
      			<div class="col">
      			  <hidden row>TOPic here<>
      				<div class="row">
      					<div class="col-sm-1">
      					</div>
      					<div class="col edit-qtn">
      						Question 1
      					</div>
      					<div class="col edit-ans">
      						ANSWER 1
      					</div>
      					<div class="col-sm-1">
      					 <button class="edit-btn"><img></button>
      					 <button class="save-btn"><img></button>
      					 <button class="clear-btn"><img></button>
      					</div>
      				</div>
      				<div class="row">
      					<div class="col-sm-1"></div>
      					<div class="col">
      						Question 2
      					</div>
      					<div class="col">
      						ANSWER 2
      					</div>
      				</div>
      			</div>
      		</div>
      	 -->
      	</div>
      </div>
    </div>
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
    <script src="index.js"></script>
  </body>
</html>
