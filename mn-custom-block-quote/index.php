<?php
/**
 * Plugin Name: MN Custom Block Quote
 */
function gutenberg_custom_quote_register_block() {
    register_block_type( __DIR__ );
}
add_action( 'init', 'gutenberg_custom_quote_register_block' );