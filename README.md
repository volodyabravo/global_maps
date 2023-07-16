# global_maps
Global maps project

# Как запустить проект в режиме разработки

1. Склонировать репозиторий
```shell
git clone <url репозитория>
```
2. Скопировать файл .env.example и переименовать в .env
3. Запустить docker-compose
```shell
docker-compose up -d
```
*Это запустит контейнеры с базой данных и с админкой к базе данных.*

4. Установить зависимости проекта Django
```shell
# Создать виртуальное окружение
python -m venv venv
# Активировать виртуальное окружение
source venv/bin/activate
# Установить зависимости
pip install -r requirements.txt
```

5. Запустить миграции
```shell
python website/manage.py migrate
```

6. Запустить проект
```shell
python website/manage.py runserver
```
7. Установить зависимости проектов frontend и printer
```shell
# Перейти в папку frontend
cd frontend
# Установить зависимости
pnpm install
# Перейти в папку printer
cd ../printer
# Установить зависимости
pnpm install
```

8. Запустить проекты frontend и printer
```shell
# Перейти в папку frontend
cd frontend
# Запустить проект
pnpm start # Это запустит проект фронтенда на http://localhost:3000
# Перейти в папку printer
cd ../printer
# Запустить проект
pnpm start # Это запустит проект принтера на http://localhost:6969
```

После этого проект будет доступен по адресу http://localhost:3000, а принтер по адресу http://localhost:6969 (принтер не имеет интерфейса, он просто слушает порт 6969 и печатает то, что ему приходит)

# Как запустить проект в режиме продакшн

1. Склонировать репозиторий
```shell
git clone <url репозитория>
```
2. Скопировать файл .env.example и переименовать в .env
В файле .env изменить переменную DEBUG на False
И изменить переменную ALLOWED_HOSTS на адрес вашего сервера
Изменить переменную COMPOSE_FILE на prod.yml

3. Запустить docker-compose
```shell
docker-compose up -d
```

# Создание суперпользователя

1. Используется команда
```shell
python website/manage.py createsuperuser
```
Или если вы запускаете проект в docker-compose, то
```shell
docker-compose exec django python manage.py createsuperuser
```

# Структура проекта

* website - папка с проектом Django (бэкенд)
* frontend - папка с проектом React (фронтенд)
* printer - папка с проектом Node.js (принтер)

# Ссылка на админку

http://localhost:8000/admin

# Ссылка на API

http://localhost:8000/api/

