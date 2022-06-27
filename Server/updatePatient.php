<?php 
    if ($_SERVER['REQUEST_METHOD'] != 'POST') {
        exit;
    }

    include 'db_connection.php';

    header('Access-Control-Origin: *');
    header('Access-Control-Headers: *');

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
    $rowId = $data->rowId;

    $sql = "UPDATE patients SET name_and_surname='$first $last', age='$age', gender='$gender', email='$email', phone_number='$number', sa_id='$id', medAidProvider='$medProvider', medical_aid_number='$medNumber' WHERE id='$rowId';";
    $result = mysqli_query($conn, $sql);

     if(!$result){
        echo ("Err Desc:". mysqli_error($conn));
    } else{
        echo 'True'; 
    } 
?>