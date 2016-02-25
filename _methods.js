Tasks.initMethods({
  deleteIf: function (userId, document) {
    return userId === document.owner;
  },
  createCallback: function (document) {
    document = _.extend(document, {
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
    return document;
  },
  editCallback: function (modifier) {
    modifier.$set.editedAt = new Date();
    return modifier;
  }
});