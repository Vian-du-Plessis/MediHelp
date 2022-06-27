<?php 
    include 'db_connection.php';

    header('Access-Control-Origin: *');
    header('Access-Control-Headers: *');

    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);

    $search = $data->search;

    $sql = "SELECT id, profile_image, name_and_surname, specialisation FROM `doctors` WHERE name_and_surname LIKE '$search%' OR id LIKE '$search%' OR specialisation LIKE '$search%';";
    $result = mysqli_query($conn, $sql);
    $resultCheck = mysqli_num_rows($result);
    
    if($resultCheck > 0){

        $emparray = array();

        while($row = mysqli_fetch_assoc($result)){
            $emparray[] = $row;
        }


        
        $array = array(
            "users" => $emparray,
            "start" => $search        
        );

        echo json_encode($array);

    } else {
        echo "false";
    }
?>

