import { getPlanClass, FEATURE_CUSTOM_DOMAIN, isFreePlan } from '@automattic/calypso-products';
import styled from '@emotion/styled';
import classNames from 'classnames';
import { useTranslate } from 'i18n-calypso';
import { useGetWordPressSubdomain } from '../hooks/use-get-wordpress-subdomain';
import { PlanFeaturesItem } from './item';
import { LoadingPlaceHolder } from './loading-placeholder';
import { Plans2023Tooltip } from './plans-2023-tooltip';
import type { TransformedFeatureObject } from '../types';

const SubdomainSuggestion = styled.div`
	.is-domain-name {
		position: absolute;
		top: -15px;
		color: var( --studio-gray-50 );
		text-decoration: line-through;
		max-width: 80%;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
`;

const FreePlanCustomDomainFeature: React.FC< { domainName: string } > = ( { domainName } ) => {
	const {
		data: wordPressSubdomainSuggestion,
		isInitialLoading,
		isError,
	} = useGetWordPressSubdomain( domainName );

	return (
		<SubdomainSuggestion>
			<div className="is-domain-name">{ domainName }</div>
			{ isInitialLoading && <LoadingPlaceHolder /> }
			{ ! isError && <div>{ wordPressSubdomainSuggestion?.domain_name }</div> }
		</SubdomainSuggestion>
	);
};

const PlanFeatures2023GridFeatures: React.FC< {
	features: Array< TransformedFeatureObject >;
	planName: string;
	domainName: string;
	hideUnavailableFeatures: boolean;
} > = ( { features, planName, domainName, hideUnavailableFeatures } ) => {
	const translate = useTranslate();
	return (
		<>
			{ features.map( ( currentFeature, featureIndex ) => {
				if ( hideUnavailableFeatures && ! currentFeature.availableForCurrentPlan ) {
					return null;
				}
				const key = `${ currentFeature.getSlug() }-${ featureIndex }`;

				const isFreePlanAndCustomDomainFeature =
					currentFeature.getSlug() === FEATURE_CUSTOM_DOMAIN && isFreePlan( planName );

				const divClasses = classNames( '', getPlanClass( planName ), {
					'is-last-feature': featureIndex + 1 === features.length,
				} );
				const spanClasses = classNames( 'plan-features-2023-grid__item-info', {
					'is-annual-plan-feature': currentFeature.availableOnlyForAnnualPlans,
					'is-available':
						isFreePlanAndCustomDomainFeature || currentFeature.availableForCurrentPlan,
				} );
				const itemTitleClasses = classNames( 'plan-features-2023-grid__item-title', {
					'is-bold':
						currentFeature.getSlug() === FEATURE_CUSTOM_DOMAIN
							? true
							: ! currentFeature.availableForCurrentPlan,
				} );

				return (
					<div key={ key } className={ divClasses }>
						<PlanFeaturesItem>
							<span className={ spanClasses } key={ key }>
								<span className={ itemTitleClasses }>
									{ isFreePlanAndCustomDomainFeature ? (
										<Plans2023Tooltip
											text={ translate( '%s is not included', {
												args: [ domainName ],
												comment: '%s is a domain name.',
											} ) }
										>
											<FreePlanCustomDomainFeature key={ key } domainName={ domainName } />
										</Plans2023Tooltip>
									) : (
										<Plans2023Tooltip text={ currentFeature.getDescription?.() }>
											{ currentFeature.getTitle( domainName ) }
										</Plans2023Tooltip>
									) }
								</span>
							</span>
						</PlanFeaturesItem>
					</div>
				);
			} ) }
		</>
	);
};

export default PlanFeatures2023GridFeatures;
