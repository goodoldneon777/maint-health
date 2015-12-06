<?php
	$equipID = $_POST["equipID"];
	$equipComment = $_POST["equipComment"];

	$debugSQL = "";	// Will contain all the queries. For debugging purposes.

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


	mysqli_autocommit($conn, FALSE);

	$errors = array();


	$sql = 
		"insert equip_comment \n" .
		"(equip_id, comment_dt, comment_text) \n" .
		"values (" . $equipID . ", now(), " . $equipComment . "); \n";


	if (!$conn->query($sql)) {
	  $errors[] = $conn->error;
	}


	$debugSQL .= $sql;	// Will contain all the queries. For debugging purposes.


	if(count($errors) === 0) {
    $conn->commit();
    $status = "success";
	} else {
	  $conn->rollback();
	  $status = "failure";
	}


	$output = new stdClass();
	$output->status = $status;
	$output->errors = $errors;
	$output->equipID = $equipID;
	$output->debugSQL = $debugSQL;


	echo json_encode($output);


	$conn->close();
?>