var database = require('../database/database.js');
var app = require('./app.js');
var parseReact = require('./react-parser.js').parseReact;
var Comments = require('../react/react-comments.js');

app.get('/link/:contentId/comments',function(req, res) {
  var contentId = parseInt(req.params.contentId);
  var sessionId = req.cookies.sessionId;
  database.getContentAndComments(sessionId, contentId)
  .then(function(response) {
    res.send(parseReact(Comments(response.user, response.submitter, response.content, response.comments, response.vote, response.votescore)));
  });
});

app.post('/comment/:contentId', function(req, res) {
  var contentId = parseInt(req.params.contentId);
  var sessionId = req.cookies.sessionId;
  database.createNewComment(sessionId, contentId, null, req.body.comment)
  .then(function(comment) {
    res.redirect('/link/'+contentId+'/comments');
  })
  .catch(function(e) {
    if(e === database.INVALID_SESSIONID)
    res.redirect('/Login');
  });
});
app.post('/comment/', function(req, res) {
  var contentId = parseInt(req.body.contentId);
  var commentId = req.body.commentId;
  if (commentId)
  commentId = parseInt(commentId);
  var comment = req.body.text;
  var sessionId = req.cookies.sessionId;
  database.createNewComment(sessionId, contentId, commentId, comment)
  .then(function(comment) {
    res.send(comment);
  });
});