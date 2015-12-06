<?php
	// Generate equipment list table.
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


	$sql = "
		select e.equip_id, e.area, e.unit, e.unit_sub, e.equip_name, e.status, p.param_color
		from equip e
		left outer join param p
			on e.status = p.param_value
		where (p.param_type = 'EQUIP_STATUS' or p.param_type is null)
		order by e.equip_name asc
		";


	$result = $conn->query($sql);
	$htmlTable = "";


	$counter = 0;
	if ($result->num_rows > 0) {

		while($row = $result->fetch_assoc()) {
			$equipID = $row['equip_id'];
			$equipName = $row['equip_name'];
			$color = $row['param_color'];
			$class = 'equipID-' . $equipID;


			$htmlTable .= '<tr class="' . $class . ' foo"><td class="equipName">' . $equipName . '</td><td class="status" style="background-color:' . $color . '"></td></tr>';

			$counter = $counter + 1;
		}

	} else {
		$htmlTable = '<tr><td colspan="2" style="text-align:center">No equipment found.</td></tr>';
	}
?>








<div class="m-equipList panel panel-primary">
	<div class="panel-heading">
    <h3 class="panel-title">Equipment List<span class="description"></span></h3>
  </div>


  <div class="container form-inline noPad-xs">

  	<div class="c-unitSelect col-xs-12 halfPad-xs">
			<select class="form-control" style="width:100%">
				<option>BF</option>
				<option>BOF</option>
				<option>Argon Station</option>
				<option>Degasser</option>
				<option>LMF</option>
				<option>Caster</option>
				<option selected>Material Handling</option>
			</select>
		</div>


		<div class="equipTable">
			<table class="table table-striped table-bordered">
				<thead style="text-align:center;">
					<th class="commentDate">Equipment</th>
					<th class="commentText">Status</th>
				</thead>
				<tbody>
					<?php echo $htmlTable; ?>
				</tbody>
			</table>
		</div>



  </div>
	



</div>