var options = { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric'
};
var today  = new Date();

var date=today.toLocaleDateString(("en-US"),options);

$(".main").prepend("<h1>"+date+"</h1>")