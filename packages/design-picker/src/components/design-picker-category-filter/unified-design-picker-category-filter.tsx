import { ResponsiveToolbarGroup } from '@automattic/components';
import type { Category } from '../../types';
import type { ReactElement } from 'react';
import './style.scss';

interface Props {
	categories: Category[];
	selectedSlug: string | null;
	onSelect: ( selectedSlug: string | null ) => void;
}

export function UnifiedDesignPickerCategoryFilter( {
	categories,
	onSelect,
	selectedSlug,
}: Props ): ReactElement | null {
	const onClick = ( index: number ) => {
		const category = categories[ index ];
		onSelect( category?.slug );
	};
	const initialActiveIndex = categories.findIndex( ( { slug } ) => slug === selectedSlug );
	return (
		<div className="unified-design-picker-category-filter">
			<ResponsiveToolbarGroup
				initialActiveIndex={ initialActiveIndex !== -1 ? initialActiveIndex : 0 }
				onClick={ onClick }
			>
				{ categories.map( ( category ) => (
					<span key={ `category-${ category.slug }` }>{ category.name }</span>
				) ) }
			</ResponsiveToolbarGroup>
		</div>
	);
}