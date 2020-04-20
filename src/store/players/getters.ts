import { Player } from './types';

export default {
  getPlayer: (state: any) => (playerId: string) => state.players
    .find((player: Player) => player.player_id === playerId),
};
