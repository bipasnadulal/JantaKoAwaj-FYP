FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && apt-get install -y build-essential libpq-dev && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# manage.py is inside janta_ko_awaj/
RUN python janta_ko_awaj/manage.py collectstatic --noinput

EXPOSE 8000

# Point gunicorn to the correct wsgi module
CMD ["gunicorn", "janta_ko_awaj.wsgi:application", "--bind", "0.0.0.0:8000", "--chdir", "janta_ko_awaj"]