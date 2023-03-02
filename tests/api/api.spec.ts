import { test, expect } from "@playwright/test";

test.describe.parallel('API Testing', () => {
  const baseUrl = 'https://reqres.in/api';

  test('GET single valid user - assert response status', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/2`);
    expect(response.status()).toBe(200)
  })

  test('GET invalis user', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/invalid`);
    expect(response.status()).toBe(404)
  })

  test('GET single valid user - assert response text', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/1`);
    expect(response.status()).toBe(200);

    const responseBody = JSON.parse(await response.text());
    expect(responseBody.data.id).toBe(1);
    expect(responseBody.data.first_name).toBe('George');
    expect(responseBody.data.last_name).toBe('Bluth');
    expect(responseBody.data.email).not.toBeNull;
  })

  test('POST create user - assert response status and text', async ({ request }) => {
    const response = await request.post(`${baseUrl}/users`, {
      data: {
        name: 'churrumino',
        age: 354,
      },
    });
    expect(response.status()).toBe(201);

    const responseBody = JSON.parse(await response.text());
    expect(responseBody.name).toBe('churrumino');
    expect(responseBody.age).toBe(354);
    expect(responseBody.id).not.toBeNull;
    expect(responseBody.createdAt).not.toBeNull;
  })

  test('POST successful login - assert response status and text', async ({ request }) => {
    const response = await request.post(`${baseUrl}/login`, {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    });
    expect(response.status()).toBe(200);

    const responseBody = JSON.parse(await response.text());
    expect(responseBody.token).not.toBeNull;
  })

  test('POST unsuccessful login - assert response status and text', async ({ request }) => {
    const response = await request.post(`${baseUrl}/login`, {
      data: {
        email: 'peter@klaven',
      },
    });
    expect(response.status()).toBe(400);

    const responseBody = JSON.parse(await response.text());
    expect(responseBody.error).toBe('Missing password');
  })

  test('PUT - update user', async ({ request }) => {
    const response = await request.put(`${baseUrl}/users/2`, {
      data: {
        name: 'new name',
        job: 'new job'
      },
    });
    expect(response.status()).toBe(200);

    const responseBody = JSON.parse(await response.text());
    expect(responseBody.name).toBe('new name');
    expect(responseBody.job).toBe('new job');
    expect(responseBody.updatedAt).toBeTruthy();
  })

  test('DELETE - delete user', async ({ request }) => {
    const response = await request.delete(`${baseUrl}/users/2`);
    expect(response.status()).toBe(204);
  })
})