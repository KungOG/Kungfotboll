export default {
  
  allUsers: [],
  teamPlayers: [],

  currentUser: {},
  player: {},
  
  selectedTeam: '',

  /* Skapa lagen och poäng regler */
  numberOfTeams: 0,
  numberOfGames: 0,
  numberOfWin: 0,
  numberOfLoss: 0,
  numberOfEqual: 0,
  
  
  /* */
  groups : [
    {
      players: [],
      id: 0
    },
    {
      name: 'Grupp 1',
      players: [],
      id: 1
    },
    {
      name: 'Grupp 2',
      players: [],
      id: 2
    },
    {
      name: 'Grupp 3',
      players: [],
      id: 3
    },
    {
      name: 'Grupp 4',
      players: [],
      id: 4
    },
    {
      name: 'Grupp 5',
      players: [],
      id: 5
    }
  ],
}
