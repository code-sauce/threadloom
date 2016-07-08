## Install a pyenv/virtualenv
```pyenv virtualenv 2.7.9 venv_threadloom```
```pyenv activate venv_threadloom```

## create database called `threadloom` and add the DATABASES settings in settings.py

If on Ubuntu:
```sudo apt-get install libmysqlclient-dev```
```sudo apt-get install python-mysqldb```

## install dependencies, upgrade pip if needed
```pip install --upgrade pip```
```pip install -r requirements.txt```

## run migrations
pm migrate --settings=threadloom.settings


## React.js stuff
From the main project directory:
1. Install node
2. `npm install`
3. `gulp`

# Seed Data
Some seed data is provided for initial use

you need to run ```python manage.py loaddata --app forum --settings=threadloom.settings fixture seed.json``` from the project directory

## Functionality:

###UI
You can browse topics, threads, posts and replies. However you can only add posts and replies for now for lack of time.
The nested structure logic remains the same. The screenshots will be provided

YOu basically click on topics > threads to browse stuff

###Models and back-end
Django models and DRF (Django Rest Framework) was used to build the models.
Ability to Follow another user is
```/follow/?following=sjain@shoprunner.xom&follower=getsaurabhjain@gmail.com```


###Analytics
/report/?report_date=2016-07-07
currently shows data per day

the web page is at `/forum`


##Backlog
1. dd ability to add topics and thread
2. user login/credential system
3. Moar tests!! React.js makes UI testing very tractable.
4. More UI stuff - can definitely make this prettier.
5. More RESTful API.



