const Colors = {
  gray: (alpha = 1) => `rgba(110,110,110,${alpha})`,
  lightgray: (alpha = 1) => `rgba(228,229,231,${alpha})`,
  gray1: (alpha = 1) => `rgba(163,160,160,${alpha})`,

  white: (alpha = 1) => `rgba(255,255,255,${alpha})`,
  lightWhite: (alpha = 1) => `rgba(239,239,239,${alpha})`,

  black: (alpha = 1) => `rgba(0,0,0,${alpha})`,

  blue: (alpha = 1) => `rgba(19, 72, 150, ${alpha})`,
  blue1: (alpha = 1) => `rgba(18, 108, 253, ${alpha})`,

  red: (alpha = 1) => `rgba(192, 40, 44, ${alpha})`,


  white1: (alpha = 1) => `#E8E8E8,${alpha}`,
  snackBlue: (alpha = 1) => `rgba(0, 112, 208, ${alpha})`,
};
export default Colors;