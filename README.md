# Install a pyenv/virtualenv
pyenv virtualenv 2.7.9 venv_threadloom
pyenv activate venv_threadloom

# create database called `threadloom` and add the DATABASES settings in settings.py

If on Ubuntu:
sudo apt-get install libmysqlclient-dev
sudo apt-get install python-mysqldb

# install dependencies, upgrade pip if needed
pip install --upgrade pip
pip install -r requirements.txt

# run migrations
pm migrate --settings=threadloom.settings


# React.js stuff

## get npm

## from the main project didrecotry, `npm install`



#TODO

## 1. change URLs to be more restful
## 2. topic -> thread -> post