<?php 

include 'db_connection.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$request_body = file_get_contents('php://input');
$data = json_decode($request_body);

$email = $data->email;
$password = $data->password;

$encryptedPassword = md5($password);

if($username === "" && $password === ""){
    echo "Err";
} else {
    $sql = "SELECT * FROM receptionists WHERE email = '$email' AND password = '$encryptedPassword';";
    $result = mysqli_query($conn, $sql);
    $resultCheck = mysqli_num_rows($result);

    if($resultCheck > 0){

        $emparray = array();

        while($row = mysqli_fetch_assoc($result)){
            $emparray[] = $row;
        }

        $array = array(
            "admin" => $emparray,
            "exists" => true        
        );

        echo json_encode($array);


    } else {
        echo "false";
    }

}

?>