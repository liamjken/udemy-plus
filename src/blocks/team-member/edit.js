import { 
    useBlockProps, InspectorControls, RichText, MediaPlaceholder, BlockControls, MediaReplaceFlow
  } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { 
    PanelBody, TextareaControl, Spinner, ToolbarButton, Tooltip,Icon 
  } from '@wordpress/components';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob'
import { useState } from '@wordpress/element'

export default function ({ attributes, setAttributes, context }) {
    const { 
      name, title, bio, imgID, imgAlt, imgURL, socialHandles
    } = attributes;
    const blockProps = useBlockProps();

    const [imgPreview, setImgPreview] = useState(imgURL);

    const selectImg = (img) => { 

        let newImgURL = null

        if (isBlobURL(img.url)) {
          newImgURL = img.url
        } else {
          newImgURL = img.sizes ?
          img.sizes.teamMember.url :
          img.media_details.sizes.teamMember.source_url

          setAttributes({
            imgID: img.id,
            imgAlt: img.alt,
            imgURL: newImgURL
          })

          revokeBlobURL(imgPreview)
        }


        setImgPreview(newImgURL)
      }

      const selectImgURL = (url) => {
        setAttributes({
          imgID: null,
          imgAlt: null,
          imgURL: url
        });
        setImgPreview(url);
      };

      const imageClass = `wp-image-${imgID} img-${context["udemy-plus/image-shape"]}`;

    return (
      <>
      { imgPreview && (
      <BlockControls group="inline">
            <MediaReplaceFlow 
        name={__('Replace Image', 'udemy-plus')}
        mediaId={imgID}
        mediaURL={imgURL}
        accept={['image']}
        onError={error => console.error(error)}
        onSelect={selectImg}
        onSelectURL={selectImgURL}
        />
        <ToolbarButton
        onClick={() => {
            setAttributes({
                imgId: 0,
                imgAlt: "",
                imgUrl: "",
            });
            setImgPreview("");
        }}>
        
        {__("Remove Image", "udemy-plus")}</ToolbarButton>
      </BlockControls>
       )}
        <InspectorControls>
          <PanelBody title={__('Settings', 'udemy-plus')}>
            {
                imgPreview && !isBlobURL(imgPreview) && (
                    <TextareaControl 
                    label={__('Alt Attribute', 'udemy-plus')}
                    value={imgAlt}
                    onChange={imgAlt => setAttributes({imgAlt})}
                    help={__(
                      'Description of your image for screen readers.',
                      'udemy-plus'
                    )}
                  />
                )}
           
          </PanelBody>
        </InspectorControls>
        <div {...blockProps}>
          <div className="author-meta">
            { imgPreview && (
            <img src={imgPreview} alt={imgAlt} className={imageClass}/>
            )}
            { isBlobURL(imgPreview ) && <Spinner /> }
            <MediaPlaceholder 
              allowedTypes={['image']}
              accept={'image/*'}
              icon="admin-users"
              onSelect={selectImg}
              onError={error => console.error(error)}
              disableMediaButtons={imgPreview}
              onSelectURL={selectImgURL}
            />
            <p>
              <RichText 
                placeholder={__('Name', 'udemy-plus')}
                tagName="strong"
                onChange={name => setAttributes({name})}
                value={name}
              />
              <RichText 
                placeholder={__('Title', 'udemy-plus')}
                tagName="span"
                onChange={title => setAttributes({title})}
                value={title}
              />
            </p>
          </div>
          <div className="member-bio">
            <RichText 
              placeholder={__('Member bio', 'udemy-plus')}
              tagName="p"
              onChange={bio => setAttributes({bio})}
              value={bio}
            />
          </div>
          <div className="social-links">
            {socialHandles.map((handle, index) => {
              return (
              <a href={handle.url} key={index}>
                <i className={`bi bi-${handle.icon}`}></i>
              </a>
              );
            })}
            <Tooltip text={__('Add Social Meida Handle', "udemy-plus")}>
            <a href="" onClick={event => {
              event.preventDefault()
              setAttributes({
                socialHandles: [...socialHandles, {
                  icon: "question",
                  url: "",
                },
              ],
              });

            }} 
            >
              <Icon icon="plus" />
            </a>
            </Tooltip>
          </div>
        </div>
      </>
    );
  }