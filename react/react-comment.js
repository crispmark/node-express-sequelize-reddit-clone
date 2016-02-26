var React = require('react');
var Moment = require('moment');

function renderComment(comment, commentScores) {
  var upvote = "/images/grey-upvote.png";
  var downvote = "/images/grey-downvote.png";
  var vote;
  if (comment.usercommentvotes.length > 0)
  vote = comment.usercommentvotes[0].upVote;
  if (vote === true) {
    upvote = "/images/green-upvote.png";
  } else if (vote === false){
    downvote = "/images/red-downvote.png";
  }
  var children = [];
  if (comment.children)
  var children = comment.children.map(function(child) {
    return renderComment(child, commentScores);
  });
  var pointString = 'points';
  if(commentScores[comment.id] === 1)
  var pointString = 'point';
  return (
    <div className="commentNest">
      <div className="commentRow" key={comment.id}>
        <div className="commentVotescore">
          <input className="commentUpvote" data-comment={comment.id} type="image" src={upvote}/>
          <input className="commentDownvote" data-comment={comment.id} type="image" src={downvote}/>
        </div>
        <div className="commentContent">
          <div className="commentMeta">
            <div className="submissionInfo">
              <a className="metatext">{comment.user.username} <span className="commentScore">{commentScores[comment.id]}</span> <span className="pointString">{pointString}</span> {Moment(comment.createdAt).fromNow()}</a>
            </div>
          </div>

            <table className="commentText">
              <tr>
                <td><a>{comment.text}</a></td>
              </tr>
            </table>
          <a className="metalink reply">reply</a>
        </div>
      </div>

      <div className="hiddenReplyBox" data-content={comment.contentId} data-comment={comment.id}>
        <textarea className="replyTextBox" type="text"/>
        <div className="commentButtons">
          <a className="replySaveButton">save</a>
          <a className="replyCancelButton">cancel</a>
        </div>
      </div>
      {children}
    </div>
  )};

  module.exports = renderComment;
