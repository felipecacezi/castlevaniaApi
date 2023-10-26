import supertest from 'supertest'
import app from '../src/app'

test('POST-SUCCESS /clan', async () => {
    
    await supertest(app)
        .post('/clan')
        .send({
            name: "Belmonts",
            clan_summary: "A historia dos Belmonts é bastante simples, um guerreiro Leon Belmont (que talvez seja neto ou bisneto de um paladino) estudava na academia de Rinaldo Gandolfi, quando sua noiva foi amaldiçoada e transformada em vampiro. Ela acaba se sacrificado e Leon jura dedicar sua vida a destruir todo o mal do mundo.Obviamente ele não consegue. Mas seus filhos e netos continuaram levando esses objetivos em frente pelo tempo, desenvolvendo técnicas e armas para combater o mal do mundo.Embora qualquer Belmont conheça e siga o código de conduta dos paladinos poucos realmente são paladinos de fato, Richter, Trevor e talvez Simon Belmont o sejam, mas a grande maioria dos Belmonts são guerreiros.Trevor Belmont casou-se com Sypha Belnades o que acabou gerando algum talento para a magia em sua linhagem, Juste Belmont era claramente mais feiticeiro que guerreiro, mas no geral os métodos mudaram pouco desde a criação do clã.Embora os Belmonts sejam a primeira linha de defesa da humanidade não são a única, algumas das filhas Belmont acabaram por darem continuidade a outras linhagens derivadas dos Belmonts e continuaram a ajudar o mundo na luta contra Drácula."
        })
        .set('Accept', 'application/json/')
        .expect('Content-Type', /json/)
        .expect(201);

});

test('GET-SUCCESS /clan', async () => {

    const jsonExpected = [{
        id: 1,
        name: "Belmonts",
        clan_summary: "A historia dos Belmonts é bastante simples, um guerreiro Leon Belmont (que talvez seja neto ou bisneto de um paladino) estudava na academia de Rinaldo Gandolfi, quando sua noiva foi amaldiçoada e transformada em vampiro. Ela acaba se sacrificado e Leon jura dedicar sua vida a destruir todo o mal do mundo.Obviamente ele não consegue. Mas seus filhos e netos continuaram levando esses objetivos em frente pelo tempo, desenvolvendo técnicas e armas para combater o mal do mundo.Embora qualquer Belmont conheça e siga o código de conduta dos paladinos poucos realmente são paladinos de fato, Richter, Trevor e talvez Simon Belmont o sejam, mas a grande maioria dos Belmonts são guerreiros.Trevor Belmont casou-se com Sypha Belnades o que acabou gerando algum talento para a magia em sua linhagem, Juste Belmont era claramente mais feiticeiro que guerreiro, mas no geral os métodos mudaram pouco desde a criação do clã.Embora os Belmonts sejam a primeira linha de defesa da humanidade não são a única, algumas das filhas Belmont acabaram por darem continuidade a outras linhagens derivadas dos Belmonts e continuaram a ajudar o mundo na luta contra Drácula."
    }];
    
    await supertest(app)
        .get('/clan')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(JSON.stringify(jsonExpected));

});

test('GET-SUCCESS /clan?id=1', async () => {

    const jsonExpected = {
        id: 1,
        name: "Belmonts",
        clan_summary: "A historia dos Belmonts é bastante simples, um guerreiro Leon Belmont (que talvez seja neto ou bisneto de um paladino) estudava na academia de Rinaldo Gandolfi, quando sua noiva foi amaldiçoada e transformada em vampiro. Ela acaba se sacrificado e Leon jura dedicar sua vida a destruir todo o mal do mundo.Obviamente ele não consegue. Mas seus filhos e netos continuaram levando esses objetivos em frente pelo tempo, desenvolvendo técnicas e armas para combater o mal do mundo.Embora qualquer Belmont conheça e siga o código de conduta dos paladinos poucos realmente são paladinos de fato, Richter, Trevor e talvez Simon Belmont o sejam, mas a grande maioria dos Belmonts são guerreiros.Trevor Belmont casou-se com Sypha Belnades o que acabou gerando algum talento para a magia em sua linhagem, Juste Belmont era claramente mais feiticeiro que guerreiro, mas no geral os métodos mudaram pouco desde a criação do clã.Embora os Belmonts sejam a primeira linha de defesa da humanidade não são a única, algumas das filhas Belmont acabaram por darem continuidade a outras linhagens derivadas dos Belmonts e continuaram a ajudar o mundo na luta contra Drácula."
    };

    await supertest(app)
        .post('/clan')
        .send({
            name: "Cronqvist/Tepes",
            clan_summary: `O clã de alquimistas que acabaria trazendo ao mundo o poder dos dark lords ainda existe. Fora seu talento para o mal e a alquimia não se sabe muito deles.
                Oficialmente são inimigos jurados dos Belmont            
                Adrian Tepes já se provou aliado confiável dos Belmonts e há teorias que Trevor Belmont seja filho dele. Não há provas disso, mas não é de todo o impossível. Se isso for verdade todos os Belmonts desde Sonia teriam o sangue de Drácula correndo nas veias.`
        })
        .set('Accept', 'application/json/')
        .expect('Content-Type', /json/)
        .expect(201);
    
    await supertest(app)
        .get('/clan?id=1')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(JSON.stringify(jsonExpected));

});

test('UPDATE-SUCCESS /clan', async () => {

    const jsonUpdate = {
        id: 1,
        name: "Renard",
        clan_summary: "Outro clã que se uniu aos Belmonts em 1792. São um clã de feiticeiros antigos, mas seu maior mérito talvez seja, em 1798, Maria Renard ter juntado a linhagem Tapes (na forma de Alucard) a sua própria. Nos tempos atuais são reconhecidos como os melhores invocadores do mundo, graças a essa dupla linhagem."
    };
    
    await supertest(app)
        .put('/clan')
        .send(jsonUpdate)
        .expect('Content-Type', /json/)
        .expect(200);

    await supertest(app)
        .get('/clan?id=1')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(JSON.stringify(jsonUpdate));

});

test('DELETE-SUCCESS /clan', async () => {
    
    await supertest(app)
        .delete('/clan')
        .send({
            id: 1,
        })
        .expect('Content-Type', /json/)
        .expect(200);

    await supertest(app)
        .delete('/clan')
        .send({
            id: 2,
        })
        .expect('Content-Type', /json/)
        .expect(200);

});

test('POST-ERROR /clan', async () => {
    
    await supertest(app)
        .post('/clan')
        .send({
            name: "",
            clan_summary: "A historia dos Belmonts é bastante simples, um guerreiro Leon Belmont (que talvez seja neto ou bisneto de um paladino) estudava na academia de Rinaldo Gandolfi, quando sua noiva foi amaldiçoada e transformada em vampiro. Ela acaba se sacrificado e Leon jura dedicar sua vida a destruir todo o mal do mundo.Obviamente ele não consegue. Mas seus filhos e netos continuaram levando esses objetivos em frente pelo tempo, desenvolvendo técnicas e armas para combater o mal do mundo.Embora qualquer Belmont conheça e siga o código de conduta dos paladinos poucos realmente são paladinos de fato, Richter, Trevor e talvez Simon Belmont o sejam, mas a grande maioria dos Belmonts são guerreiros.Trevor Belmont casou-se com Sypha Belnades o que acabou gerando algum talento para a magia em sua linhagem, Juste Belmont era claramente mais feiticeiro que guerreiro, mas no geral os métodos mudaram pouco desde a criação do clã.Embora os Belmonts sejam a primeira linha de defesa da humanidade não são a única, algumas das filhas Belmont acabaram por darem continuidade a outras linhagens derivadas dos Belmonts e continuaram a ajudar o mundo na luta contra Drácula."
        })
        .set('Accept', 'application/json/')
        .expect('Content-Type', /json/)
        .expect(400);

    await supertest(app)
        .post('/clan')
        .send({
            name: "Belmonts",
            clan_summary: ""
        })
        .set('Accept', 'application/json/')
        .expect('Content-Type', /json/)
        .expect(400);

});

test('GET-EMPTY /clan', async () => {

    const jsonExpected:[] = [];
    
    await supertest(app)
        .get('/clan')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(jsonExpected);

});

test('GET-EMPTY /clan?id=1', async () => {

    const jsonExpected = {};
    
    await supertest(app)
        .get('/clan?id=1')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(JSON.stringify(jsonExpected));

});

test('UPDATE-ERROR /clan', async () => {
    
    await supertest(app)
        .put('/clan')
        .send({
            id: null,
            name: "Renard",
            clan_summary: "Outro clã que se uniu aos Belmonts em 1792. São um clã de feiticeiros antigos, mas seu maior mérito talvez seja, em 1798, Maria Renard ter juntado a linhagem Tapes (na forma de Alucard) a sua própria. Nos tempos atuais são reconhecidos como os melhores invocadores do mundo, graças a essa dupla linhagem."
        })
        .expect('Content-Type', /json/)
        .expect(400);

    await supertest(app)
        .put('/clan')
        .send({
            id: 1,
            name: "",
            clan_summary: "Outro clã que se uniu aos Belmonts em 1792. São um clã de feiticeiros antigos, mas seu maior mérito talvez seja, em 1798, Maria Renard ter juntado a linhagem Tapes (na forma de Alucard) a sua própria. Nos tempos atuais são reconhecidos como os melhores invocadores do mundo, graças a essa dupla linhagem."
        })
        .expect('Content-Type', /json/)
        .expect(400);

    await supertest(app)
        .put('/clan')
        .send({
            id: 1,
            name: "Renard",
            clan_summary: ""
        })
        .expect('Content-Type', /json/)
        .expect(400);
    
});

test('DELETE-ERROR /clan', async () => {
    
    await supertest(app)
        .delete('/clan')
        .send({
            id: null,
        })
        .expect('Content-Type', /json/)
        .expect(400);

    await supertest(app)
        .delete('/clan')
        .send({
            id: 2,
        })
        .expect('Content-Type', /json/)
        .expect(400);

});