import facebook_icon from '../assets/Imagex/facebook_icon.png';
import twitter_icon from '../assets/Imagex/twitter_icon.png';
import insta_icon from "../assets/Imagex/insta_icon.png"

export const assets = [
  facebook_icon,
  twitter_icon,
  insta_icon
]

const data = [
  {
    id: 'all',
    title: 'All',
    className: 'all_items',
    image: 'src/assets/Imagex/all-.png',
    link: '/',
    hint: 'All items'
  },
    {
    id: 'veg',
    title: 'Veg',
    className: 'veg_item',
    image: 'src/assets/Imagex/Veg.webp',
    link: '/veg',
    hint: 'Explore veg items'
  },
  {
    id: 'non-veg',
    title: 'Non-Veg',
    className: 'nonveg',
    image: 'src/assets/Imagex/304247.png',
    link: '/non-veg',
    hint: 'Check non-veg dishes'
  },
  {
    id: 'snacks',
    title: 'Snacks',
    className: 'snack',
    image: 'src/assets/Imagex/snack_859354.png',
    link: '/snacks',
    hint: 'Tasty snacks here'
  }
];




export default data;