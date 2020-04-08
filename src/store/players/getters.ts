
export default {
  getPlayer: (state: any) => (playerId: any) => state.players
    .find((player: any) => player.player_id === playerId),
};
