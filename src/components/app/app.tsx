import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	OptionType,
} from './../../constants/articleProps';

import styles from './app.module.scss';

export type AppParameters = {
	fontFamily: OptionType;
	fontSize: OptionType;
	fontColor: OptionType;
	bgColor: OptionType;
	containerWidth: OptionType;
};

export const App = () => {
	const [fontFamily, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [bgColor, setBgColor] = useState(defaultArticleState.backgroundColor);
	const [containerWidth, setContainerWidth] = useState(
		defaultArticleState.contentWidth
	);

	const onApply = (parameters: AppParameters) => {
		setFontFamily(parameters.fontFamily);
		setFontSize(parameters.fontSize);
		setFontColor(parameters.fontColor);
		setBgColor(parameters.bgColor);
		setContainerWidth(parameters.containerWidth);
	};

	const onReset = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBgColor(defaultArticleState.backgroundColor);
		setContainerWidth(defaultArticleState.contentWidth);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': fontFamily.value,
					'--font-size': fontSize.value.replace(' ', ''),
					'--font-color': fontColor.value,
					'--bg-color': bgColor.value,
					'--container-width': containerWidth.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={onApply} onReset={onReset} />
			<Article />
		</main>
	);
};
