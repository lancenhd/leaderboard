console.log("Hello world");

PlayersList = new Mongo.Collection('players');

var playersList = ['David', 'Bob', 'Mary', 'Bill', 'Warren', 'Tim'];
playersList.forEach(function(){
  console.log('test');
});

if(Meteor.isClient){
  Template.leaderboard.helpers({
    'player': function(){
      return PlayersList.find({}, { sort: {score: -1} });

    },
    'selectedClass': function(){
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if(playerId == selectedPlayer){
        return "selected"
      }
    },
    'selectedPlayer': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      return PlayersList.findOne({ _id: selectedPlayer });
    }
  });

  Template.leaderboard.events({
    'click .player': function(){
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
    },
    'click .increment': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update({ _id: selectedPlayer }, {$inc: {score: 5} });
    },
    'click .decrement': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update({ _id: selectedPlayer }, {$inc: {score: -5} });
    }
  });
}




if(Meteor.isServer){
  // this code only runs on the server

}
