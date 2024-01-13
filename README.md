# Volocopter Mission Control
Full stack flight mission control app with a Django/Django REST Framework backend and a React front end. 
# Install

### Frontend
```bash
cd client
npm install
npm run start
```
### Backend
For backend package management `poetry` was used but you can use `pip` to run as well. Python version used was Python 3.11.4.

```bash
cd server
pip -r install requirements.txt
python manage.py migrate
python manage.py runserver
```
Alternatively using poetry:
```bash
poetry install
poetry shell
python manage.py migrate
python manage.py runserver
```

# Standards
For the Python code the linting tool Flake8 has been utilized as well as Black for styling to comply with PEP-8 standards. The backend code is PEP-8 compliant [except E-501](https://www.flake8rules.com/rules/E501.html) that was overwritten with a higher character limit than 70 per line. (due to aestethic preference).
# Testing
Both the front and back end tests have been realized with all of the CRUD functionalities covered.
You can run the front end tests with 
### `npm test`
For the backend, use
### `python manage.py test`
# Next steps to improve the project
Given enough time to work on the project, the next steps to improve overall quality and ensure best standards are:
- Dockerize and set up CI/CD to run tests, build& deploy the app
- Set up coverage to get front and backend tests coverage
- Add edge case tests 
- Add full e2e testing with cypress or an equivalent tool. (Currently for the frontend tests, the backend functions are mocked.)
