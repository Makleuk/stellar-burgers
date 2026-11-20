STELLAR BURGERS — ФАЙЛЫ ДЛЯ СПРИНТА С ТЕСТАМИ

В архиве находятся только новые/добавленные файлы для существующего проекта.
Существующие компоненты, стили, package.json, package-lock.json и папку .git заменять не нужно.

КУДА РАСПАКОВАТЬ
1. Откройте папку C:\Users\danil\Downloads\stellar-burgers-github.
2. Распакуйте содержимое архива прямо в эту папку, сохраняя структуру каталогов.
3. Если Windows спросит об объединении папок — согласитесь. Если спросит о замене файлов — не заменяйте существующие файлы без согласования.

ДОБАВЛЯЕМЫЕ ФАЙЛЫ
- src/services/slices/ingredients-slice.test.ts — Jest-тесты ingredientsSlice.
- src/services/slices/constructor-slice.test.ts — Jest-тесты constructorSlice.
- tests/constructor.pl.tsx — Playwright-тесты конструктора.
- tests/hars/constructor.har — HAR-моки API ingredients, auth/user и orders.

В ТЕКУЩЕМ package.json уже есть зависимости Jest/Playwright и команды:
- npm test -- --runInBand
- npm run e2e

ПЕРЕД PUSH
Сначала запустите Jest и Playwright, проверьте результат и только потом делайте commit/push.
Архив не содержит .git, node_modules и не меняет ветки Git.
