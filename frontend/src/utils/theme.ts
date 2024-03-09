export enum GovTechColors {
  GREEN = '#6FBC98',
  YELLOW = '#E0E3A6',
  ORANGE = '#EFC1A1',
  PURPLE = '#C780B8',
  BLUE = '#84D2F3',
}

export const APP_THEME = {
  components: {
    Layout: {
      headerPadding: '0 0 0 15px',
      headerBg: '#ffffff',
    },
    Button: {
      defaultHoverBorderColor: GovTechColors.GREEN,
      defaultHoverColor: GovTechColors.GREEN,
    },
    Menu: {
      darkItemHoverColor: GovTechColors.GREEN,
      darkItemSelectedBg: GovTechColors.GREEN,
    },
  },
};
