export interface TeamModel {
  teamName: string;
  hasRedeemed: boolean;
  // Stored in db as a string to save space
  redeemedAt: string;
}
