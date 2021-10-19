#!/bin/bash
# Replace with gunicorn?
set -o errexit
set -o pipefail
set -o nounset


python /app/manage.py collectstatic --noinput

# Apply database migrations
echo "Apply database migrations TODO: Remove in production"
python /app/manage.py migrate

python manage.py runserver 0.0.0.0:8000
