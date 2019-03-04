# [ PROJECT NAME ]

[ DESCRIPTION OF YOUR PROJECT]

## Created By:

**Name**: [ YOUR NAME]

**Email**: [ YOUR EMAIL]

**Slack Username**: [ YOUR USERNAME]

## Setting up the app

1. `npm install` to setup the root project
1. Change into each of the sub-directories and install the node modules

## Running app

- `npm run dev` - Starts API and Web Servers
- `npm run dev:react` - Starts API and React Servers
- `npm run web` - Starts Web server
- `npm run api` - Starts Api server
- `npm run react` - Starts React server

## Models

**Quizzes:**

- id
- name
- type (public, private)
- userId

**Questions:**

- title
- quizId

**Choices:**

- value
- type (correct, incorrect)
- questionId

## API Routes

|     Method | Path               | Description                           |
| ---------: | ------------------ | ------------------------------------- |
|            | **PUBLIC**         |                                       |
|    **GET** | /quizzes/public    | List all the quizzes that are public  |
|            | **Quizzes**        |                                       |
|    **GET** | /quizzes           | List all the quizzes the user created |
|   **POST** | /quizzes           | Create a new quiz                     |
|    **GET** | /quizzes/:id       | The details of one quiz               |
|    **PUT** | /quizzes/:id       | Edit a quiz                           |
| **DELETE** | /quizzes/:id       | Remove a quiz                         |
|            | **Questions**      |                                       |
|    **GET** | /questions?quizId= | Get all the questions for a quiz      |
|   **POST** | /questions         | Create a new question                 |
|    **GET** | /questions/:id     | Get one question                      |
|    **PUT** | /questions/:id     | Update an question                    |
| **DELETE** | /questions/:id     | Delete an question                    |
|            | **Choices**        |                                       |
|    **GET** | /choices?question= | Get all the choices for a question    |
|   **POST** | /choices           | Create a new choice                   |
|    **GET** | /choices/:id       | Get one choice                        |
|    **PUT** | /choices/:id       | Update an choice                      |
| **DELETE** | /choices/:id       | Delete an choice                      |

## Web Routes

|   Method | Path                           | Description                                                            |
| -------: | ------------------------------ | ---------------------------------------------------------------------- |
|          | **Public**                     |                                                                        |
|  **GET** | /                              | Landing Page, list of public quizzes                                   |
|  **GET** | /quiz/?id=                     | List of all the questions & choices with the ability to select answers |
| **POST** | /quiz?id=                      | Shows results of the quiz                                              |
|          | **Quizzes**                    |                                                                        |
|  **GET** | /admin/quizzes/list            | List all the previously created quizzes                                |
|  **GET** | /admin/quizzes?id              | Detail page of quiz                                                    |
|  **GET** | /admin/quizzes/delete?id=      | Remove a quiz                                                          |
|  **GET** | /admin/quizzes/edit?id=        | Edit quiz form                                                         |
| **POST** | /admin/quizzes/edit?id=        | Save changes to a quiz                                                 |
|  **GET** | /admin/quizzes/new             | Create a quiz form                                                     |
| **POST** | /admin/quizzes/new             | Save a new quiz                                                        |
|          | **Question**                   |                                                                        |
|  **GET** | /admin/questions/delete?id=    | Remove a question                                                      |
|  **GET** | /admin/questions/edit?id=      | Edit question form                                                     |
| **POST** | /admin/questions/edit?id=      | Save changes to a question                                             |
|  **GET** | /admin/questions/new?quizId=   | Create a question form                                                 |
| **POST** | /admin/questions/new?quizId=   | Save a new question                                                    |
|          | **Choices**                    |                                                                        |
|  **GET** | /admin/choices/delete?id=      | Delete an choice                                                       |
|  **GET** | /admin/choices/edit?id=        | Edit choice form                                                       |
| **POST** | /admin/choices/edit?id=        | Save changes to a choice                                               |
|  **GET** | /admin/choices/new?questionId= | Create a choice form                                                   |
| **POST** | /admin/choices/new?questionId= | Save a new choice                                                      |

## React Routes

|  Method | Path                           | Description                                                            |
| ------: | ------------------------------ | ---------------------------------------------------------------------- |
| **GET** | /                              | Landing Page, list of public quizzes                                   |
| **GET** | /quiz/:id                      | List of all the questions & choices with the ability to select answers |
| **GET** | /admin/quizzes                 | List all the previously created quizzes                                |
| **GET** | /admin/quizzes/edit/:id        | Edit quiz form                                                         |
| **GET** | /admin/quizzes/new             | Create a quiz form                                                     |
| **GET** | /admin/questions/edit/:id      | Edit question form                                                     |
| **GET** | /admin/questions/new/:quizId   | Create a question form                                                 |
| **GET** | /admin/choices/edit/:id        | Edit choice form                                                       |
| **GET** | /admin/choices/new/:questionId | Create a choice form                                                   |
