# Shelter

Shelter – это учебный проект Stage#1 курса "JavaScript/Front-end" школы Rolling Scopes School от [EPAM](https://www.epam.com/), в ходе выполнения которого сверстан сайт, состоящий из двух страниц.

**[Демо](https://kirsawka.github.io/shelter/pages/main/index.html)**

![image](https://user-images.githubusercontent.com/83959481/191022228-0b13b08f-bc75-456e-85ba-db4839c472fe.png)

## Ключевые навыки:
- валидная семантическая адаптивная вёрстка
- легкоподдерживаемый читаемый код
- экспорт стилей и графики из Figma
- использование JavaScript для реализации указанного в задании функционала

## Этапы работы над проектом:
#### 1. Фиксированная вёрстка.    
  В этой части задания необходимо было сверстать страницы по [макету](https://www.figma.com/file/tKcmzkARtMUFQAR9VLdLkl/shelter-dom), которая корректно отображается при 
  ширине экрана не меньше 1280рх. Проверялась валидность и семантичность вёрстки, её совпадение с макетом. Допускалось отклонение вёрстки от макета до 10px по 
  горизонтали и вертикали, если соблюдается визуальное сходство вёрстки и макета. В качестве инструмента для проверки соответствия вёрстки макету использовалось 
  расширение PerfectPixel.
#### 2. Адаптивная вёрстка.  
  В этой части задания требовлось добавить адаптивность свёрстанной странице. При ширине страницы 768рх ставилась задача совпадения вёрстки с макетом, на 
остальных разрешениях до 320рх включительно достаточно было обеспечить отсутствие горизонтальной полосы прокрутки.
Также на этом этапе в вёрстку добавилось адаптивное меню, для создания которого использован JavaScript.
#### 3. Добавление функционала.  
  Данные о питомцах представлены в файле формата json, всего записей 8. На основе этих данных реализован следующий функционал:
  
- бесконечный слайдер:

каждый новый слайд на странице `About the shelter` содержит псевдослучайный набор питомцев, т.е. генерируется из исходных объектов в случайном 
порядке, с двумя условиями:
    - в самом блоке слайда карточки с питомцами не повторяются
    - в следующем блоке нет дублирующихся карточек с карточками текущего блока
- пагинация:
    - по условиям задания каждый из 8 приведенных на макете питомцев встречается ровно 6 раз на странице `Our Pets`. При этом на одной странице пагинации 
    не может быть одновременно два одинаковых питомца
    - при неизменных размерах области пагинации, при возвращении на страницу под определенным номером, контент на ней всегда будет одинаков
- попап:
    - всплывает поверх страницы при нажатии на любое место карточки с описанием конкретного питомца. Остальная часть страницы затемняется
    - при открытии попапа вертикальный скролл становится неактивным
  

