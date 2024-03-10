import { Nullable } from 'vitest';

export interface TeamModel {
  teamName: string;
  hasRedeemed: boolean;
  // Stored in db as a string to save space
  redeemedAt: Nullable<string>;
  collectorId: Nullable<string>;
}
