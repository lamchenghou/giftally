export enum GovTechColors {
  GREEN = '#6FBC98',
  YELLOW = '#E0E3A6',
  ORANGE = '#EFC1A1',
  PURPLE = '#C780B8',
  BLUE = '#84D2F3',
}

export const APP_THEME = {
  token: {
    colorPrimary: GovTechColors.GREEN,
  },
  components: {
    Layout: {
      headerPadding: '0 0 0 15px',
      headerBg: '#ffffff',
      headerHeight: '74px',
    },
    Button: {
      defaultHoverBorderColor: GovTechColors.GREEN,
      defaultHoverColor: GovTechColors.GREEN,
      defaultHoverBg: 'rgba(111, 188, 152, 0.25)',
    },
    Menu: {
      darkItemHoverColor: GovTechColors.GREEN,
      darkItemSelectedBg: GovTechColors.GREEN,
    },
    Card: {
      headerBg: GovTechColors.YELLOW,
    },
  },
};
