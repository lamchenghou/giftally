/**
 * Represents the data present for each row in the RedemptionTable.
 */
export interface RedemptionTableRowData {
  redeemerStaffPassId: string;
  teamName: string;
  // According to MDN, JS can handle integer values up to ±2^53-1,
  // which encompasses the some 13 digits in epoch ms easily.
  redeemedAt: number;
  remarks?: string;
}
