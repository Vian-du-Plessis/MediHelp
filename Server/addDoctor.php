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
$special = $data->special;
$room = $data->room;
$image = $data->image;

list($type, $image) = explode(';', $image);
list(, $image)      = explode(',', $image);
$image = base64_decode($image);

$newPath = 'profiles/' . time() . '.jpg';
 
file_put_contents($newPath, $image);

    $sqlEmail = "SELECT * FROM doctors WHERE email = '$email';";
    $resultEmail = mysqli_query($conn, $sqlEmail);    
    $resultCheckEmail = mysqli_num_rows($resultEmail);

    if( $resultCheckEmail > 0  ) {
        echo json_encode('Email is not available');
    } else {
        $sql = "INSERT INTO doctors (id, profile_image, name_and_surname, age, gender, email, phone_number, specialisation, assigned_room) VALUES (NULL, '$newPath','$name $last','$age','$gender','$email','$number','$special','$room')";
        $result = mysqli_query($conn, $sql);

        echo json_encode("User has been added");
    } 
  
?>

