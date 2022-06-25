<?php
    if ($_SERVER['REQUEST_METHOD'] != 'POST') {
        exit;
    }
    include 'db_connection.php';

    header('Access-Control-Origin: *');
    header('Access-Control-Headers: *');

    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);

    $doctor = $data->docVal;
    $patient = $data->patVal;
    $patientId = $data->patIdVal;
    $time = $data->timeval;
    $date = $data->dateVal;

    if($doctor === "") {
        echo 'Doctor not selected';
    } else if($patient === ""  || $patient === ' ') {
        echo 'Patient not selected';
    } else if($patientId === ""  || $patientId === ' ') {
        echo 'Patient Id not defined';
    } else if($time === ""  || $time === ' ') {
        echo 'Time not selected';
    } else if($date === ""  || $date === ' ') {
        echo 'Date not selected';
    } else {
        $sql = "INSERT INTO appointments (`doctor`, `patient`, `patient_id`, `time`, `id`, `date`) VALUES ($doctor, $patient, $patientId, $time, NULL, $date);";
        $result = mysqli_query($conn, $sql);
        
        if(!$result){
            echo ("Error Description: " . mysqli_error($conn));
        } else {
            echo ("All is Goood! Added user");
        }
    }
?>