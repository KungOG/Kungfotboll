import db from '@/firebaseInit'
export default {

  /* Hämta en spelare ifrån DB:n */
  getPlayerFromDb(ctx, uid) {
    console.log(uid)
    var item = db.collection('users').doc(uid)
    item.get().then((doc) => {
      var player = doc.data();
      ctx.commit('setPlayer', player)
    })
  },
  /* Hämta alla users ifrån DB:n */
  async getAllUsersFromDb(ctx) {
    var allUsers = []
    var item = await db.collection('users')
    await item.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var obj = (doc.id, " => ", doc.data())
        allUsers.push(obj)
        console.log(allUsers)
      })
    })
    ctx.commit('setAllUsers', allUsers)
  },

  /* Hämta det specifika laget och deras spelare */
  async getTeamPlayersFromDb(ctx) {
    var teamPlayers = []
    var item = await db.collection('teams').doc('skogaby').collection('players').orderBy('point')
    await item.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var obj = (doc.id, " => ", doc.data())
        teamPlayers.push(obj)
        console.log(teamPlayers)
      })
    })
    ctx.commit('setTeamPlayers', teamPlayers)
  },

  /* Hämtar din info som användare */
  async setCurrentUser(ctx, user) {
    var item = await db.collection('users').doc(user.uid)
    item.get().then((doc) => {
      
      var currentUser = doc.data(); 
      ctx.commit('setCurrentUser', currentUser)
      sessionStorage.setItem('isAdmin', currentUser.isAdmin);
    })
  },

  /* */
  addUserToDb(ctx, user) {
    db.collection('users').doc(user.uid).set(user)
  },

  /* Tar bort statusen Admin när du loggar ut */
  removeCurrentUser(ctx) {
    sessionStorage.removeItem('isAdmin');
    ctx.commit('removeCurrentUser');
  },

  /* Sätta ditt namn första gången du loggar in */
  addPlayerName (ctx, name) {
    var uid = this.state.currentUser.uid;
    db.collection('users').doc(uid).update({name:name});
  },
  setNumberOfTeams(ctx, num) {
    ctx.commit('setNumberOfTeams', num);
  },
  setNumberOfGames(ctx, num) {
    ctx.commit('setNumberOfGames', num);
  },
  setNumberOfWin(ctx, num) {
    ctx.commit('setNumberOfWin', num);
  },
  setNumberOfLoss(ctx, num) {
    ctx.commit('setNumberOfLoss', num);
  },

  /* Lägg till befintligspelare till laget */
  submitPlayer(ctx, player, id) {
    var newPlayer = {
      name: player.name,
      loss: 0,
      win: 0,
      point: 0,
      id: id,
    }
    var adminTeam = this.state.currentUser.teams[0];
    db.collection('teams').doc(adminTeam).collection('players').doc(player.uid).set(newPlayer)
  },

  /* Lägg till tillfällig spelare */
  addPlayerToDb(ctx, playerName, id) {
    var playerInfo = {
      name: playerName,
      goal: 0,
      win: 0,
      loss: 0,
      point: 0,
      id: id,
    }
    var adminTeam = this.state.currentUser.teams[0];
    db.collection('teams').doc(adminTeam).collection('players').doc().set(playerInfo)
  },
  
  /* Ta bort spelaren ifrån store */
  deletePlayer(ctx, player) {
    ctx.commit('deletePlayer', player);
  }
}
