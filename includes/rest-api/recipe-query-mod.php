<?php 

function up_rest_recipe_query($args, $request) {
    $orderBy = $request->get_param('orderByRating');

    if(isset($orderBy)){
        $args['orderby'] = 'meta_value_num';
        $arg['meta_key'] = 'recipe_rating';
    }

    return $args;
}