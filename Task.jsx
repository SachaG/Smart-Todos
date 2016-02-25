// Task component - represents a single todo item
Task = React.createClass({
  propTypes: {
    task: React.PropTypes.object.isRequired,
    showPrivateButton: React.PropTypes.bool.isRequired
  },

  mixins: [ReactMeteorData],

  getMeteorData() {

    return {
      owner: Meteor.users.findOne(this.props.task.owner) 
    };
  },

  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call("tasks.edit", this.props.task._id, {$set: {checked: !this.props.task.checked}});
  },

  deleteThisTask() {
    Meteor.call("tasks.delete", this.props.task._id);
  },

  togglePrivate() {
    Meteor.call("tasks.edit", this.props.task._id, {$set: {private: !this.props.task.private}});
  },

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    // Add "checked" and/or "private" to the className when needed
    const taskClassName = (this.props.task.checked ? "checked" : "") + " " +
      (this.props.task.private ? "private" : "");

    return (
      <li className={taskClassName}>
        <button className="delete" onClick={this.deleteThisTask}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly={true}
          checked={this.props.task.checked}
          onClick={this.toggleChecked} />

        { this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={this.togglePrivate}>
            { this.props.task.private ? "Private" : "Public" }
          </button>
        ) : ''}

        <span className="text">
          <strong>{this.data.owner.username}</strong>: {this.props.task.text}
        </span>
      </li>
    );
  }
});
