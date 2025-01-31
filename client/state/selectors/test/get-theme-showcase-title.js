import { getThemeShowcaseTitle } from 'calypso/state/themes/selectors';
import { state } from './fixtures/theme-filters';

describe( 'getThemeShowcaseTitle()', () => {
	test( 'should return the correct title for a known vertical', () => {
		const title = getThemeShowcaseTitle( state, { vertical: 'business' } );
		expect( title ).toEqual( 'Business WordPress Themes' );
	} );

	test( 'should return the correct title for a known filter', () => {
		const title = getThemeShowcaseTitle( state, { filter: 'minimal' } );
		expect( title ).toEqual( 'Minimal WordPress Themes' );
	} );

	test( 'should fall back to tier if multiple filters are specified', () => {
		const title = getThemeShowcaseTitle( state, { filter: 'artwork+blog', tier: 'free' } );
		expect( title ).toEqual( 'Free WordPress Themes' );
	} );

	test( 'should return correct title if only premium tier is specified', () => {
		const title = getThemeShowcaseTitle( state, { tier: 'premium' } );
		expect( title ).toEqual( 'Premium WordPress Themes' );
	} );

	test( 'should return correct title if only free tier is specified', () => {
		const title = getThemeShowcaseTitle( state, { tier: 'free' } );
		expect( title ).toEqual( 'Free WordPress Themes' );
	} );

	test( 'should return the generic Theme Showcase title if no additional args are provided', () => {
		const title = getThemeShowcaseTitle( state );
		expect( title ).toEqual( 'WordPress Themes' );
	} );
} );
