/**
 * Typography configuration for the POS application
 * Uses Inter font family with predefined sizes
 */
export const typography = {
  // Font family
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
  },

  // Font sizes
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },

  // Line heights
  lineHeights: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 40,
  },

  // Font weights
  weights: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },
};

// Pre-defined text styles for consistency
export const textStyles = {
  heading1: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.sizes.xxl,
    lineHeight: typography.lineHeights.xxl,
    fontWeight: typography.weights.bold,
  },
  heading2: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.sizes.xl,
    lineHeight: typography.lineHeights.xl,
    fontWeight: typography.weights.semiBold,
  },
  heading3: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.sizes.lg,
    lineHeight: typography.lineHeights.lg,
    fontWeight: typography.weights.semiBold,
  },
  body: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.sizes.md,
    lineHeight: typography.lineHeights.md,
    fontWeight: typography.weights.regular,
  },
  bodySmall: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.sizes.sm,
    lineHeight: typography.lineHeights.sm,
    fontWeight: typography.weights.regular,
  },
  caption: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.sizes.xs,
    lineHeight: typography.lineHeights.xs,
    fontWeight: typography.weights.regular,
  },
  button: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.sizes.md,
    lineHeight: typography.lineHeights.md,
    fontWeight: typography.weights.semiBold,
  },
};

export default typography;

