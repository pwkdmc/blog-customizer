import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { AppParameters } from '../app/app';

type ArticleParamsFormProps = {
	onApply: (parameters: AppParameters) => void;
	onReset: () => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [fontFamily, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [bgColor, setBgColor] = useState(defaultArticleState.backgroundColor);
	const [containerWidth, setContainerWidth] = useState(
		defaultArticleState.contentWidth
	);

	const formRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const onReset = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBgColor(defaultArticleState.backgroundColor);
		setContainerWidth(defaultArticleState.contentWidth);
		props.onReset();
		setIsOpen(false);
	};

	const onApply = (e: FormEvent) => {
		e.preventDefault();
		props.onApply({
			fontFamily,
			fontSize,
			fontColor,
			bgColor,
			containerWidth,
		});
		setIsOpen(false);
	};

	return (
		<div ref={formRef}>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen((isOpen) => !isOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={onApply}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={fontFamily}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(selected: OptionType) => {
							setFontFamily(selected);
						}}
					/>
					<RadioGroup
						selected={fontSize}
						options={fontSizeOptions}
						title='Размер шрифта'
						onChange={(selected: OptionType) => {
							setFontSize(selected);
						}}
						name='fontSize'
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(selected: OptionType) => {
							setFontColor(selected);
						}}
					/>
					<Separator />
					<Select
						selected={bgColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(selected: OptionType) => {
							setBgColor(selected);
						}}
					/>
					<Select
						selected={containerWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(selected: OptionType) => {
							setContainerWidth(selected);
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={onReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
