import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Scoring models',
    path: '/model',
    icon: icon('ic-user'),
  },
  {
    title: 'Scoring history',
    path: '/scoring',
    icon: icon('ic-cart'),
  },
  {
    title: 'Monitoring',
    path: '/monitoring',
    icon: icon('ic-blog'),
  },
  // {
  //   title: 'Home',
  //   path: '/home',
  //   icon: icon('ic-analytics'),
  // },
  // {
  //   title: 'User',
  //   path: '/user',
  //   icon: icon('ic-user'),
  // },
  // {
  //   title: 'Product',
  //   path: '/products',
  //   icon: icon('ic-cart'),
  //   info: (
  //     <Label color="error" variant="inverted">
  //       +3
  //     </Label>
  //   ),
  // },
  // {
  //   title: 'Blog',
  //   path: '/blog',
  //   icon: icon('ic-blog'),
  // },
  {
    title: 'Sign in',
    path: '/sign-in',
    icon: icon('ic-lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic-disabled'),
  },
];
