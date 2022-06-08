<?php 
    include 'db_connection.php';

    header('Access-Control-Origin: *');
    header('Access-Control-Headers: *');

    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);

    $sql = "SELECT * FROM patients;";
    $result = mysqli_query($conn, $sql);
    $resultCheck = mysqli_num_rows($result);

    if($resultCheck > 0){

        $emparray = array();

        while($row = mysqli_fetch_assoc($result)){
            $emparray[] = $row;
        }

        $array = json_encode($emparray);

        echo $array;
    } else {
        echo "false";
    }
?>