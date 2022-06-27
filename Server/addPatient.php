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
$id = $data->id;
$age = $data->age;
$gender = $data->gender;
$email = $data->email;
$number = $data->number;
$medProvider = $data->medProvider;
$medNumber = $data->medNumber;

    $sqlEmail = "SELECT * FROM patients WHERE email = '$email';";
    $resultEmail = mysqli_query($conn, $sqlEmail);    
    $resultCheckEmail = mysqli_num_rows($resultEmail);

    $sqlID = "SELECT * FROM patients WHERE sa_id = '$id';";
    $resultID = mysqli_query($conn, $sqlID);    
    $resultCheckID = mysqli_num_rows($resultID);

    if( $resultCheckEmail > 0 && $resultCheckID > 0 ) {
        $array = array('Email is not available', 'ID number has already been used');

        echo json_encode($array);
    } else if ( $resultCheckEmail > 0 ) {
        echo json_encode("Email is not available");
    } else if ( $resultCheckID > 0) {
        echo json_encode("ID has already been used");
    } else {
        $sql = "INSERT INTO patients(id, name_and_surname, age, gender, email, phone_number, sa_id, medAidProvider, medical_aid_number, previous_appointments) VALUES (NULL,'$name $last','$age','$gender','$email','$number','$id','$medProvider','$medNumber',' ');";
        $result = mysqli_query($conn, $sql);

        echo json_encode("User has been added");
    } 
  
?>

