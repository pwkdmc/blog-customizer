import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const onApply = (parameters: ArticleStateType) => {
		setArticleState(parameters);
	};

	const onReset = () => {
		setArticleState(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value.replace(' ', ''),
					'--font-color': articleState.fontColor.value,
					'--bg-color': articleState.backgroundColor.value,
					'--container-width': articleState.contentWidth.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={onApply} onReset={onReset} />
			<Article />
		</main>
	);
};
