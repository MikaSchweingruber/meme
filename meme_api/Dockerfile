FROM python:3.10-alpine
# ENV PYTHONUNBUFFERED 1
USER root
RUN adduser --disabled-password -g meme meme && \
    mkdir -p /home/meme && \
    chown meme:0 /home/meme && \
    chmod g=u /home/meme && \
    chmod g=u /etc/passwd
WORKDIR /home/meme
RUN apk add --no-cache libffi pcre postgresql13 libpq  && \
  apk add --no-cache --virtual .build-deps build-base gcc musl-dev python3-dev libffi-dev openssl-dev cargo linux-headers pcre-dev postgresql13-dev && \
  pip install keyrings.google-artifactregistry-auth uwsgi && \
  apk del --no-cache .build-deps 
COPY requirements.txt /home/meme/
RUN pip config set global.extra-index-url  https://st-nexus.sz.coop.ch/repository/python-prod/simple/ && \
  apk add --no-cache --virtual .build-deps build-base gcc musl-dev python3-dev postgresql13-dev libffi-dev && \
  apk add --no-cache libldap valgrind openldap-dev openldap &&\
  echo -n "INPUT ( libldap.so )" > /usr/lib/libldap_r.so &&\
  pip install pyparsing && \
  pip install -r requirements.txt && \
  apk del --no-cache .build-deps  && \
  rm /usr/local/lib/python3.10/site-packages/certifi/cacert.pem && \
  ln -s /etc/ssl/certs/ca-certificates.crt /usr/local/lib/python3.10/site-packages/certifi/cacert.pem
# RUN apt install -y build-essential \
#     python3-dev \
#     python2.7-dev \
#     libldap2-dev \
#     libsasl2-dev \
#     ldap-utils \
#     tox \
#     lcov \
#     valgrind &&\
#     python3 -m pip install -r requirements.txt
COPY . /home/meme/
RUN chmod +x /home/meme/entrypoint.sh
USER meme
ENTRYPOINT ["/home/meme/entrypoint.sh"]