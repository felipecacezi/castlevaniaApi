import supertest from 'supertest'
import app from '../src/app'

test('POST-SUCCESS /gameTitle', async () => {
    
    await supertest(app)
        .post('/gameTitle')
        .send({
            title: `Castlevania: Symphony of the Night`,
            console: `Playstation 1, Sega Saturn`,
            release_date: '1997-03-20 00:00:00',
            cover_link: `https://static.wikia.nocookie.net/castlevania/images/b/b0/Castlevania_-_Symphony_of_the_Night_%28gamebox%29.jpg/revision/latest?cb=20150822135929`,
        })
        .set('Accept', 'application/json/')
        .expect('Content-Type', /json/)
        .expect(201);

});

test('GET-SUCCESS /gameTitle', async () => {

    const jsonExpected = [{
        id: 1,
        title: 'Castlevania: Symphony of the Night',
        console: 'Playstation 1, Sega Saturn',
        release_date: '1997-03-20T03:00:00.000Z',
        cover_link: 'https://static.wikia.nocookie.net/castlevania/images/b/b0/Castlevania_-_Symphony_of_the_Night_%28gamebox%29.jpg/revision/latest?cb=20150822135929'
    }];
    
    await supertest(app)
        .get('/gameTitle')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(JSON.stringify(jsonExpected));

});

test('GET-SUCCESS /gameTitle?id=1', async () => {

    const jsonExpected = {
        id: 1,
        title: 'Castlevania: Symphony of the Night',
        console: 'Playstation 1, Sega Saturn',
        release_date: '1997-03-20T03:00:00.000Z',
        cover_link: 'https://static.wikia.nocookie.net/castlevania/images/b/b0/Castlevania_-_Symphony_of_the_Night_%28gamebox%29.jpg/revision/latest?cb=20150822135929'
    };

    await supertest(app)
        .post('/gameTitle')
        .send({
            title: `Castlevania III: Dracula's curse`,
            console: `NES`,
            release_date: '1989-12-22 00:00:00',
            cover_link: `https://static.wikia.nocookie.net/castlevania/images/6/67/Castlevania_III_-_Dracula%27s_Curse_-_%28NA%29_-_01.jpg/revision/latest?cb=20230623115738`,
        })
        .set('Accept', 'application/json/')
        .expect('Content-Type', /json/)
        .expect(201);
    
    await supertest(app)
        .get('/gameTitle?id=1')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(JSON.stringify(jsonExpected));

});

test('UPDATE-SUCCESS /gameTitle', async () => {

    const jsonUpdate = {
        "id":2,
        "title":"Castlevania",
        "console":"NES","release_date":"1986-09-26T00:00:00.000Z",
        "cover_link":"https://static.wikia.nocookie.net/castlevania/images/b/bb/Castlevania_-_%28NA%29_-_01.jpg/revision/latest?cb=20141221134244"
    };
    
    await supertest(app)
        .put('/gameTitle')
        .send(jsonUpdate)
        .expect('Content-Type', /json/)
        .expect(200);

    await supertest(app)
        .get('/gameTitle?id=2')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(JSON.stringify(jsonUpdate));

});

test('DELETE-SUCCESS /gameTitle', async () => {
    
    await supertest(app)
        .delete('/gameTitle')
        .send({
            id: 1,
        })
        .expect('Content-Type', /json/)
        .expect(200);

    await supertest(app)
        .delete('/gameTitle')
        .send({
            id: 2,
        })
        .expect('Content-Type', /json/)
        .expect(200);

});

test('POST-ERROR /gameTitle', async () => {
    
    await supertest(app)
        .post('/gameTitle')
        .send({
            title: ``,
            console: `Playstation 1, Sega Saturn`,
            release_date: '1997-03-20 00:00:00',
            cover_link: `https://static.wikia.nocookie.net/castlevania/images/b/b0/Castlevania_-_Symphony_of_the_Night_%28gamebox%29.jpg/revision/latest?cb=20150822135929`,
        })
        .set('Accept', 'application/json/')
        .expect('Content-Type', /json/)
        .expect(400);

    await supertest(app)
        .post('/gameTitle')
        .send({
            title: `Castlevania: Symphony of the Night`,
            console: ``,
            release_date: '1997-03-20 00:00:00',
            cover_link: `https://static.wikia.nocookie.net/castlevania/images/b/b0/Castlevania_-_Symphony_of_the_Night_%28gamebox%29.jpg/revision/latest?cb=20150822135929`,
        })
        .set('Accept', 'application/json/')
        .expect('Content-Type', /json/)
        .expect(400);

    await supertest(app)
        .post('/gameTitle')
        .send({
            title: `Castlevania: Symphony of the Night`,
            console: `Playstation 1, Sega Saturn`,
            release_date: '',
            cover_link: `https://static.wikia.nocookie.net/castlevania/images/b/b0/Castlevania_-_Symphony_of_the_Night_%28gamebox%29.jpg/revision/latest?cb=20150822135929`,
        })
        .set('Accept', 'application/json/')
        .expect('Content-Type', /json/)
        .expect(400);

    await supertest(app)
        .post('/gameTitle')
        .send({
            title: `Castlevania: Symphony of the Night`,
            console: `Playstation 1, Sega Saturn`,
            release_date: '1997-03-20 00:00:00',
            cover_link: ``,
        })
        .set('Accept', 'application/json/')
        .expect('Content-Type', /json/)
        .expect(400);

});

test('UPDATE-ERROR /gameTitle', async () => {

    await supertest(app)
        .put('/gameTitle')
        .send({
            "id": null,
            "title":"Castlevania",
            "console":"NES","release_date":"1986-09-26T00:00:00.000Z",
            "cover_link":"https://static.wikia.nocookie.net/castlevania/images/b/bb/Castlevania_-_%28NA%29_-_01.jpg/revision/latest?cb=20141221134244"
        })
        .expect('Content-Type', /json/)
        .expect(400);

    await supertest(app)
        .put('/gameTitle')
        .send({
            "id":2,
            "title":"",
            "console":"NES","release_date":"1986-09-26T00:00:00.000Z",
            "cover_link":"https://static.wikia.nocookie.net/castlevania/images/b/bb/Castlevania_-_%28NA%29_-_01.jpg/revision/latest?cb=20141221134244"
        })
        .expect('Content-Type', /json/)
        .expect(400);

    await supertest(app)
        .put('/gameTitle')
        .send({
            "id":2,
            "title":"Castlevania",
            "console":"",
            "cover_link":"https://static.wikia.nocookie.net/castlevania/images/b/bb/Castlevania_-_%28NA%29_-_01.jpg/revision/latest?cb=20141221134244"
        })
        .expect('Content-Type', /json/)
        .expect(400);

    await supertest(app)
        .put('/gameTitle')
        .send({
            "id":2,
            "title":"Castlevania",
            "console":"NES","release_date":"1986-09-26T00:00:00.000Z",
            "cover_link":""
        })
        .expect('Content-Type', /json/)
        .expect(400);

});

test('GET-EMPTY /gameTitle', async () => {

    const jsonExpected: [] = [];
    
    await supertest(app)
        .get('/gameTitle')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(JSON.stringify(jsonExpected));

});

test('GET-EMPTY /gameTitle?id=1', async () => {

    const jsonExpected = {};
    
    await supertest(app)
        .get('/gameTitle?id=1')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(JSON.stringify(jsonExpected));

});

test('DELETE-ERROR /gameTitle', async () => {
    
    await supertest(app)
        .delete('/gameTitle')
        .send({
            id: null,
        })
        .expect('Content-Type', /json/)
        .expect(400);


    await supertest(app)
        .delete('/gameTitle')
        .send({
            id: 3,
        })
        .expect('Content-Type', /json/)
        .expect(400);

});