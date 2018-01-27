<?php 
$method = $_SERVER['REQUEST_METHOD'];
if($method === "POST"){
    //echo parseJSON($_POST);
    $json = $_POST['jsonStr'];
    // $json = json_encode($json);
    // Перезаписываем файл
    file_put_contents('./employeesCollection.json', $json);
    // var_dump($_SERVER);
    //var_dump($_POST);
    echo $json;
}
//return true;
?>