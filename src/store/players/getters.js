
export default {
  getPlayer: (state) => (playerId) => state.players.find((player) => player.player_id === playerId),
};
