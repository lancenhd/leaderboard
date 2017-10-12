console.log("Hello world");

PlayersList = new Mongo.Collection('players');

var playersList = ['David', 'Bob', 'Mary', 'Bill', 'Warren', 'Tim'];
playersList.forEach(function(){
  console.log('test');
});

if(Meteor.isClient){
  Template.leaderboard.helpers({
    'player': function(){
      return PlayersList.find();
    },
    'selectedClass': function(){
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if(playerId == selectedPlayer){
        return "selected"
      }
    }
  });

  Template.leaderboard.events({
    'click .player': function(){
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
    }


  });
}




if(Meteor.isServer){
  // this code only runs on the server

}
