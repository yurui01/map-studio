import { Icon, IconifyIcon as IconifyIconProps } from '@iconify/react'
import { Box, ThemeIconProps, BoxProps, ThemeIcon } from '@mantine/core'

interface IconifyProps extends BoxProps {
  icon: IconifyIconProps | string
  width?: number
  height?: number
  sx?: any
  color?: string
}

export default function Iconify({
  icon,
  width = 20,
  height = 20,
  sx,
  color,
  ...other
}: IconifyProps) {
  return (
    <Box
      {...other}
      sx={{
        ...sx,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon icon={icon} width={width} height={height} color={color} />
    </Box>
  )
}
