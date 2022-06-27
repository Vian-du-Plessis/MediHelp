<?php 
    include 'db_connection.php';

    header('Access-Control-Origin: *');
    header('Access-Control-Headers: *');

    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);

    $id = $data->id;

    $sql = "SELECT * FROM doctors WHERE id='$id';";
    $result = mysqli_query($conn, $sql);
    $resultCheck = mysqli_num_rows($result);
    
    if($resultCheck > 0){

        while($row = mysqli_fetch_assoc($result)){
            $data = $row;
        }

        $array = json_encode($data);

        echo $array;
    } else {
        echo "false";
    }
?>