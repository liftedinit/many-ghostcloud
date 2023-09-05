import { theme as liftedTheme } from '@liftedinit/ui'
import { extendTheme } from '@chakra-ui/react'

const colors = {
  green: '#00f900',
  blueBlack: '#15181b',
}

const theme = extendTheme({
  ...liftedTheme,
  components: {
    Button: {
      variants: {
        primary: {
          bg: liftedTheme.colors.gray[200],
          _disabled: {
            opacity: 0.6,
            cursor: 'auto',
          },
          _hover: {
            _disabled: {
              background: liftedTheme.colors.gray[100],
            },
          },
        },
        green: {
          bg: colors.green,
          color: liftedTheme.colors.black,
        },
      },
      defaultProps: {
        variant: 'primary',
      },
    },
  },
  colors: {
    gc: {
      ...colors,
    },
  },
})

export default theme
