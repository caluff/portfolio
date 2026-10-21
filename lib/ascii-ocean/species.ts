// Adapted from stackedlol/ascii-sharks, commit c521e24a787e6d4cc460d4cf2b9815f25e4fe453.
// https://github.com/stackedlol/ascii-sharks

import {oceanSpecies as SPECIES} from "@/data/ocean-species";

const TOTAL_WEIGHT = SPECIES.reduce((sum, s) => sum + s.weight, 0);

export function pickSpecies() {
  let r = Math.random() * TOTAL_WEIGHT;
  for (let i = 0; i < SPECIES.length; i++) {
    r -= SPECIES[i].weight;
    if (r <= 0) return i;
  }
  return 0;
}
