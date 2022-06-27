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
    $rank = $data->rank;
    $rowId = $data->id;

    $sql = "UPDATE SET receptionists (profile_image, name_and_surname, age, gender, phone_number, email, admin, id) VALUES (' ','$name $last','$age','$gender','$number','$email','$rank', NULL)";

    $sql = "UPDATE receptionists SET name_and_surname='$name $last',age='$age', gender='$gender',phone_number='$number',email='$email', admin='$rank' WHERE id=$rowId";
    $result = mysqli_query($conn, $sql);

     if(!$result){
        echo ("Err Desc:". mysqli_error($conn));
    } else{
        echo 'True'; 
    } 
?>