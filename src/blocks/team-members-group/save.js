import { 
  useBlockProps, InnerBlocks
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';


export default function ({ attributes }) {
    const { columns } = attributes
    
    const blockProps = useBlockProps.save({
      className: `cols-${columns}`
    });

    return (
      <div {...blockProps}>
        <InnerBlocks.Content />
      </div>
    )
  }