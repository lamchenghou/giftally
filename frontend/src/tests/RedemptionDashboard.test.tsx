import {
  Matcher,
  MatcherOptions,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { TeamModel } from '../types/dashboard/teams';
import RedemptionDashboard from '../features/giftRedemption/RedemptionDashboard';
import { RedemptionHistoryCountGetData } from '../types/dashboard/redemption';

// ========== Imports for spies ==========
import * as teamHooks from '../api/teamsApi';
import * as staffHooks from '../api/staffApi';

/**
 * Unit test for RedemptionDashboard. We will cover the following:
 * - Basic rendering (renders the table)
 * - Assumes a state with 1 team redeemed–'initiallyRedeemedTeam'
 * - Upon redemption for an eligible team, a new record will be
 *   added to the redemption history
 * - This would also be testing RedemptionTable.tsx. RedemptionDashboard
 *   would not be tested in isolation here.
 */
const eligibleStaffs = [
  {
    staffPassId: 'eligibleStaff',
    teamName: 'nextRedeemTeam',
    createdAt: '1',
  },
];

const eligibleTeam: TeamModel = {
  teamName: 'nextRedeemTeam',
  hasRedeemed: false,
  redeemedAt: null,
  collectorId: null,
};

const intialRedemptionHist: TeamModel[] = [
  {
    teamName: 'initiallyRedeemedTeam',
    hasRedeemed: true,
    redeemedAt: '1710121619664',
    collectorId: 'initialStaff',
  },
];

const resultantRedemptionHist: TeamModel[] = [
  {
    teamName: 'nextRedeemTeam',
    hasRedeemed: true,
    redeemedAt: '1710121619664',
    collectorId: 'eligibleStaff',
  },
  {
    teamName: 'initiallyRedeemedTeam',
    hasRedeemed: true,
    redeemedAt: '1710121619664',
    collectorId: 'initialStaff',
  },
];
async function expectInputValueToUiTextResult(
  inputTestId: string,
  inputValue: string,
  expectedTextToShowUpInUi: string,
  getByTestId: (
    id: Matcher,
    options?: MatcherOptions | undefined,
  ) => HTMLElement,
) {
  const selectInput = getByTestId(inputTestId).querySelector('input');
  fireEvent.change(selectInput as Element, { target: { value: inputValue } });
  expect(selectInput?.value).toBe(inputValue);

  // E.g. Verify that dropdown appears with 'eligibleStaff'
  await waitFor(
    () => {
      // Check for the presence of the element by its text content
      expect(
        screen.getAllByText(new RegExp(expectedTextToShowUpInUi, 'i'))[0],
      ).toBeInTheDocument();
    },
    { timeout: 5000 },
  );

  return selectInput;
}
// ========== Patch unrelated error in tests ==========
beforeAll(() => {
  window.getComputedStyle = (_e: Element) => ({}) as any;
});
// ========== RedemptionDashboard Test Suite ==========
describe('RedemptionDashboard', () => {
  // ========== Setup test suite ==========
  let getByTestId: (
    id: Matcher,
    options?: MatcherOptions | undefined,
  ) => HTMLElement;

  let renderResult: any;

  // ========== Reusable Functions ==========
  function expectElementToBeDisabledByTestId(testId: string) {
    const elem = getByTestId(testId);
    expect(elem).toBeInTheDocument();
    expect(elem).toBeDisabled();
  }

  function expectElementToBeEnabledByTestId(testId: string) {
    const elem = getByTestId(testId);
    expect(elem).toBeInTheDocument();
    expect(elem).toBeEnabled();
  }

  async function expectTextInUi(text: string, present: boolean) {
    await waitFor(
      () => {
        // Check for the presence of the element by its text content
        if (present) {
          expect(
            screen.getAllByText(new RegExp(text, 'i'))[0],
          ).toBeInTheDocument();
        } else {
          expect(
            screen.getAllByText(new RegExp(text, 'i'))[0],
          ).not.toBeInTheDocument();
        }
      },
      { timeout: 5000 },
    );
  }

  const getTeamStub = vi.spyOn(teamHooks, 'getTeam');
  const searchStaffStub = vi.spyOn(staffHooks, 'searchStaff');
  const getRedemptionHistoryCountStub = vi.spyOn(
    teamHooks,
    'getRedemptionHistoryCount',
  );
  const redeemForTeamSpy = vi.spyOn(teamHooks, 'redeemForTeam');
  beforeEach(() => {
    vi.resetAllMocks();
    // Mock hooks to return large enough count for our test and to mock the
    // logic of redeeming
    getTeamStub.mockImplementation(async (_teamName: string) => {
      return Promise.resolve(eligibleTeam);
    });

    searchStaffStub.mockImplementation(async (_searchStr: string) => {
      return Promise.resolve(eligibleStaffs);
    });

    getRedemptionHistoryCountStub.mockImplementation(async () => {
      return Promise.resolve({ count: 10 } as RedemptionHistoryCountGetData);
    });

    redeemForTeamSpy.mockImplementation(
      async (_teamName: string, _collectorId: string) => {
        return Promise.resolve(resultantRedemptionHist[0]);
      },
    );

    renderResult = render(<RedemptionDashboard />);
    getByTestId = renderResult.getByTestId;
  });
  // ========== Test Cases ==========
  it('initially renders the dashboard correctly', () => {
    expectTextInUi('tableAlwaysPresent', true);
    expectTextInUi('paginationAlwaysPresent', true);
  });

  it('adds a new record to redemption history upon redemption for an eligible team', async () => {
    // Manually define stub here as we need to change it later on
    const getRedemptionHistoryStub = vi.spyOn(
      teamHooks,
      'getRedemptionHistory',
    );
    getRedemptionHistoryStub.mockImplementation(
      async (_count: number, _offset: number) => {
        return Promise.resolve(intialRedemptionHist);
      },
    );

    // Ensure that initiallyRedeemedTeam shows on the table only
    expectTextInUi('initiallyRedeemedTeam', true);
    expectTextInUi('nextRedeemTeam', false);

    // Emulate user typing in 'eligible' into text field
    await expectInputValueToUiTextResult(
      'inputBoxAlwaysPresent',
      'eligible',
      'eligibleStaff',
      getByTestId,
    );
    // Emualate user clicking on the option
    fireEvent.click(screen.getAllByText('eligibleStaff')[1]);
    expect(getTeamStub).toBeCalledWith('nextRedeemTeam');

    // Verify that the correct status on redemption eligibility shows up
    // Also ensures that this process completes before redeem
    await waitFor(
      () => {
        expect(
          screen.getAllByText('nextRedeemTeam is eligible for redemption!')[0],
        ).toBeInTheDocument();
      },
      { timeout: 5000 },
    );
    // Verify that redeem button is enabled
    expectElementToBeEnabledByTestId('redeemButtonAlwaysPresent');

    // Emulate user clicking on the redeem button
    fireEvent.click(screen.getByTestId('redeemButtonAlwaysPresent'));

    // Verify that redeem button is disabled, before we check history
    getRedemptionHistoryStub.mockImplementation(
      async (_count: number, _offset: number) => {
        return Promise.resolve(resultantRedemptionHist);
      },
    );
    await waitFor(
      () => expectElementToBeDisabledByTestId('redeemButtonAlwaysPresent'),
      { timeout: 5000 },
    );
    expect(redeemForTeamSpy).toBeCalledWith('nextRedeemTeam', 'eligibleStaff');

    // Ensure that both initiallyRedeemedTeam and nextRedeemTeam shows
    expectTextInUi('initiallyRedeemedTeam', true);
    expectTextInUi('nextRedeemTeam', true);
  });
});
