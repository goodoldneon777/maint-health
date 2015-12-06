<?php
	// Generate equipment status dropdown.
	$server = "localhost";
	$user = "maint_health_wr";
	$pass = "womanofsteel";
	$db = "maint_health";

	// Create connection
	$conn = new mysqli($server, $user, $pass, $db);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 


	$sql = 
		"select param_value, param_text " .
		"from param " .
		"where param_type = 'EQUIP_STATUS' " .
		"order by order_num asc; ";


	$result = $conn->query($sql);
	$htmlStatusDropdown = "";


	if ($result->num_rows > 0) {

		while($row = $result->fetch_assoc()) {
			$optionVal = $row['param_value'];
			$optionText = $row['param_text'];


			$htmlStatusDropdown .= '<option value="' . $optionVal . '">' . $optionText . '</option>';


		}

	} else {
		$htmlStatusDropdown = '<option>Error: No options in database</option>';
	}
?>


<div class="m-equipDetail panel panel-primary">
	<div class="panel-heading">
    <h3 class="panel-title">Equipment Detail<span class="description"></span></h3>
  </div>

  <div class="panel-content">


		<div class="container form-inline noPad-xs">
			
			

			<div class="equipName col-xs-12 halfPad-xs"></div>

		  <div class="equipStatusDropdown col-xs-12 halfPad-xs">
				<select class="form-control" style="width:100%">
					<?php echo $htmlStatusDropdown; ?>
				</select>
			</div>


			<!-- Horizontal break line -->
			<div class="col-xs-12"><hr></div>


			<div class="equipCommentInput col-xs-12 halfPad-xs">
		    <div class="input-group">
		      <textarea type="text" class="form-control" rows="1" placeholder="Enter a new comment..."></textarea>
		      <span class="input-group-btn">
		        <button class="submit btn btn-success" type="button">Submit</button>
		      </span>
		    </div>
		  </div>

		  <div class="equipCommentList col-xs-12 halfPad-xs">
		    <table class="table table-striped table-bordered">
					<thead style="text-align:center;">
						<th class="commentDate">Date</th>
						<th class="commentText">Comment</th>
					</thead>
					<tbody>
						<tr><td colspan="2" style="text-align:center"></td></tr>
					</tbody>
				</table>
		  </div>

		</div>

	</div>

</div>




<script src="js/dist/m-equipDetail.min.js"></script>
