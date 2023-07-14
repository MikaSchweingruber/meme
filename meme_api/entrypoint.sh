#!/bin/sh
IFS=$'\n\t'

TARGET="${1:-server}"
if [ "${TARGET}" = "worker" ]; then
    python3 manage.py run_huey
elif [ "${TARGET}" = "server" ]; then
    python3 manage.py makemigrations;
    python3 manage.py migrate;
    uwsgi --ini uwsgi.ini
else
    echo "Unknown target: ${TARGET} (expected one of: server, worker)" >&2
    exit 1
fi
python3 manage.py makemigrations;
python3 manage.py migrate;
python3 manage.py runserver 0.0.0.0:8000;