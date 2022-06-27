<?php 
    include 'db_connection.php';

    header('Access-Control-Origin: *');
    header('Access-Control-Headers: *');

    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);

    $start = $data->start;
    $start = intval($start);


    $sql = "SELECT * FROM appointments LIMIT $start, 12;";
    $result = mysqli_query($conn, $sql);
    $resultCheck = mysqli_num_rows($result);
    
    $sqlCheck = "SELECT * FROM appointments;";
    $result2 = mysqli_query($conn, $sqlCheck);
    $result2Check = mysqli_num_rows($result2);

    if($resultCheck > 0){

        $emparray = array();

        while($row = mysqli_fetch_assoc($result)){
            $emparray[] = $row;
        }

        $array = array(
            "count" => $result2Check,
            "users" => $emparray,
            "start" => $start        
        );

        echo json_encode($array);


    } else {
        echo "false";
    }
?>