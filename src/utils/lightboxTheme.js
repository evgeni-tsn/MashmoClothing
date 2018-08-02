import colors from './colors'
export const theme = {
  // container
  container: {
    background: colors.white + 'DD',
  },

  // arrows
  arrow: {
    backgroundColor: colors.main,
    fill: colors.white,
    opacity: 0.8,
    transition: 'opacity 200ms',

    ':hover': {
      opacity: 1,
    },
  },
  arrow__size__medium: {
    borderRadius: 40,
    height: 40,
    margin: '0 0.5rem',
    marginTop: -20,

    '@media (min-width: 768px)': {
      height: 70,
      padding: 15,
    },
  },
  arrow__direction__left: { marginLeft: 10 },
  arrow__direction__right: { marginRight: 10 },
  close: {
    fill: colors.black,
    opacity: 0.8,
    transition: 'all 200ms',
    ':hover': {
      opacity: 1,
    },
  },

  // footer
  footer: {
    color: colors.black,
  },
  footerCount: {
    color: colors.black,
  },

  // thumbnails
  thumbnail: {},
  thumbnail__active: {
    boxShadow: `0 0 0 2px ${colors.main}`,
  },
}
