import { BREAKPOINTS } from "~/styles/globals";

module.exports = {
  plugins: {
    "postcss-preset-mantine": {},
    "postcss-simple-vars": {
      variables: {
        "mantine-breakpoint-xs": BREAKPOINTS.XS,
        "mantine-breakpoint-sm": BREAKPOINTS.SM,
        "mantine-breakpoint-md": BREAKPOINTS.MD,
        "mantine-breakpoint-lg": BREAKPOINTS.LG,
        "mantine-breakpoint-xl": BREAKPOINTS.XL,
      },
    },
  },
};
