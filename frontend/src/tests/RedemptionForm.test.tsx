import {
  Matcher,
  MatcherOptions,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import RedemptionForm from '../features/giftRedemption/RedemptionForm';
import { TeamModel } from '../types/dashboard/teams';

// ========== Imports for spies ==========
import * as teamHooks from '../api/teamsApi';
import * as staffHooks from '../api/staffApi';

/**
 * Unit test for RedemptionForm. We will cover the following:
 * - Basic rendering (renders all but team eligibility and team display)
 * - Upon selection of an eligible staffId, we will want team eligibility
 *   and team display to pop up. We will use a stub that always returns
 *   an eligible team.
 * - We also test the correct team eligibility display for staff from
 *   teams that have already redeemed.
 * - Finally, we will test that the form is cleared and redeem button is
 *   disabled, upon redemption for an eligible team.
 * - This would also be testing RedemptionStatus.tsx
 */
const eligibleStaffs = [
  {
    staffPassId: 'eligibleStaff',
    teamName: 'eligibleTeam',
    createdAt: '1',
  },
];

const eligibleTeam: TeamModel = {
  teamName: 'eligibleTeam',
  hasRedeemed: false,
  redeemedAt: null,
  collectorId: null,
};

const ineligibleStaffs = [
  {
    staffPassId: 'ineligibleStaff',
    teamName: 'ineligibleTeam',
    createdAt: '1',
  },
];

const ineligibleTeam: TeamModel = {
  teamName: 'ineligibleStaff',
  hasRedeemed: true,
  redeemedAt: null,
  collectorId: null,
};
// ========== Reuseable Global Assertion Methods ==========
export async function expectInputValueToUiTextResult(
  inputTestId: string,
  inputValue: string,
  expectedTextToShowUpInUi: string,
  getByTestId: (
    id: Matcher,
    options?: MatcherOptions | undefined,
  ) => HTMLElement,
) {
  const selectInput = getByTestId(inputTestId).querySelector('input');
  // If you're reading through this, I spent 2 hours trying to emulate
  // clicking on the input box, to no avail haha. Might be due to the
  // nest of antd components.
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
// ========== RedemptionForm Test Suite ==========
describe('RedemptionForm', () => {
  // ========== Setup test suite ==========
  let getByTestId: (
    id: Matcher,
    options?: MatcherOptions | undefined,
  ) => HTMLElement;

  let renderResult: any;
  beforeEach(() => {
    renderResult = render(
      <RedemptionForm
        handleShowSuccess={(_teamName: string, _staffId: string) => {}}
        isFormSubmitting={false}
        setIsFormSubmitting={vi.fn()}
      />,
    );
    getByTestId = renderResult.getByTestId;
  });

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

  function generateEligibleCaseStub() {
    const getTeamStub = vi.spyOn(teamHooks, 'getTeam');
    const searchStaffStub = vi.spyOn(staffHooks, 'searchStaff');

    // Mock hooks to return eligible teams and staff
    getTeamStub.mockImplementation((_teamName: string) => {
      return Promise.resolve(eligibleTeam);
    });
    searchStaffStub.mockImplementation((_searchStr: string) => {
      return Promise.resolve(eligibleStaffs);
    });
    return [getTeamStub, searchStaffStub];
  }
  function generateIneligibleCaseStub() {
    const getTeamStub = vi.spyOn(teamHooks, 'getTeam');
    const searchStaffStub = vi.spyOn(staffHooks, 'searchStaff');
    const redeemForTeamStub = vi.spyOn(teamHooks, 'redeemForTeam');

    // Mock hooks to return eligible teams and staff
    getTeamStub.mockImplementation((_teamName: string) => {
      return Promise.resolve(ineligibleTeam);
    });
    searchStaffStub.mockImplementation((_searchStr: string) => {
      return Promise.resolve(ineligibleStaffs);
    });
    redeemForTeamStub.mockImplementation(
      async (_teamName: string, _collectorId: string) => {
        // using any dummy team will do
        return Promise.resolve(eligibleTeam);
      },
    );
    return [getTeamStub, searchStaffStub, redeemForTeamStub];
  }

  // ========== Test Cases ==========
  it('initially renders the form correctly', () => {
    expect(getByTestId('inputBoxAlwaysPresent')).toBeInTheDocument();
    expectElementToBeDisabledByTestId('redeemButtonAlwaysPresent');
  });

  it('enables the redeem button and display eligible status upon eligible team selected', async () => {
    const [getTeamStub, _searchStaffStub, _redeemForTeamStub] =
      generateEligibleCaseStub();
    // Ensure redeemButton is disabled at the start
    expectElementToBeDisabledByTestId('redeemButtonAlwaysPresent');

    // Emulate user typing in 'eligible' into text field
    await expectInputValueToUiTextResult(
      'inputBoxAlwaysPresent',
      'eligible',
      'eligibleStaff',
      getByTestId,
    );
    // Emualate user clicking on the option
    fireEvent.click(screen.getAllByText('eligibleStaff')[1]);
    expect(getTeamStub).toBeCalledWith('eligibleTeam');

    // Verify that the correct status on redemption eligibility shows up
    await waitFor(
      () => {
        expect(
          screen.getAllByText('eligibleTeam is eligible for redemption!')[0],
        ).toBeInTheDocument();
      },
      { timeout: 5000 },
    );
    // Verify that redeem button is enabled
    expectElementToBeEnabledByTestId('redeemButtonAlwaysPresent');
  });

  it('disables the redeem button and display ineligible status upon ineligible team selected', async () => {
    const [getTeamStub, _searchStaffStub] = generateIneligibleCaseStub();

    // Emulate user typing in 'staff' into text field
    await expectInputValueToUiTextResult(
      'inputBoxAlwaysPresent',
      'staff',
      'ineligibleStaff',
      getByTestId,
    );

    // Emualate user clicking on te option
    fireEvent.click(screen.getAllByText('ineligibleStaff')[1]);
    expect(getTeamStub).toBeCalledWith('ineligibleTeam');

    // Verify that the correct status on redemption eligibility shows up
    await waitFor(
      () => {
        expect(
          screen.getAllByText('ineligibleTeam has already redeemed!')[0],
        ).toBeInTheDocument();
      },
      { timeout: 5000 },
    );
    // Verify that redeem button is enabled
    expectElementToBeDisabledByTestId('redeemButtonAlwaysPresent');
  });

  it('clears the form and disables the redeem button upon redemption', async () => {
    const [getTeamStub, _searchStaffStub] = generateEligibleCaseStub();
    // Ensure redeemButton is disabled at the start
    expectElementToBeDisabledByTestId('redeemButtonAlwaysPresent');

    // Emulate user typing in 'eligible' into text field
    const selectInput = await expectInputValueToUiTextResult(
      'inputBoxAlwaysPresent',
      'eligible',
      'eligibleStaff',
      getByTestId,
    );
    // Emualate user clicking on the option
    fireEvent.click(screen.getAllByText('eligibleStaff')[1]);
    expect(getTeamStub).toBeCalledWith('eligibleTeam');

    // Verify that redeem button is enabled
    await waitFor(
      () => expectElementToBeEnabledByTestId('redeemButtonAlwaysPresent'),
      { timeout: 5000 },
    );

    // Emulate user clicking on the redeem button
    fireEvent.click(screen.getByTestId('redeemButtonAlwaysPresent'));
    // Verify selectInput is empty
    expect(selectInput?.value).toBe('');

    // Verify that redeem button is disabled
    await waitFor(
      () => expectElementToBeDisabledByTestId('redeemButtonAlwaysPresent'),
      { timeout: 5000 },
    );
  });
});
