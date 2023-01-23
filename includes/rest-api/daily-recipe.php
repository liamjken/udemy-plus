<?php

function up_rest_api_daily_recipe_handler(){
    $response = [
        'url' => '',
        'img' => '',
        'title' => ''
    ];

    $id = get_transient('up_daily_recipe_id');
    if(!$id) {
        $id = up_generate_daily_recipe();

    }
$response['url'] = get_permalink($id);
}