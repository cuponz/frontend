import { useState, useCallback, useEffect } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const STORAGE_VERSION = 1;
const DEFAULT_LANGUAGE = "en";

const getSupportedLanguages = async () => {
  try {
    const context = require.context("../locales", false, /\.json$/);
    return context.keys().map((key) => key.match(/\.\/(.*)\.json/)[1]);
  } catch (error) {
    console.error("Failed to load supported languages", error);
    return ["en", "es"];
  }
};

const loadTranslations = async (language) => {
  try {
    const module = await import(`../locales/${language}.json`);
    return module.default;
  } catch (error) {
    console.error(`Failed to load translations for ${language}`, error);
    if (language !== DEFAULT_LANGUAGE) {
      const fallbackModule = await import(
        `../locales/${DEFAULT_LANGUAGE}.json`
      );
      return fallbackModule.default;
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
    }
  )
);

export const useTranslations = () => {
  const { language, setLanguage } = useTranslationStore();
  const [translations, setTranslations] = useState({});
  const [supportedLanguages, setSupportedLanguages] = useState([]);

  useEffect(() => {
    getSupportedLanguages().then(setSupportedLanguages);
  }, []);

  useEffect(() => {
    loadTranslations(language).then(setTranslations);
  }, [language]);

  const t = useCallback((key) => translations[key] || key, [translations]);

  return { t, language, setLanguage, supportedLanguages };
};