module.exports = {
  parser: "@typescript-eslint/parser", // Указываем парсер для TypeScript
  extends: [
    "eslint:recommended", // Базовые правила ESLint
    "plugin:@typescript-eslint/recommended", // Рекомендуемые правила для TypeScript
    "plugin:react/recommended", // Рекомендуемые правила для React
    "plugin:react-native/all", // Рекомендуемые правила для React Native
    "plugin:prettier/recommended", // Добавляем рекомендованные настройки Prettier
  ],
  plugins: [
    "@typescript-eslint", // Плагин для TypeScript
    "react", // Плагин для React
    "react-native", // Плагин для React Native
    "prettier", // Плагин для Prettier
  ],
  settings: {
    react: {
      version: "detect", // Автоматически определяет версию React
    },
  },
  env: {
    "react-native/react-native": true, // Окружение для React Native
    es6: true, // Поддержка ES6
  },
  rules: {
    // Здесь можно переопределить или добавить свои правила
    "react-native/no-unused-styles": 0,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": 0,
    "react-native/no-color-literals": 0,
    "react-native/no-raw-text": 0,
    "react/react-in-jsx-scope": 0,
    "react-native/no-single-element-style-arrays": 2,
    "@typescript-eslint/explicit-function-return-type": "off", // Отключаем требование явного указания возвращаемого типа
    "@typescript-eslint/no-explicit-any": "off", // Разрешаем использование `any`
    "react/prop-types": "off", // Отключаем проверку prop-types, так как используем TypeScript
    "prettier/prettier": "error", // Включаем Prettier как правило ESLint
  },
  parserOptions: {
    ecmaVersion: 2020, // Версия ECMAScript
    sourceType: "module", // Используем модули
    ecmaFeatures: {
      jsx: true, // Поддержка JSX
    },
  },
};
