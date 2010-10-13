<?php
/*
Plugin Name: Promote JS
Plugin URI: http://promotejs.com
Description: Better documentation
Author: Remy Sharp (port of Chris William's JS)
Version: 1
*/

function widget_promotejs($args) {
  extract($args);
  echo $before_widget;
  promotejs();
  echo $after_widget;
}

function promotejs() {
	$wide = get_option('widget_promotejs_wide');
	// show image
	
	$global_objects = array(
      "Array" => array("isArray", "constructor", "index", "input", "length", "pop", "push", "reverse", "shift", "sort", "splice", "unshift", "concat", "join", "slice", "toString", "indexOf", "lastIndexOf", "forEach", "map", "some", "every", "filter", "Creating an Array", "Example: Creating a Two-dimensional Array"),
      "String" => array("prototype", "fromCharCode", "constructor", "length", "charAt", "concat", "indexOf", "lastIndexOf", "localeCompare", "match", "replace", "search", "slice", "split", "substr", "substring", "toLocaleLowerCase", "toLocaleUpperCase","toLowerCase", "toString", "toUpperCase", "valueOf"),
      "Number" => array("toExponential", "toFixed", "toLocaleString", "toPrecision", "toString", "valueOf", "Example: Using the Number object to assign values to numeric variables", "Example: Using Number to convert a Date object"),
      "RegExp" => array("constructor", "global", "ignoreCase", "lastIndex", "multiline", "source", "exec", "test", "toString", "Example: Using a regular expression to change data format", "Example: Using a regular expression with the sticky flag"),
      "Function" => array("prototype", "arguments", "arity", "constructor", "length", "apply", "call", "toString", "Example: Specifying arguments with the Function constructor")
  );

  $combinations = array();

  foreach ($global_objects as $i => $attrs) { 
      foreach ($attrs as $idx => $val) {
          $seo_string = array("JS ",$i," ",$val,", JavaScript ", $i, " ", $val);
          if (stripos($val, " ") < 0) {
              $seo_string = array_merge($seo_string, array(", JS ",$i, " .",$val,", JavaScript ", $i, " .", $val));
          }

          $parts = explode(",",implode("", $seo_string));
          foreach ($parts as $elem) {
            array_push($combinations, array(trim($elem), "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/".$i));
          }
      }
  }
  
  $images = array(
      array("http://static.jsconf.us/promotejsv.gif", "280", "160"),
      array("http://static.jsconf.us/promotejsh.gif", "150", "180")
  );

  array_push($combinations, array("JS Screencasts, Learn JS, JS Videos, JavaScript Screencasts, JS Education, JS Training, Proper JS", "http://learnjs.org"));
  array_push($combinations, array("Learning JavaScript with Object Graphs", "http://howtonode.org/object-graphs"));
  array_push($combinations, array("In Search of JavaScript Developers: A Gist", "http://blog.rebeccamurphey.com/in-search-of-javascript-developers-a-gist"));
  array_push($combinations, array("On Rolling Your Own, Enterprise jQuery, Enterprise JavaScript, Enterprise JS", "http://blog.rebeccamurphey.com/on-rolling-your-own"));
  array_push($combinations, array("Proper JS, Proper JavaScript Training, JS Tutorial, Learning JS, Eloquent JavaScript, Eloquent JS, JS Data Structures, JS DOM", "http://eloquentjavascript.net"));
  array_push($combinations, array("jQuery, jQuery Fundamantals, JS Fundamentals, JS jQuery, Learn jQuery, jQuery done right, Best jQuery Tutorial, best jQuery training", "http://jqfundamentals.com/book/book.html"));

  $tutorial_options = array("JS Tutorial", "JavaScript Tutorial", "JavaScript Guide", "Learn JavaScript JS", "How To Learn JS", "Learning JavaScript");
  $reference_options = array("JavaScript Reference", "JavaScript Guide", "JavaScript API", "JS API", "JS Guide", "JS Reference", "Learn JS", "JS Documentation");

  $counter = rand(1, 10);
	$alt = $tutorial_options[rand(0, count($tutorial_options)-1)];
  $href = "https://developer.mozilla.org/en/JavaScript/Guide";
  if ($counter % 10 == 0) {
      $alt = $reference_options[rand(0, count($reference_options) -1)];
      $href = "https://developer.mozilla.org/en/JavaScript";
  } else if ($counter % 5 != 0) {
    $i = rand(0, count($combinations)-1);
      $combo = $combinations[$i];
      $alt = $combo[0];
      $href = $combo[1];
  }

  $img = $images[$wide == true];
  $src = $img[0];
  $height = $img[1];
  $width = $img[2];
  
  ?>  
  <a href='<?php echo $href ?>' title='<?php echo $alt ?>'><img src='<?php echo $src ?>' height='<?php echo $height ?>' width='<?php echo $width ?>' alt='<?php echo $alt ?>'/></a>
  <?php
}

function widget_promotejs_control() {
	$wide = get_option('widget_promotejs_wide');
	
	if ( $_POST['widget_promotejs_submit'] ) {	 
		$wide = $_POST['widget_promotejs_wide'] == 'true' ? true : false;
		update_option('widget_promotejs_wide', $wide);
	} 
  
?>
<div>
  <input type="radio" name="widget_promotejs_wide" value="true" <?php if ($wide == true) echo 'checked ' ?>id="widget_promotejs_wide" />
  <label for="widget_promotejs_wide"><img src="http://static.jsconf.us/promotejsh.gif" /></label>
</div>
<div>
  <input type="radio" name="widget_promotejs_wide" value="false" <?php if ($wide == false) echo 'checked ' ?>id="widget_promotejs_narrow" />
  <label for="widget_promotejs_narrow"><img src="http://static.jsconf.us/promotejsv.gif" /></label>
</div>


<div>
  <input type="hidden" name="widget_promotejs_submit" value="1" />
</div>
<?php
}

function promotejs_control() {
?>
<div class="wrap">
  <h2>Promote JS banner select</h2>
  <form method="post">
<?php
  widget_promotejs_control();
?>
  <div class="submit">
    <input type="submit" name="widget_promotejs_submit_btn" value="<?php _e('Save Settings', 'widget_promotejs_submit') ?>" />
  </div>
  </form>
  </div>
<?php
}

function promotejs_admin_menu() {
  if (function_exists('add_options_page')) {
    add_options_page('Promote JS Image', 'Promote JS Image', 8, basename(__FILE__), 'promotejs_control');
  }
}

add_action('admin_menu', 'promotejs_admin_menu'); 

function promotejs_widget_init() {
  wp_register_widget_control( 'promotejs', 'Promote JS', 'widget_promotejs_control');
  wp_register_sidebar_widget( 'promotejs', 'Promote JS', 'widget_promotejs', array('description' => __('Help Promote JS')) );
}

add_action('widgets_init', 'promotejs_widget_init');

?>
