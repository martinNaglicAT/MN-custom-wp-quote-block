/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { InspectorControls } from '@wordpress/block-editor'; // Import InspectorControls from block-editor, not components
import { PanelBody, Toolbar } from '@wordpress/components';

// Register the block
registerBlockType( 'mn-custom-block-quote/custom-quote-block', {
    apiVersion: 3,
    title: 'Custom Quote',
    icon: 'format-quote',
    category: 'text',
    attributes: {
        quote: {
            type: 'string',
            source: 'html',
            selector: 'blockquote',
        },
        citation: {
            type: 'string',
            source: 'html',
            selector: 'cite',
        },
        customClassName: {
            type: 'string',
            default: 'is-style-none', // default custom class
        },
    },
    example: {
        attributes: {
            quote: 'This is a sample quote',
            citation: 'John Doe',
        },
    },
    edit: ( props ) => {
        const {
            attributes: { quote, citation, customClassName },
            setAttributes,
            className,
        } = props;
        const blockProps = useBlockProps();

        const onChangeQuote = ( newQuote ) => {
            setAttributes( { quote: newQuote } );
        };

        const onChangeCitation = ( newCitation ) => {
            setAttributes( { citation: newCitation } );
        };

        const onChangeCustomClassName = ( newClassName ) => {
            setAttributes({ customClassName: newClassName });
        };

        const defaultClassName = 'wp-block-mn-custom-block-quote-custom-quote-block'; // Default class name


        return (
            <blockquote { ...blockProps } className={`${defaultClassName} ${customClassName}`} >
                <InspectorControls>
                    <PanelBody title="Style Selector">
                        <div className='custom-quote-toolbar'>
                            <Toolbar>
                                <button
                                    className={`components-button components-toolbar__control ${
                                        customClassName === 'is-style-line' ? 'is-pressed' : ''
                                    }`}
                                    onClick={() => onChangeCustomClassName('is-style-line')}
                                >
                                    Črta
                                </button>
                                <button
                                    className={`components-button components-toolbar__control ${
                                        customClassName === 'is-style-none' ? 'is-pressed' : ''
                                    }`}
                                    onClick={() => onChangeCustomClassName('is-style-none')}
                                >
                                    Navadni
                                </button>
                                <button
                                    className={`components-button components-toolbar__control ${
                                        customClassName === 'is-style-green' ? 'is-pressed' : ''
                                    }`}
                                    onClick={() => onChangeCustomClassName('is-style-green')}
                                >
                                    Zeleni
                                </button>
                            </Toolbar> 
                        </div>
                        
                    </PanelBody>
                </InspectorControls>
                <RichText
                    tagName="blockquote"
                    onChange={ onChangeQuote }
                    value={ quote }
                    placeholder="Enter a quote..."
                    className={ customClassName } // Apply custom class here
                />
                <RichText
                    tagName="cite"
                    onChange={ onChangeCitation }
                    value={ citation }
                    placeholder="Enter the citation..."
                    className={ customClassName } // Apply custom class here
                />
            </blockquote>
        );
    },
    save: ( props ) => {
        const blockProps = useBlockProps.save();
        const { customClassName } = props.attributes; // Retrieve customClassName from attributes
        const defaultClassName = 'wp-block-mn-custom-block-quote-custom-quote-block'; // Default class name

        return (
            <div {...blockProps} className={`${defaultClassName} ${customClassName}`}>
                <RichText.Content tagName="blockquote" value={props.attributes.quote} />
                <RichText.Content tagName="cite" value={props.attributes.citation} />
            </div>
        );
    },
} );
