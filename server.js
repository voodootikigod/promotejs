var connect = require("connect");
var express = require("express");
var sys = require("sys");
var global_objects = {
    "Array": ["isArray", "constructor", "index", "input", "length", "pop", "push", "reverse", "shift", "sort", "splice", "unshift", "concat", "join", "slice", "toString", "indexOf", "lastIndexOf", "forEach", "map", "some", "every", "filter", "Creating an Array", "Example: Creating a Two-dimensional Array"],
    "String": ["prototype", "fromCharCode", "constructor", "length", "charAt", "concat", "indexOf", "lastIndexOf", "localeCompare", "match", "replace", "search", "slice", "split", "substr", "substring", "toLocaleLowerCase", "toLocaleUpperCase","toLowerCase", "toString", "toUpperCase", "valueOf"],
    "Number": ["toExponential", "toFixed", "toLocaleString", "toPrecision", "toString", "valueOf", "Example: Using the Number object to assign values to numeric variables", "Example: Using Number to convert a Date object"],
    "RegExp": ["constructor", "global", "ignoreCase", "lastIndex", "multiline", "source", "exec", "test", "toString", "Example: Using a regular expression to change data format", "Example: Using a regular expression with the sticky flag"],
    "Function": ["prototype", "arguments", "arity", "constructor", "length", "apply", "call", "toString", "Example: Specifying arguments with the Function constructor"]
};
String.prototype.trim = function()  {
  return String(this).replace(/^\s+|\s+$/g, '');
};


var api_targets = {};

var combinations = [];

for (var i in global_objects) { 
    var attrs = global_objects[i];
    var key = i.toLowerCase();
    for (var idx in attrs) {
        var val = attrs[idx];
        var seo_string = ["JS ",i," ",val,", JavaScript ", i, " ", val];
        if (val.indexOf(" ") < 0) {
            seo_string = seo_string.concat([", JS ",i, " .",val,", JavaScript ", i, " .", val]);
        }
        
        seo_string.join("").split(",").forEach(function(elem, idx) {
          var arg = [elem.trim(), "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/"+i]
          combinations.push(arg);
          if (typeof api_targets[key] === 'undefined' ) {
            api_targets[key] = [];
          }
          api_targets[key].push(arg);
        });
    }
}


var images = [
    ["http://static.jsconf.us/promotejsv.gif", "280", "160"],
    ["http://static.jsconf.us/promotejsh.gif", "150", "180"]
];

combinations.push(["JS Screencasts, Learn JS, JS Videos, JavaScript Screencasts, JS Education, JS Training, Proper JS", "http://learnjs.org"]);
combinations.push(["Learning JavaScript with Object Graphs", "http://howtonode.org/object-graphs"]);
combinations.push(["In Search of JavaScript Developers: A Gist", "http://blog.rebeccamurphey.com/in-search-of-javascript-developers-a-gist"]);
combinations.push(["On Rolling Your Own, Enterprise jQuery, Enterprise JavaScript, Enterprise JS", "http://blog.rebeccamurphey.com/on-rolling-your-own"]);
combinations.push(["Proper JS, Proper JavaScript Training, JS Tutorial, Learning JS, Eloquent JavaScript, Eloquent JS, JS Data Structures, JS DOM", "http://eloquentjavascript.net"]);
combinations.push(["jQuery, jQuery Fundamantals, JS Fundamentals, JS jQuery, Learn jQuery, jQuery done right, Best jQuery Tutorial, best jQuery training", "http://jqfundamentals.com/book/book.html"]);


// can add any other SEO string -> URL combinations here.


var pub = __dirname + '/public';
var app = express.createServer(
    express.bodyDecoder(),
    express.staticProvider(pub)
);


app.set('views', __dirname + '/views');

var counter = 0;

var tutorial_options = ["JS Tutorial", "JavaScript Tutorial", "JavaScript Guide", "Learn JavaScript JS", "How To Learn JS", "Learning JavaScript"];
var reference_options = ["JavaScript Reference", "JavaScript Guide", "JavaScript API", "JS API", "JS Guide", "JS Reference", "Learn JS", "JS Documentation"];


app.get("/plz.json", function (req, res) {
  if (req.query && req.query.key && api_targets[req.query.key.toLowerCase()]) {
    var array = api_targets[req.query.key.toLowerCase()];
    var combo = array[Math.floor(Math.random()*array.length)];
    alt_string = combo[0];
    href_string = combo[1];
  } else {
    var alt_string = tutorial_options[Math.floor(Math.random()*tutorial_options.length)];
    var href_string = "https://developer.mozilla.org/en/JavaScript/Guide";
    if (counter % 10 == 0) {
        alt_string = reference_options[Math.floor(Math.random()*reference_options.length)];
        href_string = "https://developer.mozilla.org/en/JavaScript";
    } else if (counter % 5 != 0) {
        var combo = combinations[Math.floor(Math.random()*combinations.length)];
        alt_string = combo[0];
        href_string = combo[1];
    }
  }
  var img = images[Math.floor(Math.random()*images.length)];
  res.header("Content-Type", "application/json");
  // res.send("ok");
  res.send({alt: alt_string, href: href_string, src: img[0], height: img[1], width: img[2]});
})

app.get('/', function(req, res){
    counter += 1;
        
    var alt_string = tutorial_options[Math.floor(Math.random()*tutorial_options.length)];
    var href_string = "https://developer.mozilla.org/en/JavaScript/Guide";
    if (counter % 10 == 0) {
        alt_string = reference_options[Math.floor(Math.random()*reference_options.length)];
        href_string = "https://developer.mozilla.org/en/JavaScript";
    } else if (counter % 5 != 0) {
        var combo = combinations[Math.floor(Math.random()*combinations.length)];
        alt_string = combo[0];
        href_string = combo[1];
    }

    var img = images[Math.floor(Math.random()*images.length)];
    

    res.render('index.ejs', {
        locals: {
            alt: alt_string,
            href: href_string,
            src: img[0],
            height: img[1],
            width: img[2]
        }
    });
});

app.listen(process.env.NODE_PORT || 80);
// 