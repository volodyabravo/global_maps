FROM python:3.8-slim as base

WORKDIR /app

# Install dependencies
RUN apt-get update
RUN apt-get install gcc -y
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
COPY requirements.txt .
RUN pip install -r requirements.txt

# Production
FROM python:3.8-slim

WORKDIR /app
#  Install locale gen tools and mysql client libs
RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y locales  && \
    sed -i -e 's/# ru_RU.UTF-8 UTF-8/ru_RU.UTF-8 UTF-8/' /etc/locale.gen && \
    dpkg-reconfigure --frontend=noninteractive locales && \
    rm -rf /var/lib/apt/lists/*

# Make sure we use the virtualenv:
ENV PATH="/opt/venv/bin:$PATH"

ENV LC_ALL="ru_RU.UTF-8"
ENV LC_CTYPE="ru_RU.UTF-8"

COPY --from=base /opt/venv /opt/venv
COPY website/ .

EXPOSE 8000

COPY start.sh .
RUN chmod +x start.sh
CMD [ "./start.sh" ]
