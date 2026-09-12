import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
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

type ArticleParamsFormProps = {
	onApply: (parameters: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const [isOpen, setIsOpen] = useState(false);

	const formRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handleClickOutside = (e: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const onReset = () => {
		setFormState(defaultArticleState);
		props.onReset();
		setIsOpen(false);
	};

	const onApply = (e: FormEvent) => {
		e.preventDefault();
		props.onApply(formState);
		setIsOpen(false);
	};

	const updateFormField = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setFormState((prev) => ({
				...prev,
				[field]: value,
			}));
		};
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
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={updateFormField('fontFamilyOption')}
					/>
					<RadioGroup
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						title='Размер шрифта'
						onChange={updateFormField('fontSizeOption')}
						name='fontSize'
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={updateFormField('fontColor')}
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={updateFormField('backgroundColor')}
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={updateFormField('contentWidth')}
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
