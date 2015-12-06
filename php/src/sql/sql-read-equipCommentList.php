<?php
	$equipID = $_POST['equipID'];

	$debugSQL = '';
	$html = '';

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
		"select comment_seq, comment_dt, comment_text \n" .
		"from equip_comment \n" .
		"where equip_id = " . $equipID . " \n" .
		"order by comment_dt desc; \n";


	$debugSQL .= $sql;


	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			$commentDate = date_format(date_create($row["comment_dt"]), "n/j/Y H:i");
			$commentText = $row['comment_text'];
			$class = 'commentSeq-' . $row['comment_seq'];


			$html .= '<tr class="' . $class . '"><td class="commentDate">' . $commentDate . '</td><td class="commentText">' . $commentText . '</td></tr>';
		}
	} else {
		$html = '<tr><td colspan="2" style="text-align:center">No comments found.</td></tr>';
	}


	$output = new stdClass();
	$output->html = $html;
	$output->debugSQL = $debugSQL;


	echo json_encode($output);


	$conn->close();

?>