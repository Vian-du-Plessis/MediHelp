<?php

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    exit;
}

include 'db_connection.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$request_body = file_get_contents('php://input');
$data = json_decode($request_body);

$name = $data->name;
$last = $data->last;
$age = $data->age;
$gender = $data->gender;
$email = $data->email;
$number = $data->number;
$rank = $data->rank;
$pass = $data->pass;
$image = $data->image;

list($type, $image) = explode(';', $image);
list(, $image)      = explode(',', $image);
$image = base64_decode($image);

$newPath = 'profiles/' . time() . '.jpg';
 
file_put_contents($newPath, $image);

$encryptedPassword = md5($pass);

    $sqlEmail = "SELECT * FROM receptionists WHERE email = '$email';";
    $resultEmail = mysqli_query($conn, $sqlEmail);    
    $resultCheckEmail = mysqli_num_rows($resultEmail);

    if( $resultCheckEmail > 0 ) {
        echo json_encode('Email is not available');
    }  else {
        $sql = "INSERT INTO receptionists(profile_image, name_and_surname, age, gender, phone_number, email, password, admin, id) VALUES ('$newPath','$name $last','$age','$gender','$number','$email','$encryptedPassword','$rank', NULL)";
        $result = mysqli_query($conn, $sql);

        echo json_encode("User has been added");
    } 
  
?>

