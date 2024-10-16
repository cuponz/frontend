import { useMemo, useState, useCallback, useEffect } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { supportedLanguages } from "@/generated/supportedLanguages";

const STORAGE_VERSION = 1;
const DEFAULT_LANGUAGE = "en";

const translationCache = {};

const getSupportedLanguages = () => {
	if (!supportedLanguages) {
		console.error("Failed to load supported languages", error);
		return ["en"]; // Fallback to a default set if something goes wrong
	}

	return supportedLanguages;
};

const loadTranslations = async (language) => {
	if (translationCache[language]) {
		return translationCache[language]; // Return cached translations if available
	}

	try {
		const module = await import(`../locales/${language}.json`);
		const translations = module.default;
		translationCache[language] = translations; // Cache the loaded translations
		return translations;
	} catch (error) {
		console.error(`Failed to load translations for ${language}`, error);
		if (language !== DEFAULT_LANGUAGE) {
			const fallbackModule = await import(
				`../locales/${DEFAULT_LANGUAGE}.json`
			);
			const fallbackTranslations = fallbackModule.default;
			translationCache[DEFAULT_LANGUAGE] = fallbackTranslations; // Cache fallback translations
			return fallbackTranslations;
		}
		return {};
	}
};

export const useTranslationStore = create(
	persist(
		(set) => ({
			language: DEFAULT_LANGUAGE,
			setLanguage: (lang) => set({ language: lang }),
		}),
		{
			name: "language-preference",
			storage: createJSONStorage(() => localStorage),
			version: STORAGE_VERSION,
			partialize: (state) => ({ language: state.language }),
		},
	),
);

export const useTranslations = () => {
	const { language, setLanguage } = useTranslationStore();
	const [translations, setTranslations] = useState({});

	// Cache supported languages using useMemo
	const supportedLanguages = useMemo(() => getSupportedLanguages(), []);

	useEffect(() => {
		loadTranslations(language).then(setTranslations);
	}, [language]);

	const t = useCallback(
		(keys) => {
			return keys.reduce((acc, key) => acc?.[key], translations) ?? "undefined";
		},
		[translations],
	);

	return { t, language, setLanguage, supportedLanguages };
};
