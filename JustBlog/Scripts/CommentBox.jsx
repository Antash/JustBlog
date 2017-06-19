class Comment extends React.Component {
  render() {
    var md = new Remarkable();
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {md.render(this.props.children.toString())}
      </div>
    );
  }
};

class CommentForm extends React.Component {
    constructor() {
        super();
        this.state = {
            author: '',
			text: ''
        };
	}
	handleAuthorChange(e) {
    this.setState({author: e.target.value});
  }
  handleTextChange(e) {
    this.setState({text: e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({Author: author, Text: text});
    this.setState({author: '', text: ''});
  }
    render() {
        return (
<form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
      );
    }
};

class CommentList extends React.Component {
    render() {
	var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.Author} key={comment.Id}>
          {comment.Text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
    }
};

class CommentBox extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
	}
loadCommentsFromServer() {
	var xhr = new XMLHttpRequest();
		xhr.open('get', this.props.url, true);
		xhr.onload = function() {
		  var data = JSON.parse(xhr.responseText);
		  this.setState({ data: data });
		}.bind(this);
		xhr.send();

		//fetch(this.props.url)
		//.then(function(response) {
		//return response.json();
		//}).then(function(jsonData) {
		//console.Warn(jsonData);
		//	this.setState({ data: jsonData });
		//})
	}
	componentDidMount() {
		this.loadCommentsFromServer();
		window.setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	}
	handleCommentSubmit(comment) {
		var data = new FormData();
		data.append('Author', comment.Author);
		data.append('Text', comment.Text);

		var xhr = new XMLHttpRequest();
		xhr.open('post', this.props.submitUrl, true);
		xhr.onload = function() {
		  this.loadCommentsFromServer();
		}.bind(this);
		xhr.send(data);
	}
    render() {
        return (
		  <div className="commentBox">
			<h1>Comments</h1>
			<CommentList data={this.state.data} />
			<CommentForm onCommentSubmit={this.handleCommentSubmit} />
		  </div>
		);
    }
}
ReactDOM.render(
  <CommentBox url="/comments" submitUrl="/comments/new" pollInterval={2000} />,
  document.getElementById("content")
);

