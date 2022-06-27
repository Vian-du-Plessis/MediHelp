<?php 
    include 'db_connection.php';

    header('Access-Control-Origin: *');
    header('Access-Control-Headers: *');

    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);

    $id = $data->id;

    $sql = "SELECT * FROM appointments WHERE id='$id';";
    $result = mysqli_query($conn, $sql);
    $resultCheck = mysqli_num_rows($result);

    $sqlDoc = "SELECT name_and_surname FROM doctors";
    $resultDoc = mysqli_query($conn, $sqlDoc);
    $resultCheckDoc = mysqli_num_rows($resultDoc);

    $sqlPat = "SELECT name_and_surname, sa_id FROM patients";
    $resultPat = mysqli_query($conn, $sqlPat);
    $resultCheckPat = mysqli_num_rows($resultPat);
    
    if($resultCheck > 0){

        $emparray = array();

        while($row = mysqli_fetch_assoc($result)){
            $emparray[] = $row;
        }

        while($docRow = mysqli_fetch_assoc($resultDoc)){
            $emparrayDoc[] = $docRow;
        }

        while($patRow = mysqli_fetch_assoc($resultPat)){
            $emparrayPat[] = $patRow;
        }

        $array = array(
            "docs" => $emparrayDoc,
            "appointment" => $emparray,
            "pats" => $emparrayPat        
        );

        echo json_encode($array);


    } else {
        echo "false";
    }
?>