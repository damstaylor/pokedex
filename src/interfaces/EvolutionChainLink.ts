interface EvolutionChainLink {
  evolution_details: EvolutionDetails[];
  evolves_to: EvolutionChainLink[];
  is_baby: boolean;
  species: APIBaseItem;
}
