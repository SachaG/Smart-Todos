// Define a collection to hold our tasks
Tasks = new Mongo.Collection("tasks");

const hasUserId = function (userId) {
  return !!userId;
}

const isOwner = function (userId, document) {
  return userId === document.owner;
}

const tasksSchema = new SimpleSchema({
  text: {
    type: String,
    publish: true,
    createIf: hasUserId,
    editIf: isOwner
  },
  createdAt: {
    type: Date,
    publish: true
  },
  editedAt: {
    type: Date,
    publish: true,
    optional: true
  },
  owner: {
    type: String,
    publish: true,
    join: {
      collection: function () {return Meteor.users}
    }
  },
  checked: {
    type: Boolean,
    publish: true,
    optional: true,
    editIf: function (userId, document) {
      if (document.private) {
        return userId === document.owner;
      } else {
        return true;
      }
    }
  },
  private: {
    type: Boolean,
    publish: true, 
    optional: true,
    editIf: isOwner
  },
  username: {
    type: String,
    publish: false
  }
});
Tasks.attachSchema(tasksSchema);


const usersSchema = new SimpleSchema({
  username: {
    type: String,
    publish: true
  },
  createdAt: {
    type: Date,
    publish: true
  },
  services: {
    type: Object,
    blackbox: true,
    publish: false
  }
});
Meteor.users.attachSchema(usersSchema);

