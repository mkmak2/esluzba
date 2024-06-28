test('Check connection to server API', async () => {
    const data = await fetch(`${process.env.REACT_APP_API_KEY}/api/person`)
    expect(data.status).toBe(200)
})