/**
 * Spacing scale for consistent margins and paddings
 * Based on a 4px grid system
 */
export const spacing = {
  // Base spacing values
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,

  // Additional spacing for larger gaps
  xxxl: 32,
  huge: 48,

  // Screen padding
  screenPadding: 16,
  cardPadding: 12,

  // Border radius
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 9999,
  },
};

// Common layout helpers
export const layout = {
  // Full width/height
  fullWidth: '100%',
  fullHeight: '100%',

  // Flex helpers
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  alignCenter: {
    alignItems: 'center',
  },
};

export default spacing;

