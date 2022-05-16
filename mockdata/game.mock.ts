export const GAME_MOCK = {
  scores: [
    {
      id: '1',
      userId: '626e9b4ead2aabd3e05e968c',
      teamId: '625d6de99b414be7545eabdf',
      right: 4,
      wrong: 1,
      unanswered: 1,
      total: 6,
      timeToComplete: 61_020,
      inTime: true,
      completed: false,
    },
    {
      id: '2',
      userId: '626eaed7ad2aabd3e05e96ac',
      teamId: '625d6de99b414be7545eabdf',
      right: 4,
      wrong: 2,
      unanswered: 0,
      total: 6,
      timeToComplete: 62_345,
      inTime: true,
      completed: true,
    },
  ],
  users: [
    {
      id: '626eaed7ad2aabd3e05e96ac',
      team: '625d6de99b414be7545eabdf',
      role: 'player',
    },
    {
      id: '626e9b4ead2aabd3e05e968c',
      team: '625d6de99b414be7545eabdf',
      role: 'player',
    },
  ],
  status: {
    gameId: '62568aef32fa9c667feb5cdf',
    scheduled: true,
    started: true,
    closed: false,
  },
};
