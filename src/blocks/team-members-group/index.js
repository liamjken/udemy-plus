import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import icons from '../../icons.js';
import './main.css';
import edit from './edit.js';
import save from './save.js';

registerBlockType('udemy-plus/team-members-group', {
  icon: {
    src: icons.primary
  },
edit,
save
});