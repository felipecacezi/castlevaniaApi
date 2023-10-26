import supertest from 'supertest'
import app from '../src/app'
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

test('POST /characters', async () => {

    const clanJson = {
        name: "Cronqvist/Tepes",
        clan_summary: `O clã de alquimistas que acabaria trazendo ao mundo o poder dos dark lords ainda existe. Fora seu talento para o mal e a alquimia não se sabe muito deles.
            Oficialmente são inimigos jurados dos Belmont
            Adrian Tepes já se provou aliado confiável dos Belmonts e há teorias que Trevor Belmont seja filho dele. Não há provas disso, mas não é de todo o impossível. Se isso for verdade todos os Belmonts desde Sonia teriam o sangue de Drácula correndo nas veias.`
    }

    const gameTitleJson = [
        {
            title: `Castlevania: Symphony of the Night`,
            console: `Playstation 1, Sega Saturn`,
            release_date: '1997-03-20 00:00:00',
            cover_link: `https://static.wikia.nocookie.net/castlevania/images/b/b0/Castlevania_-_Symphony_of_the_Night_%28gamebox%29.jpg/revision/latest?cb=20150822135929`,
        },
        {
            title: `Castlevania III: Dracula's curse`,
            console: `NES`,
            release_date: '1989-12-22 00:00:00',
            cover_link: `https://static.wikia.nocookie.net/castlevania/images/6/67/Castlevania_III_-_Dracula%27s_Curse_-_%28NA%29_-_01.jpg/revision/latest?cb=20230623115738`,
        }
    ]

    await supertest(app)
        .post('/clan')
        .send(clanJson)
        .set('Accept', 'application/json/')
        .expect('Content-Type', /json/)
        .expect(201);
    
    for (const gameTitleKey in gameTitleJson) {
        await supertest(app)
            .post('/gameTitle')
            .send(gameTitleJson[gameTitleKey])
            .set('Accept', 'application/json/')
            .expect('Content-Type', /json/)
            .expect(201);
    }
    
    await supertest(app)
        .post('/character')
        .send({
            game_title_id: 1,
            clan_id: 1,
            name: 'Alucard',
            history: `Após a morte de sua mãe, que fora confundida por uma bruxa, o menino Adrian passou a ser ensinado por seu pai as artes da magia negra, com a intenção de um dia vir a se tornar um poderoso soldado ao lado de Drácula. No entanto, seu lado humano falava mais alto e ele questionava os métodos de seu pai. Aguentando até quando pôde, Adrian um dia se rebela e foge de Drácula. Disposto a defender os humanos dos exércitos do vampiro, ele assume a alcunha de Alucard, que é o nome Drácula espelhado, para representar que ele defende valores inversos aos de seu pai. Desde então, seu principal objetivo é destruir seu pai e Castlevania, o castelo dele.`,
            character_summary: `Alucard, ou Adrian Fahrenheit Tepes, é o filho de Drácula com uma mulher humana chamada Lisa. Por ser filho do vampiro, Alucard possui força sobre-humana e pode se transformar em um morcego, mas seu lado humano o impede de ser tão forte quanto seu pai`,
        })
        .set('Accept', 'application/json/')
        .expect('Content-Type', /json/)
        .expect(201);

});

test('GET-SUCCESS /character', async () => {

    const jsonExpected = [{
        id:1,
        game_title_id:1,
        clan_id:1,
        name:"Alucard",
        history: `Após a morte de sua mãe, que fora confundida por uma bruxa, o menino Adrian passou a ser ensinado por seu pai as artes da magia negra, com a intenção de um dia vir a se tornar um poderoso soldado ao lado de Drácula. No entanto, seu lado humano falava mais alto e ele questionava os métodos de seu pai. Aguentando até quando pôde, Adrian um dia se rebela e foge de Drácula. Disposto a defender os humanos dos exércitos do vampiro, ele assume a alcunha de Alucard, que é o nome Drácula espelhado, para representar que ele defende valores inversos aos de seu pai. Desde então, seu principal objetivo é destruir seu pai e Castlevania, o castelo dele.`,
        character_summary: `Alucard, ou Adrian Fahrenheit Tepes, é o filho de Drácula com uma mulher humana chamada Lisa. Por ser filho do vampiro, Alucard possui força sobre-humana e pode se transformar em um morcego, mas seu lado humano o impede de ser tão forte quanto seu pai`,
    }];
    
    await supertest(app)
        .get('/character')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(JSON.stringify(jsonExpected));

});

test('GET-SUCCESS /character?id=2', async () => {

    const jsonExpected = {
        id: 2,
        game_title_id: 2,
        clan_id: 1,
        name: 'Dracula',
        history: `Dracula rose to become the strongest of vampire-kind and the leader of his race. He had a dislike of humanity, and a reputation for sheer brutality. He was known to impale his victims and slaughter entire villages should they wrong him.By the late medieval period of Europe in Wallachia, Dracula had lived alone in a castle, which could be magically teleported. He had also come to possess a vast wealth of scientific knowledge, which was stored away within the depths of the castle.`,
        character_summary: `Dracula rose to become the strongest of vampire-kind and the leader of his race. He had a dislike of humanity, and a reputation for sheer brutality. He was known to impale his victims and slaughter entire villages should they wrong him.`,
    };

    await supertest(app)
        .post('/character')
        .send({
            game_title_id: 2,
            clan_id: 1,
            name: 'Dracula',
            history: `Dracula rose to become the strongest of vampire-kind and the leader of his race. He had a dislike of humanity, and a reputation for sheer brutality. He was known to impale his victims and slaughter entire villages should they wrong him.By the late medieval period of Europe in Wallachia, Dracula had lived alone in a castle, which could be magically teleported. He had also come to possess a vast wealth of scientific knowledge, which was stored away within the depths of the castle.`,
            character_summary: `Dracula rose to become the strongest of vampire-kind and the leader of his race. He had a dislike of humanity, and a reputation for sheer brutality. He was known to impale his victims and slaughter entire villages should they wrong him.`,
        })
        .set('Accept', 'application/json/')
        .expect('Content-Type', /json/)
        .expect(201);
    
    await supertest(app)
        .get('/character?id=2')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(JSON.stringify(jsonExpected));

});

test('UPDATE-SUCCESS /character', async () => {

    const jsonUpdate = {
        id: 2,
        game_title_id: 2,
        clan_id: 1,
        name: 'Lisa Tepes',
        history: `In 1455, Lisa sought out Dracula in his castle. Others told her that the man who lived there held secret knowledge of science beyond that of mortals. After exhausting all of her other resources, she sought Dracula to learn from him. In so doing, she showed him some worthiness in mankind. He was greatly influenced by her, opting to travel the world as an ordinary man to learn more about humanity.`,
        character_summary: `In 1455, Lisa sought out Dracula in his castle. Others told her that the man who lived there held secret knowledge of science beyond that of mortals. After exhausting all of her other resources, she sought Dracula to learn from him. In so doing, she showed him some worthiness in mankind. He was greatly influenced by her, opting to travel the world as an ordinary man to learn more about humanity.`,
    };
    
    await supertest(app)
        .put('/character')
        .send(jsonUpdate)
        .expect('Content-Type', /json/)
        .expect(200);

    await supertest(app)
        .get('/character?id=2')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(JSON.stringify(jsonUpdate));

});

test('DELETE-SUCCESS /character', async () => {
    
    await supertest(app)
        .delete('/character')
        .send({
            id: 1,
        })
        .expect('Content-Type', /json/)
        .expect(200);

    await supertest(app)
        .delete('/character')
        .send({
            id: 2,
        })
        .expect('Content-Type', /json/)
        .expect(200);

});


test('POST-ERROR /characters', async () => {
    
    await supertest(app)
        .post('/character')
        .send({
            game_title_id: '',
            clan_id: 1,
            name: 'Alucard',
            history: `Após a morte de sua mãe, que fora confundida por uma bruxa, o menino Adrian passou a ser ensinado por seu pai as artes da magia negra, com a intenção de um dia vir a se tornar um poderoso soldado ao lado de Drácula. No entanto, seu lado humano falava mais alto e ele questionava os métodos de seu pai. Aguentando até quando pôde, Adrian um dia se rebela e foge de Drácula. Disposto a defender os humanos dos exércitos do vampiro, ele assume a alcunha de Alucard, que é o nome Drácula espelhado, para representar que ele defende valores inversos aos de seu pai. Desde então, seu principal objetivo é destruir seu pai e Castlevania, o castelo dele.`,
            character_summary: `Alucard, ou Adrian Fahrenheit Tepes, é o filho de Drácula com uma mulher humana chamada Lisa. Por ser filho do vampiro, Alucard possui força sobre-humana e pode se transformar em um morcego, mas seu lado humano o impede de ser tão forte quanto seu pai`,
        })
        .set('Accept', 'application/json/')
        .expect('Content-Type', /json/)
        .expect(400);

    await supertest(app)
        .post('/character')
        .send({
            game_title_id: 1,
            clan_id: '',
            name: 'Alucard',
            history: `Após a morte de sua mãe, que fora confundida por uma bruxa, o menino Adrian passou a ser ensinado por seu pai as artes da magia negra, com a intenção de um dia vir a se tornar um poderoso soldado ao lado de Drácula. No entanto, seu lado humano falava mais alto e ele questionava os métodos de seu pai. Aguentando até quando pôde, Adrian um dia se rebela e foge de Drácula. Disposto a defender os humanos dos exércitos do vampiro, ele assume a alcunha de Alucard, que é o nome Drácula espelhado, para representar que ele defende valores inversos aos de seu pai. Desde então, seu principal objetivo é destruir seu pai e Castlevania, o castelo dele.`,
            character_summary: `Alucard, ou Adrian Fahrenheit Tepes, é o filho de Drácula com uma mulher humana chamada Lisa. Por ser filho do vampiro, Alucard possui força sobre-humana e pode se transformar em um morcego, mas seu lado humano o impede de ser tão forte quanto seu pai`,
        })
        .set('Accept', 'application/json/')
        .expect('Content-Type', /json/)
        .expect(400);

    await supertest(app)
        .post('/character')
        .send({
            game_title_id: 1,
            clan_id: 1,
            name: '',
            history: `Após a morte de sua mãe, que fora confundida por uma bruxa, o menino Adrian passou a ser ensinado por seu pai as artes da magia negra, com a intenção de um dia vir a se tornar um poderoso soldado ao lado de Drácula. No entanto, seu lado humano falava mais alto e ele questionava os métodos de seu pai. Aguentando até quando pôde, Adrian um dia se rebela e foge de Drácula. Disposto a defender os humanos dos exércitos do vampiro, ele assume a alcunha de Alucard, que é o nome Drácula espelhado, para representar que ele defende valores inversos aos de seu pai. Desde então, seu principal objetivo é destruir seu pai e Castlevania, o castelo dele.`,
            character_summary: `Alucard, ou Adrian Fahrenheit Tepes, é o filho de Drácula com uma mulher humana chamada Lisa. Por ser filho do vampiro, Alucard possui força sobre-humana e pode se transformar em um morcego, mas seu lado humano o impede de ser tão forte quanto seu pai`,
        })
        .set('Accept', 'application/json/')
        .expect('Content-Type', /json/)
        .expect(400);

    await supertest(app)
        .post('/character')
        .send({
            game_title_id: 1,
            clan_id: 1,
            name: 'Alucard',
            history: ``,
            character_summary: `Alucard, ou Adrian Fahrenheit Tepes, é o filho de Drácula com uma mulher humana chamada Lisa. Por ser filho do vampiro, Alucard possui força sobre-humana e pode se transformar em um morcego, mas seu lado humano o impede de ser tão forte quanto seu pai`,
        })
        .set('Accept', 'application/json/')
        .expect('Content-Type', /json/)
        .expect(400);

    await supertest(app)
        .post('/character')
        .send({
            game_title_id: 1,
            clan_id: 1,
            name: 'Alucard',
            history: `Após a morte de sua mãe, que fora confundida por uma bruxa, o menino Adrian passou a ser ensinado por seu pai as artes da magia negra, com a intenção de um dia vir a se tornar um poderoso soldado ao lado de Drácula. No entanto, seu lado humano falava mais alto e ele questionava os métodos de seu pai. Aguentando até quando pôde, Adrian um dia se rebela e foge de Drácula. Disposto a defender os humanos dos exércitos do vampiro, ele assume a alcunha de Alucard, que é o nome Drácula espelhado, para representar que ele defende valores inversos aos de seu pai. Desde então, seu principal objetivo é destruir seu pai e Castlevania, o castelo dele.`,
            character_summary: ``,
        })
        .set('Accept', 'application/json/')
        .expect('Content-Type', /json/)
        .expect(400);

});

test('GET-EMPTY /character', async () => {

    const jsonExpected:[] = [];
    
    await supertest(app)
        .get('/character')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(jsonExpected);

});

test('GET-EMPTY /character?id=1', async () => {

    const jsonExpected:[] = [];
    
    await supertest(app)
        .get('/character?id=1')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(jsonExpected);

});

test('UPDATE-ERROR /character', async () => {
    
    await supertest(app)
        .put('/character')
        .send({
            id: '',
            game_title_id: 2,
            clan_id: 1,
            name: 'Lisa Tepes',
            history: `In 1455, Lisa sought out Dracula in his castle. Others told her that the man who lived there held secret knowledge of science beyond that of mortals. After exhausting all of her other resources, she sought Dracula to learn from him. In so doing, she showed him some worthiness in mankind. He was greatly influenced by her, opting to travel the world as an ordinary man to learn more about humanity.`,
            character_summary: `In 1455, Lisa sought out Dracula in his castle. Others told her that the man who lived there held secret knowledge of science beyond that of mortals. After exhausting all of her other resources, she sought Dracula to learn from him. In so doing, she showed him some worthiness in mankind. He was greatly influenced by her, opting to travel the world as an ordinary man to learn more about humanity.`,
        })
        .expect('Content-Type', /json/)
        .expect(400);

    await supertest(app)
        .put('/character')
        .send({
            id: 2,
            game_title_id: '',
            clan_id: 1,
            name: 'Lisa Tepes',
            history: `In 1455, Lisa sought out Dracula in his castle. Others told her that the man who lived there held secret knowledge of science beyond that of mortals. After exhausting all of her other resources, she sought Dracula to learn from him. In so doing, she showed him some worthiness in mankind. He was greatly influenced by her, opting to travel the world as an ordinary man to learn more about humanity.`,
            character_summary: `In 1455, Lisa sought out Dracula in his castle. Others told her that the man who lived there held secret knowledge of science beyond that of mortals. After exhausting all of her other resources, she sought Dracula to learn from him. In so doing, she showed him some worthiness in mankind. He was greatly influenced by her, opting to travel the world as an ordinary man to learn more about humanity.`,
        })
        .expect('Content-Type', /json/)
        .expect(400);

    await supertest(app)
        .put('/character')
        .send({
            id: 2,
            game_title_id: 2,
            clan_id: '',
            name: 'Lisa Tepes',
            history: `In 1455, Lisa sought out Dracula in his castle. Others told her that the man who lived there held secret knowledge of science beyond that of mortals. After exhausting all of her other resources, she sought Dracula to learn from him. In so doing, she showed him some worthiness in mankind. He was greatly influenced by her, opting to travel the world as an ordinary man to learn more about humanity.`,
            character_summary: `In 1455, Lisa sought out Dracula in his castle. Others told her that the man who lived there held secret knowledge of science beyond that of mortals. After exhausting all of her other resources, she sought Dracula to learn from him. In so doing, she showed him some worthiness in mankind. He was greatly influenced by her, opting to travel the world as an ordinary man to learn more about humanity.`,
        })
        .expect('Content-Type', /json/)
        .expect(400);

    await supertest(app)
        .put('/character')
        .send({
            id: 2,
            game_title_id: 2,
            clan_id: 1,
            name: '',
            history: `In 1455, Lisa sought out Dracula in his castle. Others told her that the man who lived there held secret knowledge of science beyond that of mortals. After exhausting all of her other resources, she sought Dracula to learn from him. In so doing, she showed him some worthiness in mankind. He was greatly influenced by her, opting to travel the world as an ordinary man to learn more about humanity.`,
            character_summary: `In 1455, Lisa sought out Dracula in his castle. Others told her that the man who lived there held secret knowledge of science beyond that of mortals. After exhausting all of her other resources, she sought Dracula to learn from him. In so doing, she showed him some worthiness in mankind. He was greatly influenced by her, opting to travel the world as an ordinary man to learn more about humanity.`,
        })
        .expect('Content-Type', /json/)
        .expect(400);

    await supertest(app)
        .put('/character')
        .send({
            id: 2,
            game_title_id: 2,
            clan_id: 1,
            name: 'Lisa Tepes',
            history: ``,
            character_summary: `In 1455, Lisa sought out Dracula in his castle. Others told her that the man who lived there held secret knowledge of science beyond that of mortals. After exhausting all of her other resources, she sought Dracula to learn from him. In so doing, she showed him some worthiness in mankind. He was greatly influenced by her, opting to travel the world as an ordinary man to learn more about humanity.`,
        })
        .expect('Content-Type', /json/)
        .expect(400);

    await supertest(app)
        .put('/character')
        .send({
            id: 2,
            game_title_id: 2,
            clan_id: 1,
            name: 'Lisa Tepes',
            history: `In 1455, Lisa sought out Dracula in his castle. Others told her that the man who lived there held secret knowledge of science beyond that of mortals. After exhausting all of her other resources, she sought Dracula to learn from him. In so doing, she showed him some worthiness in mankind. He was greatly influenced by her, opting to travel the world as an ordinary man to learn more about humanity.`,
            character_summary: ``,
        })
        .expect('Content-Type', /json/)
        .expect(400);

});

test('DELETE-ERROR /character', async () => {
    
    await supertest(app)
        .delete('/character')
        .send({
            id: null,
        })
        .expect('Content-Type', /json/)
        .expect(400);

    await supertest(app)
        .delete('/character')
        .send({
            id: 20,
        })
        .expect('Content-Type', /json/)
        .expect(400);

});

test('truncate data', async () => {
    await prisma.$queryRaw`TRUNCATE "Characters" RESTART IDENTITY`
    await prisma.$queryRaw`TRUNCATE "Clans" RESTART IDENTITY`
    await prisma.$queryRaw`TRUNCATE "Game_titles" RESTART IDENTITY`
})