import getJetpackSettingsSaveRequestStatus from 'calypso/state/selectors/get-jetpack-settings-save-request-status';

/**
 * Returns true if the save Jetpack site settings requests is successful
 *
 * @param  {Object}  state     Global state tree
 * @param  {number}  siteId    Site ID
 * @param  {Object}  settings  The settings we're updating
 * @returns {boolean}           Whether the request is successful or not
 */
export default function isJetpackSettingsSaveFailure( state, siteId, settings ) {
	return getJetpackSettingsSaveRequestStatus( state, siteId, settings ) === 'failure';
}
