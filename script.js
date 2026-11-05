const questions = [
  {emoji:"👯‍♀️",q:"Would you love my twin?",yes:"So I'm replaceable? 😭",no:"So you discriminate against twins? 🤨"},
  {emoji:"🎮",q:"Would you let me win?",yes:"So you think I can't win myself? 💅",no:"You enjoy defeating girls? 😤"},
  {emoji:"💸",q:"Would you share your salary with me?",yes:"So you think I need your money? 😂",no:"Financial secrets already?! 👀"},
  {emoji:"💋",q:"Would you kiss me right now?",yes:"At work?! No professionalism? 😳",no:"Rejected by my own boyfriend?! 😭"},
  {emoji:"💞",q:"Would you choose me twice?",yes:"Why not a thousand times? 🥺",no:"Second thoughts already? 😭"},
  {emoji:"🙃",q:"Do I annoy you?",yes:"And you still love me? 😌",no:"So I'm not special? 🥲"},
  {emoji:"🗣️",q:"Do I talk too much?",yes:"You don't enjoy my voice? 😭",no:"Then why don't you listen? 👀"},
  {emoji:"🛍️",q:"Am I expensive?",yes:"Calling me a burden? 😤",no:"Not spoiling me enough? 💅"}
];

let index = 0;
let selectedAnswer = null;
const $ = id => document.getElementById(id);
const pages = ["welcome","questionPage","ending"];

function showPage(id){
  pages.forEach(page => $(page).classList.toggle("active", page === id));
}
function loadQuestion(){
  const item = questions[index];
  selectedAnswer = null;
  $("count").textContent = `${String(index+1).padStart(2,"0")} / ${String(questions.length).padStart(2,"0")}`;
  $("number").textContent = String(index+1).padStart(2,"0");
  $("bar").style.width = `${((index+1)/questions.length)*100}%`;
  $("emoji").textContent = item.emoji;
  $("question").textContent = item.q;
  $("reaction").classList.add("hidden");
  $("reactionText").textContent = "";
  $("next").disabled = true;
  $("next").textContent = index === questions.length-1 ? "Finish the quiz ♡" : "Next question →";
  document.querySelectorAll(".choice").forEach(button => button.classList.remove("selected"));
  showPage("questionPage");
}
function choose(answer){
  selectedAnswer = answer;
  document.querySelectorAll(".choice").forEach(button => {
    button.classList.toggle("selected", button.dataset.answer === answer);
  });
  $("reactionText").textContent = questions[index][answer];
  $("reaction").classList.remove("hidden");
  $("next").disabled = false;
}
$("begin").addEventListener("click", loadQuestion);
document.querySelectorAll(".choice").forEach(button => {
  button.addEventListener("click", () => choose(button.dataset.answer));
});
$("next").addEventListener("click", () => {
  if(selectedAnswer === null) return;
  if(index < questions.length-1){ index++; loadQuestion(); }
  else showPage("ending");
});
$("again").addEventListener("click", () => { index = 0; loadQuestion(); });
