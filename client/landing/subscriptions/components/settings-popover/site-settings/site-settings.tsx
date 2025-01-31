import { SubscriptionManager } from '@automattic/data-stores';
import { useTranslate } from 'i18n-calypso';
import PopoverMenuItem from 'calypso/components/popover-menu/item';
import Separator from 'calypso/components/popover-menu/separator';
import SettingsPopover from '../settings-popover';
import DeliveryFrequencyInput from './delivery-frequency-input';
import NotifyMeOfNewPostsToggle from './notify-me-of-new-posts-toggle';
import UnsubscribeSiteButton from './unsubscribe-site-button';
import type { SiteSubscriptionDeliveryFrequency } from '@automattic/data-stores/src/reader/types';

type SiteSettingsProps = {
	notifyMeOfNewPosts: boolean;
	onNotifyMeOfNewPostsChange: ( value: boolean ) => void;
	updatingNotifyMeOfNewPosts: boolean;
	deliveryFrequency: SiteSubscriptionDeliveryFrequency;
	onDeliveryFrequencyChange: ( value: SiteSubscriptionDeliveryFrequency ) => void;
	onUnsubscribe: () => void;
	unsubscribing: boolean;
	updatingFrequency: boolean;
};

const SiteSettings = ( {
	notifyMeOfNewPosts,
	onNotifyMeOfNewPostsChange,
	updatingNotifyMeOfNewPosts,
	deliveryFrequency,
	onDeliveryFrequencyChange,
	onUnsubscribe,
	unsubscribing,
	updatingFrequency,
}: SiteSettingsProps ) => {
	const translate = useTranslate();
	const { isLoggedIn } = SubscriptionManager.useIsLoggedIn();

	return (
		<SettingsPopover>
			{ isLoggedIn && (
				<NotifyMeOfNewPostsToggle
					value={ notifyMeOfNewPosts }
					onChange={ onNotifyMeOfNewPostsChange }
					isUpdating={ updatingNotifyMeOfNewPosts }
				/>
			) }
			<PopoverMenuItem itemComponent="div" className="settings-popover__delivery-frequency-item">
				<p className="settings-popover__item-label">{ translate( 'Email me new posts' ) }</p>
				<DeliveryFrequencyInput
					value={ deliveryFrequency }
					onChange={ onDeliveryFrequencyChange }
					isUpdating={ updatingFrequency }
				/>
			</PopoverMenuItem>
			<Separator />
			<UnsubscribeSiteButton unsubscribing={ unsubscribing } onUnsubscribe={ onUnsubscribe } />
		</SettingsPopover>
	);
};

export default SiteSettings;
