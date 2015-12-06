<?php
	$equipID = $_POST['equipID'];

	$debugSQL = '';

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
		"select e.equip_id, e.area, e.unit, e.unit_sub, e.equip_name, e.status, p.param_color \n" .
		"from equip e \n" .
		"left outer join param p \n" .
		"  on e.status = p.param_value \n" .
		"where  \n" .
		"  e.equip_id = " . $equipID . " \n" .
		"  and (p.param_type = 'EQUIP_STATUS' or p.param_type is null) \n" .
		"order by e.equip_name asc; \n";


	$debugSQL .= $sql;


	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		$row = $result->fetch_assoc();

		$equipName = $row["equip_name"];
		$equipStatus = $row["status"];
		$statusColor = $row["param_color"];

	} else {
		$equipName = "Equipment not found";
	}


	$output = new stdClass();
	// $output->status = $status;
	$output->equipName = $equipName;
	$output->equipStatus = $equipStatus;
	$output->statusColor = $statusColor;
	$output->equipID = $equipID;
	$output->debugSQL = $debugSQL;


	echo json_encode($output);


	$conn->close();

?>