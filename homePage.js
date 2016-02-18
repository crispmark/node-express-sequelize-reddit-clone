//Requiring npm packagaes
var app = require('./app.js');
var database = require('./database.js');
require('./createuser.js');
require('./login.js');
require('./createcontent.js');

app.get('/', function(req, res){
  var sessionId = req.cookies.sessionId;
  database.getLatestNContent(sessionId, 25)
  .then(function(response) {
    res.send(htmlify(response.User, response.Content));
  });
});

function htmlify(user, contents) {
  var htmlstring = ''
  if (user) {
    htmlstring += '<a>Welcome ' + user.username +'</a>\
      <a href=/Logout>Logout</a>\
      <a href=/CreateContent>Create Content</a>'
  }
  else {
    htmlstring += '<a href=/SignUp>Sign Up</a>\
      <a href=/Login>Login</a>'
  }
  htmlstring += '<div id="contents">\
    <h1>List of contents</h1>\
    <ul class="contents-list">';
  contents.forEach(function(content) {
    htmlstring += '<li class="content-item"> \
      <h2 class="' + content.title + '"> \
        <a href="' + content.url + '">' + content.title + '</a> \
      </h2> \
      <p>Created by ' + content.user.username + '</p> \
    </li>';
  });
  htmlstring += '</ul> \
  </div>';
  return htmlstring;
}