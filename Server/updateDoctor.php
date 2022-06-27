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
    $age = $data->age;
    $gender = $data->gender;
    $email = $data->email;
    $number = $data->number;
    $special = $data->special;
    $room = $data->room;
    $rowId = $data->rowId;

    $sql = "UPDATE doctors SET name_and_surname='$name $last', age='$age', gender='$gender', email='$email', phone_number='$number', specialisation='$special', assigned_room='$room'  WHERE id='$rowId';";
    $result = mysqli_query($conn, $sql);


    if(!$result){
        echo ("Err Desc:". mysqli_error($conn));
    } else{
        echo 'True'; 
    }
?>