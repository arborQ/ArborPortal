FROM python:3

# ADD ./src/server.py /src
# ADD ./requirements-dev.txt /

WORKDIR /mnt

COPY . .

RUN pip install -r requirements-dev.txt --user --upgrade --no-warn-script-location

CMD [ "python", "./src/server.py" ]
