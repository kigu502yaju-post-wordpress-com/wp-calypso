const sharedConfig = require( '../config/_shared.json' );
const devConfig = require( '../config/development.json' );
const storybookDefaultConfig = require( '@automattic/calypso-storybook' );

const storybookConfig = storybookDefaultConfig( {
	stories: [ '../client/**/*.stories.{ts,tsx}' ],
} );

const configData = { ...sharedConfig, ...devConfig };
storybookConfig.previewHead = ( head ) => `
	${ head }
	<script>
		window.configData = ${ JSON.stringify( configData ) };
	</script>
`;

module.exports = storybookConfig;