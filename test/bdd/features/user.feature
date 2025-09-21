Feature: User API

  Scenario: Create user should return NotImplemented
    When I send a POST request to create a user with body:
      """
      { "username": "marcelo" }
      """
    Then the response status should be 501

  Scenario: Get user should return NotImplemented
    When I send a GET request to fetch user with username "marcelo"
    Then the response status should be 501
