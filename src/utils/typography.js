import Typography from 'typography'
import irvingTheme from 'typography-theme-irving'
import colors from './colors'
irvingTheme.bodyFontFamily = ['Montserrat', 'sans-serif']

irvingTheme.overrideThemeStyles = ({ rhythm }, options, styles) => ({
  'a:hover': {
    color: colors.main,
  },
})

const typography = new Typography(irvingTheme)

export default typography
