# BHCC — состояние на 20 июля, вечер

Всё запушено в `main` → https://github.com/Sigovs/BHCC. Локальный == origin.
Открыть локально: `python3 -m http.server 8899` в этой папке, затем `/index.html`.
Статика, сборка не нужна. Токены/шрифты/палитра — `assets/css/tokens.css`.

## Четыре файла — что каждый

- **`index.html`** — 🟢 ОСНОВНОЙ. Светлая editorial-страница, полная сверху донизу.
- **`index2.html`** — тёмный кинематографичный концепт «Night Drive» (лаборатория идей).
- **`index3.html`** — версия по `refference/wireframe_test.jpg` (тёмный full-screen hero + светлое тело).
- **`design-system.html`** — спека светлой системы (типографика, палитра с контрастами, кнопки primary/secondary, карточка, отступы).

## index.html — что уже собрано (секции сверху вниз)

1. Hero — full-screen тёплый закат PCH, 300SL, центр-заголовок, pill-кнопки, поиск-полоса под ним.
2. Featured — 6 landscape-карточек 3×2, РЕАЛЬНЫЕ машины BHCC (спарсены с сайта) + gold-цены.
3. Breaker-1 (Alfa под мостом, день) — full-bleed.
4. Founder — реальный Alex у Ferrari 308, фото full-bleed слева, цитата справа.
5. Sell «We buy classic cars.» — фон showroom (белый Porsche), контент ВЛЕВО, пропорция 2:1, параллакс.
6. Testimonials — цитата + 6 реальных пресс-логотипов (монохром).
7. Breaker-2 (Datsun ночью, LA skyline) — full-bleed, «Los Angeles · Since 2001».
8. News & Events — cayenne-формат: тёмная секция, staggered 3×3 плитки + scroll-параллакс, заголовок справа.
9. Footer — тёмный, sticky-reveal (проявляется из-под контента).

Кнопки: два типа — `.btn--primary` / `.btn--secondary` (на тёмном инвертируются). Совпадают с design-system.html.

## Что доделать дома (по убыванию)

1. **Клиент недоволен общим результатом** («хреново») — нужен свежий проход арт-директора: ритм, где перегруз/пусто, консистентность. Смотреть глазами целиком, не по секциям.
2. **Плитки News/Events не кликабельны** — если нужны ссылки на статьи/Instagram, добавить href (URL от клиента).
3. **Плейсхолдер-текст** — отзывы, News/Events заголовки/даты, часть цен (Porsche 356A/Jaguar/Mercedes — типовые, не с сайта) заменить на реальные.
4. **Мобильная вычитка** (390) всех новых секций — breakers, News staggered, sell влево, footer reveal.
5. Перенос удачных решений в index3, если он остаётся вариантом (breakers, cayenne News, full-bleed founder, horizontal inventory).
6. Мелочь: `assets/images/press/hemmings-original.svg.bak` — резерв, удалить если не нужен.

## Открытые вопросы к клиенту (не от нас зависят)

- Hero-видео (реальный ролик под каждый hero-вариант; сейчас постеры/статика).
- Реальный контент WordPress: отзывы, посты, точные цены/ссылки инвентаря.
- Какой из вариантов (index / index2 / index3) финальный — или гибрид.

## Материалы

- `refference/` — бриф (PDF), вайрфреймы, ref1–ref9 концепты, wireframe_test.jpg, портрет Alex.
- Исходные фото клиента с пробелами в именах (`We buy classic cars. /`, `abput Alex Manos, Founder/`, `testimonials press/`) — оригиналы, оптимизированные версии уже в `assets/images/`.
- `assets/images/*_n.jpg` — 14 профессиональных фото машин BHCC (Instagram), часть использована в News-плитках.
