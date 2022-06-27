<?php 
    if ($_SERVER['REQUEST_METHOD'] != 'POST') {
        exit;
    }

    include 'db_connection.php';

    header('Access-Control-Origin: *');
    header('Access-Control-Headers: *');

    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);

    $doctor = $data->doctor;
    $patient = $data->patient;
    $patientId = $data->patientId;
    $time = $data->time;
    $date = $data->date;
    $rowId = $data->id;

    $sql = "UPDATE appointments SET doctor='$doctor', patient='$patient', patient_id='$patientId', time='$time', date='$date' WHERE id=$rowId;";
    $result = mysqli_query($conn, $sql);


    if(!$result){
        echo ("Err Desc:". mysqli_error($conn));
    } else{
        echo 'True'; 
    }
?>