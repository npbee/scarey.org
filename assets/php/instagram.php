<?php
    // Supply a user id and an access token
    $userid = "34726828";
    //$accessToken = "34726828.5cb0360.0836775247da4a259e9ac66e3b814b0d";
    $accessToken = "34726828.7ab4d3b.7879635e77454d78868f80686a5a691e";
    $count = $_POST['count'];
    $max_id = $_POST['max_id'];

    // Gets our data
    function fetchData($url){
         $ch = curl_init();
         curl_setopt($ch, CURLOPT_URL, $url);
         curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
         curl_setopt($ch, CURLOPT_TIMEOUT, 20);
         $result = curl_exec($ch);
         curl_close($ch);
         return $result;
    }

    // Pulls and parses data.
    $url = "https://api.instagram.com/v1/users/". $userid . "/media/recent/?access_token=" . $accessToken . "&count=" . $count . "&max_id=" . $max_id;
    $result = fetchData($url);
    echo json_encode($result);
?>