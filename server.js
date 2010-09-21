var connect = require("connect");
var express = require("express");

var global_objects = {
    "Array": ["isArray", "constructor", "index", "input", "length", "pop", "push", "reverse", "shift", "sort", "splice", "unshift", "concat", "join", "slice", "toString", "indexOf", "lastIndexOf", "forEach", "map", "some", "every", "filter", "Creating an Array", "Example: Creating a Two-dimensional Array"],
    "String": ["prototype", "fromCharCode", "constructor", "length", "charAt", "concat", "indexOf", "lastIndexOf", "localeCompare", "match", "replace", "search", "slice", "split", "substr", "substring", "toLocaleLowerCase", "toLocaleUpperCase","toLowerCase", "toString", "toUpperCase", "valueOf"],
    "Number": ["toExponential", "toFixed", "toLocaleString", "toPrecision", "toString", "valueOf", "Example: Using the Number object to assign values to numeric variables", "Example: Using Number to convert a Date object"],
    "RegExp": ["constructor", "global", "ignoreCase", "lastIndex", "multiline", "source", "exec", "test", "toString", "Example: Using a regular expression to change data format", "Example: Using a regular expression with the sticky flag"],
    "Function": ["prototype", "arguments", "arity", "constructor", "length", "apply", "call", "toString", "Example: Specifying arguments with the Function constructor"]
};



var combinations = [];

for (var i in global_objects) { 
    var attrs = global_objects[i];
    for (var idx in attrs) {
        var val = attrs[idx];
        var seo_string = ["JavaScript JS Documentation: JS ",i," ",val,", JavaScript ", i, " ", val];
        if (val.indexOf(" ") < 0) {
            seo_string = seo_string.concat([", JS ",i, " .",val,", JavaScript ", i, " .", val]);
        }
        combinations.push([seo_string.join(""), "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/"+i]);
    }
}


var images = [
    ["http://static.jsconf.us/promotejsv.png", "280", "160"],
    ["http://static.jsconf.us/promotejsh.png", "150", "180"]
];


// can add any other SEO string -> URL combinations here.


var pub = __dirname + '/public';
var app = express.createServer(
    express.staticProvider(pub)
);


app.set('views', __dirname + '/views');

var counter = 0;

app.get('/', function(req, res){
    counter += 1;
        
    var alt_string = "JS Tutorial, JavaScript Tutorial, JavaScript Guide, Learn JavaScript JS, How To Learn JS, Learning JavaScript";
    var href_string = "https://developer.mozilla.org/en/JavaScript/Guide";
    if (counter % 10 == 0) {
        alt_string = "JavaScript Reference, JavaScript Guide, JavaScript API, JS API, JS Guide, JS Reference, Learn JS, JS Documentation";
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

app.listen(80);
