console.log("Ola mundo!")

import { Tweet } from "./class/tweet";
import { User } from "./class/user";
import { Like } from "./class/like";  
import { Dislike } from "./class/dislike";  

//<--------------------- Criar usuários -------------------------------------->

const isabela = User.createUser("Isabella Drake", "IsaD", "niwap@hopuboc.ru", "Isa123ISA");
const djonathan = User.createUser("Djonathan Moreno", "Djou", "jih@fiwef.kz", "Djou123Djou");
const stella = User.createUser("Stella Olson", "stE", "giwli@dabkuw.ps", "stella123Oln");

//<--------------------- Criar tweets -------------------------------------->

const tweet1 = new Tweet("Primeiro tweet de IsaD", "Normal", isabela);
const tweet2 = new Tweet("Segundo tweet de IsaD", "Normal", isabela);
const tweet3 = new Tweet("Primeiro tweet de Djou", "Normal", djonathan);
const tweet4 = new Tweet("Primeiro tweet de stE", "Normal", stella);
const like1 = new Like(isabela, tweet1);
const like2 = new Like(stella, tweet1);
const like3 = new Like(stella, tweet2);
const like4 = new Like(djonathan, tweet1);
const like5 = new Like(djonathan, tweet4);
const dislike1 = new Dislike(djonathan, tweet2);
const dislike2 = new Dislike(stella, tweet1);

//<--------------------- Enviar tweets -------------------------------------->

isabela.sendTweet(tweet1);
isabela.sendTweet(tweet2);
djonathan.sendTweet(tweet3);
stella.sendTweet(tweet4);

//<--------------------- Seguir usuários -------------------------------------->

djonathan.follow(isabela);
djonathan.follow(stella);

//<--------------------- Curtir tweets -------------------------------------->

like2.showReaction();
like3.showReaction();
like4.showReaction();
like5.showReaction();
like1.showReaction();

//<--------------------- Dislike em tweets ---------------------------------->

dislike1.showReaction();
dislike2.showReaction();

//<--------------------- Responder tweets -------------------------------------->

tweet1.reply("Primeira resposta para o tweet", isabela);
tweet1.reply("Segunda resposta para o tweet", stella);
tweet1.reply("Segunda resposta para o tweet", djonathan);

//<--------------------- Mostrar feeds -------------------------------------->
djonathan.showFollowers();

djonathan.showFeed();
isabela.showFeed();
stella.showFeed();
