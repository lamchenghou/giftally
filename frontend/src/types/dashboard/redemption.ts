import { TeamModel } from './teams';

/**
 * Represents the data present for each row in the RedemptionTable.
 */
export type RedemptionTableRowData = Omit<TeamModel, 'hasRedeemed'>;

export interface RedeemPutData {
  collectorId: string;
}
