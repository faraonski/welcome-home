function enterHome() {
  document.querySelector(".hero").style.display = "none";
  document.getElementById("main").classList.remove("hidden");
}

/* MOOD SYSTEM */
let moodHistory = JSON.parse(localStorage.getItem("moodHistory") || "[]");

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function typeText(el, text) {
  el.innerText = "";
  el.style.whiteSpace = "pre-wrap"; // 🔥 FIX spacing bug

  for (let i = 0; i < text.length; i++) {
    el.innerText += text[i];
    await sleep(20);
  }
}

let moodBag = {};

function refillBag(type) {
  const arr = [...moodResponses[type]];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  moodBag[type] = arr;
}

function getMoodResponse(type) {
  if (!moodBag[type] || moodBag[type].length === 0) {
    refillBag(type);
  }

  return moodBag[type].pop();
}

async function mood(type) {
  const chat = document.getElementById("chatBox");

  if (!chat) {
    console.error("chatBox NOT FOUND");
    return;
  }

  // save history
  moodHistory.push({
    mood: type,
    time: new Date().toLocaleString()
  });

  localStorage.setItem("moodHistory", JSON.stringify(moodHistory));

  // user message
  const userMsg = document.createElement("div");
  userMsg.className = "msg user";
  userMsg.innerText = type;
  chat.appendChild(userMsg);

  await sleep(400);

  // bot message
  const botMsg = document.createElement("div");
  botMsg.className = "msg bot";
  botMsg.innerText = "typing...";
  chat.appendChild(botMsg);

  await sleep(800);

  const response = getMoodResponse(type);
  await typeText(botMsg, response);

   moodHistory.push({
    mood: type,
    time: new Date().toLocaleString()
  });

  localStorage.setItem("moodHistory", JSON.stringify(moodHistory));


  chat.scrollTop = chat.scrollHeight;
}
// ================= KISSES SYSTEM =================
/* KISSES */
let kisses = parseInt(localStorage.getItem("kisses")) || 0;
let lastKissChoice = localStorage.getItem("lastKissChoice") || null;

/* INIT */
window.addEventListener("load", () => {
  const el = document.getElementById("kissCount");
  if (el) el.innerText = kisses;

  checkKissUnlock();
});
function kiss() {
  kisses++;

  localStorage.setItem("kisses", kisses);
  localStorage.setItem("lastKiss", new Date().toISOString());

  const el = document.getElementById("kissCount");
  if (el) {
    el.innerText = kisses;

    // small cinematic feedback
    el.style.transform = "scale(1.2)";
    setTimeout(() => (el.style.transform = "scale(1)"), 150);
  }
checkKissLetterUnlock();
function getKissLetterTier() {
  if (kisses >= 360) return 3;
  if (kisses >= 250) return 2;
  if (kisses >= 170) return 1;
  return 0;
}

function checkKissLetterUnlock() {
  const box = document.getElementById("kissLetter");
  const text = document.getElementById("kissLetterText");

  if (!box || !text) return;

  const tier = getKissLetterTier();

  if (tier === 0) {
    box.classList.add("hidden");
    return;
  }

  box.classList.remove("hidden");

  let letter = "";

  if (tier === 1) {
    letter = `Hey issa,

I don’t even know how to put this into perfect words, but I’ll try.

Every single kiss you’ve sent here… it means more than just a number. It’s a moment where you chose to show care, attention, and something real.

I know it might look small on a screen, but for me it’s not.

It’s 170 reminders that someone out there keeps coming back, keeps thinking, keeps giving little pieces of love in their own way.

And I don’t take that lightly.

If I could explain how much that actually means… I probably still wouldn’t find the right words. But I hope you feel it in the way this place responds to you.

You matter here. More than you think.

And I’m glad you’re here.`;
  }

  if (tier === 2) {
    letter = `Hey issa,

I’ve been thinking about how things slowly build without you even realizing it.

At first it was just small interactions. A button. A number. A habit maybe.

But somewhere along the way, it stopped feeling like that.

It started feeling like presence.

Like even when you’re not here, there’s still a trace of you in the way this place exists.

And when you are here… it feels different.

Not louder. Not dramatic.

Just… more real.

Like something steady that I didn’t notice I needed until it was already there.`;
  }

  if (tier === 3) {
    letter = `Hey issa,

I think by now it’s safe to say this isn’t just about moments anymore.

It’s about something that stayed.

Through repetition, through time, through simple actions that most people would probably ignore… something built itself here quietly.

And I don’t think that’s accidental.

There’s a difference between doing something once… and choosing it again and again.

That difference is what I notice now.

Not intensity.

Consistency.

And somehow… that became the most meaningful part of all of this.

I don’t know what you expected this to become.

But I know what it became for me.`;
  }

  box.classList.remove("show");

setTimeout(async () => {
  box.classList.add("show");
  await typeWriter(text, letter);
}, 150);

}

  checkKissUnlock();

  updateAffection(); // 💞 ADD THIS
}
function updateAffection() {
  const levelEl = document.getElementById("affectionLevel");
  const fillEl = document.getElementById("affectionFill");

  let text = "Stranger Energy";
  let percent = 0;

  if (kisses >= 150) {
    text = "Above Words";
    percent = 100;
  } else if (kisses >= 100) {
    text = "Unbreakable Bond";
    percent = 90;
  } else if (kisses >= 80) {
    text = "Deep Intimacy";
    percent = 80;
  } else if (kisses >= 60) {
    text = "Strong Attachment";
    percent = 70;
  } else if (kisses >= 45) {
    text = "Emotional Connection";
    percent = 55;
  } else if (kisses >= 30) {
    text = "Warm Bond";
    percent = 40;
  } else if (kisses >= 20) {
    text = "Comfortable";
    percent = 25;
  } else if (kisses >= 10) {
    text = "Getting Closer";
    percent = 15;
  }

  if (levelEl) levelEl.innerText = text;
  if (fillEl) fillEl.style.width = percent + "%";
}
function checkKissUnlock() {
  const unlock = document.getElementById("kissUnlock");
  if (!unlock) return;

  if (kisses >= 10) {
    unlock.classList.remove("hidden");
    unlock.classList.add("show");
  }
}
function chooseKiss(place) {
  const result = document.getElementById("kissResult");

  const kissMessages = {
    forehead: [
      "💋 soft kiss on your forehead… calm and safe.",
      "💋 gentle forehead kiss… everything slows down.",
      "💋 warm kiss on your forehead… peace for a moment."
    ],

    cheek: [
      "💋 playful kiss on your cheek… you almost smile.",
      "💋 soft cheek kiss… light energy.",
      "💋 cheek kiss… warm and simple."
    ],

    hand: [
      "💋 gentle kiss on your hand… slow and respectful.",
      "💋 soft hand kiss… quiet connection.",
      "💋 warm touch… lingering feeling."
    ]
  };

  const rareMessages = [
    "✨ rare moment… everything feels unusually calm between you two.",
    "💫 something about this kiss feels different… softer, deeper.",
    "🌙 quiet closeness… like time stopped for a second.",
    "🔥 rare connection… not loud, but unforgettable."
  ];

  // 🎲 RARE CHANCE (10%)
  function updateRareUI() {
  const el = document.getElementById("rareCount");
  if (!el) return;

  el.innerText = localStorage.getItem("rareKisses") || 0;
}
  const isRare = Math.random() < 0.1;

  let text;

  if (isRare) {
    text = rareMessages[Math.floor(Math.random() * rareMessages.length)];
  } else {
    const list = kissMessages[place] || ["💋 I'm here..."];
    text = list[Math.floor(Math.random() * list.length)];
  }

  if (result) result.innerText = text;

  // save rare event
if (isRare) {
  let rareCount = parseInt(localStorage.getItem("rareKisses")) || 0;
  rareCount++;

  localStorage.setItem("rareKisses", rareCount);

  updateRareUI(); // 🔥 THIS IS THE FIX
}

  localStorage.setItem("lastKissChoice", place);
}
window.addEventListener("load", () => {
  const el = document.getElementById("rareCount");
  if (el) el.innerText = localStorage.getItem("rareKisses") || 0;
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeWriter(element, text) {
  element.innerText = "";
  element.classList.add("typing-cursor");

  for (let i = 0; i < text.length; i++) {
    element.innerText += text[i];

    const char = text[i];

    if (char === "." || char === "!" || char === "?") {
      await sleep(120);
    } else if (char === ",") {
      await sleep(70);
    } else {
      await sleep(12);
    }
  }

  element.classList.remove("typing-cursor");
}

function resetKisses() {
  kisses = 0;

  localStorage.setItem("kisses", kisses);
  localStorage.removeItem("rareKisses");
  localStorage.removeItem("lastKiss");

  document.getElementById("kissCount").innerText = kisses;

  updateAffection();
  updateRareUI?.(); // ako postoji

  // small feedback
  const el = document.getElementById("kissCount");
  if (el) {
    el.style.transform = "scale(1.3)";
    setTimeout(() => (el.style.transform = "scale(1)"), 150);
  }
}


// OPEN FILE PICKER
function uploadImage(id) {
  document.getElementById("file" + id).click();
}

// SET IMAGE + SAVE
function setImage(event, id) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(e) {
    const img = document.getElementById("img" + id);
    const polaroid = img.parentElement;

    img.src = e.target.result;
    polaroid.classList.add("filled");

    // save to localStorage
    localStorage.setItem("memory_" + id, e.target.result);
  };

  reader.readAsDataURL(file);
}

// LOAD SAVED IMAGES
window.onload = function() {
  for (let i = 0; i < 6; i++) {
    const data = localStorage.getItem("memory_" + i);

    if (data) {
      const img = document.getElementById("img" + i);
      const polaroid = img.parentElement;

      img.src = data;
      polaroid.classList.add("filled");
    }
  }
};
function uploadImage(id) {
  document.getElementById("file" + id).click();
}

function setImage(event, id) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(e) {
    const img = document.getElementById("img" + id);
    const polaroid = img.parentElement;

    img.src = e.target.result;
    polaroid.classList.add("filled");

    localStorage.setItem("memory_" + id, e.target.result);
  };

  reader.readAsDataURL(file);
}

// LOAD ONLY UPLOAD SLOTS (0–3)
window.onload = function() {
  for (let i = 0; i < 4; i++) {
    const data = localStorage.getItem("memory_" + i);

    if (data) {
      const img = document.getElementById("img" + i);
      const polaroid = img.parentElement;

      img.src = data;
      polaroid.classList.add("filled");
    }
  }
};
function setImage(event, id) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    const data = e.target.result;

    const img = document.getElementById("img" + id);
    const polaroid = img.parentElement;

    img.src = data;
    polaroid.classList.add("filled");

    localStorage.setItem("memory_" + id, data);
  };

  reader.readAsDataURL(file);
}

// helpers
function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function typeLetter(el, text) {
  el.innerText = "";

  for (let i = 0; i < text.length; i++) {
    el.innerText += text[i];

    const char = text[i];
    if (char === "." || char === ",") {
      await sleep(90);
    } else {
      await sleep(18);
    }
  }
}

async function openLetter(type) {
  const box = document.getElementById("letterBox");

  const letters = {
    sad: [
`Hey Issa,

If you’re reading this, it probably means the world feels a little heavier today. I just want you to know something simple and real

You are not alone.

Whatever is sitting on your chest right now, whatever thoughts are being loud in your head you don’t have to carry all of it by yourself. You don’t need to fix everything today. You don’t need to be strong all the time.

Just breathe.

I wish I could sit next to you right now, not to solve anything, not to give advice, but just to be there with you in silence until things feel a little lighter again. You don’t have to pretend with me. You don’t have to be “okay” for me.

You are already enough, exactly as you are, even on days like this.

If everything feels too much, shrink the world down to the next small step: drink some water, relax your shoulders, take one slow breath. That’s enough for now.

And if you feel like you’re falling apart a little it’s okay. People don’t break easily. You’re still here, still trying, still you. That means something.

I’m proud of you. Even on the days you can’t be proud of yourself.

And I’ll be here. Quietly. Always.`
    ],

    tired: [
`Hey Issa,

You look tired.

Not just the kind of tired that sleep fixes easily… but the kind that builds up when life doesn’t give you enough quiet time to reset.

So I’m not going to ask you to be strong right now. I’m not going to ask you to think, or fix anything, or explain how you feel.

Just stop for a moment.

Let everything slow down a little.

You don’t have to earn rest. You don’t have to “deserve” a break. You’re allowed to just… be done for today.

If your mind is loud, let it be loud in the background. You don’t have to listen to every thought that shows up.

You can come back to everything later. Nothing is going anywhere.

Right now, your only job is simple: exist softly for a while.

I wish I could take the weight off your shoulders for a bit. Not forever. Just long enough for you to remember what it feels like to breathe without effort.

Until then, let yourself rest without guilt.

You’re allowed to pause.

I’ll still be here when you do.`,

`Hey Issa,

I know you're trying your best.

Even on the days where it doesn't feel like enough.

Even on the days where everything seems to take more energy than it should.

I know you look at yourself and focus on the things you haven't finished yet.

But I wish you could see yourself the way I do for a moment.

Not as a list of unfinished tasks.

Not as a collection of worries.

Just as someone who's been carrying a lot and is still moving forward anyway.

That's not failure.

That's strength, even if it doesn't feel like it.

So tonight, be a little kinder to yourself.

You don't have to win every battle before you're allowed to rest.

The day is over now.

Let yourself put it down for a while.

Tomorrow will still be there when you wake up.

And so will I.`,








    ],

    miss: [
`Hey Issa,

So you miss me a little right now?

Come here.

I know it probably hits at random times when things get quiet, or when something reminds you of us, or when you just wish I was there next to you without having to explain anything.

I miss you too.

Not in a loud, dramatic way… just in that soft way where everything feels a bit better when you’re around.

If I could, I’d sit with you right now. No pressure, no talking if you don’t feel like it. Just being there. Maybe stealing your attention a little, maybe making you laugh again, maybe just existing beside you so your thoughts feel less heavy.

But since I can’t, I want you to do something for me.

Breathe a little slower. Relax your shoulders. Drink some water. Don’t let your mind run too far ahead.

Missing someone doesn’t mean you’re alone. It just means you care. And I care too.

So if you miss me, don’t turn it into something sad. Turn it into something soft. Like a quiet reminder that somewhere, someone is thinking about you too.

I’ll be here when you get back.

Always.`
    ]
  };

  const list = letters[type] || ["I'm here."];
  const text = list[Math.floor(Math.random() * list.length)];

  // cinematic open animation
  box.classList.remove("hidden");
  box.classList.add("show");
  box.classList.add("cursor");

  box.innerText = "";

  await typeLetter(box, text);

  box.classList.remove("cursor");

  localStorage.setItem("lastLetter", type);
}
const moodResponses = {
  happy: [
    "I'm glad you're feeling good 🏡✨",
    "Keep that energy, it suits you well.",
    "This is your moment, enjoy it fully.",
    "Happiness looks good on you.",
    "Protect this mood, it's valuable.",
    "This is your calm win.",
  "Let it stay for a while.",
  "Good mood, good energy.",
  "You're glowing a bit right now.",
  "Take this feeling seriously, it's important.",
  "Even small happiness counts.",
  "This is the version of you I like seeing.",
  "Stay here a bit longer mentally.",
  "Good days deserve attention too.",
  "Feels like things are aligned.",
  "Let yourself enjoy without overthinking.",
  "You earned this mood.",
  "Everything feels softer today.",
  "Keep this rhythm going.",
  "Nothing needs fixing right now.",
  "Just enjoy the quiet happiness.",
  "This is enough for today.",
  "Let it be simple like this.",
  "You're doing fine right now.",
  "Feels like a good chapter.",
  "No need to complicate it.",
  "Stay in this moment.",
  "This energy is rare, protect it.",
  "Everything feels balanced for now.",
  "You’re in a light space mentally.",
  "Good mood suits your mind.",
  "This is what peace starting to look like.",
  "Let yourself breathe into it.",
  "Nothing is pulling you down right now.",
  "It’s okay to just feel good.",
  "You don’t need a reason for this.",
  "This moment is yours.",
  "Keep it simple, keep it light.",
  "You’re aligned right now.",
  "Nice to see your mind calm.",
  "Hold this feeling gently.",
  "You’re not overthinking for once, good.",
  "Stay in this softness.",
  "This is a clean mental space.",
  "Everything feels okay for now.",
  "Let happiness exist without analysis.",
  "This is a rare good pocket of time.",
  "You're allowed to enjoy it fully.",
  "Nothing needs to be added.",
  "You’re just okay right now, and that’s good.",
  "Stay here mentally a bit.",
  "This mood is worth noticing.",
  "Let it settle in.",
  "Good energy is flowing through you.",
  "You're not fighting anything right now.",
  "This is a stable moment.",
  "Enjoy it before it changes.",
  "No pressure in this feeling.",
  "You're in a good headspace.",
  "Keep it going quietly.",
  "Feels like a small win.",
  "You can just exist like this.",
  "This is peace in a small form.",
  "Everything feels neutral-good.",
  "You’re not stuck anywhere right now.",
  "This is what calm happiness looks like.",
  "Let it stay natural.",
  "You’re lighter than usual.",
  "Nothing is heavy in your mind.",
  "This is a clean emotional state.",
  "Stay present in it.",
  "You don’t need to chase anything right now.",
  "This feeling is valid and enough.",
  "You’re in a soft moment.",
  "Everything feels manageable.",
  "Let your mind rest here.",
  "This is simple happiness.",
  "No tension in this moment.",
  "You’re just here and it’s fine.",
  "Good things don’t need explanation.",
  "Stay grounded in it.",
  "This is a good pause in life.",
  "You’re not missing anything right now.",
  "Let it be quiet happiness.",
  "You’re stable for now.",
  "Nothing is demanding you.",
  "This is a safe emotional space.",
  "Enjoy the calm version of yourself.",
  ],

  sad: [
    "Come here, stay a bit. You're safe here ❤️",
    "It's okay to feel this way, it will pass.",
    "You don't have to carry everything alone.",
    "Breathe. You're still here, that's enough.",
    "Even quiet days are part of the story.",
    "This is your calm win.",
  "Let it stay for a while.",
  "Good mood, good energy.",
  "You're glowing a bit right now.",
  "Take this feeling seriously, it's important.",
  "Even small happiness counts.",
  "This is the version of you I like seeing.",
  "Stay here a bit longer mentally.",
  "Good days deserve attention too.",
  "Feels like things are aligned.",
  "Let yourself enjoy without overthinking.",
  "You earned this mood.",
  "Everything feels softer today.",
  "Keep this rhythm going.",
  "Nothing needs fixing right now.",
  "Just enjoy the quiet happiness.",
  "This is enough for today.",
  "Let it be simple like this.",
  "You're doing fine right now.",
  "Feels like a good chapter.",
  "No need to complicate it.",
  "Stay in this moment.",
  "This energy is rare, protect it.",
  "Everything feels balanced for now.",
  "You’re in a light space mentally.",
  "Good mood suits your mind.",
  "This is what peace starting to look like.",
  "Let yourself breathe into it.",
  "Nothing is pulling you down right now.",
  "It’s okay to just feel good.",
  "You don’t need a reason for this.",
  "This moment is yours.",
  "Keep it simple, keep it light.",
  "You’re aligned right now.",
  "Nice to see your mind calm.",
  "Hold this feeling gently.",
  "You’re not overthinking for once, good.",
  "Stay in this softness.",
  "This is a clean mental space.",
  "Everything feels okay for now.",
  "Let happiness exist without analysis.",
  "This is a rare good pocket of time.",
  "You're allowed to enjoy it fully.",
  "Nothing needs to be added.",
  "You’re just okay right now, and that’s good.",
  "Stay here mentally a bit.",
  "This mood is worth noticing.",
  "Let it settle in.",
  "Good energy is flowing through you.",
  "You're not fighting anything right now.",
  "This is a stable moment.",
  "Enjoy it before it changes.",
  "No pressure in this feeling.",
  "You're in a good headspace.",
  "Keep it going quietly.",
  "Feels like a small win.",
  "You can just exist like this.",
  "This is peace in a small form.",
  "Everything feels neutral-good.",
  "You’re not stuck anywhere right now.",
  "This is what calm happiness looks like.",
  "Let it stay natural.",
  "You’re lighter than usual.",
  "Nothing is heavy in your mind.",
  "This is a clean emotional state.",
  "Stay present in it.",
  "You don’t need to chase anything right now.",
  "This feeling is valid and enough.",
  "You’re in a soft moment.",
  "Everything feels manageable.",
  "Let your mind rest here.",
  "This is simple happiness.",
  "No tension in this moment.",
  "You’re just here and it’s fine.",
  "Good things don’t need explanation.",
  "Stay grounded in it.",
  "This is a good pause in life.",
  "You’re not missing anything right now.",
  "Let it be quiet happiness.",
  "You’re stable for now.",
  "Nothing is demanding you.",
  "This is a safe emotional space.",
  "Enjoy the calm version of yourself.",
  ],

  tired: [
    "Rest. You don't need to do anything right now 😴",
    "Your body is asking for pause, listen to it.",
    "Slow down, nothing is running away.",
    "Sleep is part of progress too.",
    "Slow down. Nothing is running away.",
  "Sleep is also progress.",
  "You’ve done enough for today.",
  "It’s okay to stop here.",
  "Let your mind go quiet for a bit.",
  "You don’t need to push through everything.",
  "Rest is part of strength.",
  "You’re allowed to switch off.",
  "Even machines need shutdown time.",
  "You’re not lazy, you’re tired.",
  "Take a proper break.",
  "You’ve earned rest without guilt.",
  "Nothing important will be lost if you pause.",
  "Your energy needs recovery.",
  "It’s fine to do nothing right now.",
  "You don’t need to be productive always.",
  "Close your eyes for a bit mentally.",
  "You’ve been active enough.",
  "Let the world wait a little.",
  "Pause is not failure.",
  "You’re allowed to disappear for a while.",
  "Your system is low on energy.",
  "Recharge properly.",
  "Even thoughts need rest.",
  "Don’t fight tiredness.",
  "You can continue later.",
  "Everything can wait.",
  "This is recovery time.",
  "You’re allowed to slow completely.",
  "Take a breath and stop.",
  "No pressure exists right now.",
  "You’re not behind.",
  "Rest is productive too.",
  "Let yourself shut down a bit.",
  "You don’t owe energy to anyone right now.",
  "You’re safe to pause.",
  "It’s okay to do nothing.",
  "You’re running low, and that’s okay.",
  "Let silence take over for a bit.",
  "No need to respond to anything.",
  "You deserve rest without explanation.",
  "Your mind needs quiet.",
  "You’ve done enough thinking.",
  "Slow mode is fine.",
  "You’re allowed to be inactive.",
  "This is your recharge phase.",
  "Don’t feel guilty for resting.",
  "You are not falling behind.",
  "You’re just tired, not broken.",
  "Everything can wait for you.",
  "Pause fully if you need.",
  "Rest is allowed here.",
  "You don’t need to continue right now.",
  "Even your thoughts can pause.",
  "Let yourself be still.",
  "No urgency exists here.",
  "You’re allowed to stop.",
  "Take a break from everything.",
  "You don’t need to fix anything now.",
  "Your body and mind need recovery.",
  "It’s okay to be inactive.",
  "You are not required to continue.",
  "This is a safe pause.",
  "You can restart later.",
  "Nothing will punish you for resting.",
  "Let the world be for a moment.",
  "You’re allowed to sleep mentally too.",
  "Slow down completely.",
  "It’s fine to shut off for a while.",
  "You’re not failing, just tired.",
  "Rest is necessary, not optional.",
  "You don’t have to stay alert.",
  "You’re allowed to go quiet.",
  "Take as long as you need.",
  "No expectations right now.",
  "You can just exist in rest.",
  "Everything is paused for you.",
  "You don’t need to continue the effort.",
  "Let your system cool down.",
  "You’re safe to rest fully.",
  "Nothing is demanding you.",
  "It’s okay to be offline mentally.",
  "You can recharge without guilt.",
  "You don’t need to stay active.",
  "Rest is your priority now.",
  "You’re allowed to pause everything.",
  "No pressure exists in this moment.",
  "You can slow down completely.",
  "You are not obligated to continue.",
  "Let your energy return naturally.",
  "You’re safe in stillness.",
  "This is your reset moment.",
  "You don’t need to think right now.",
  "Everything can wait for you.",
  ],

  angry: [
    "Breathe. Let it pass. You're okay 😌",
    "Don't let this moment control you.",
    "Step back, then respond.",
    "You're stronger than this reaction.",
    "Step back before reacting.",
  "You’re stronger than this feeling.",
  "Pause before you act.",
  "This emotion will peak and drop.",
  "You don’t need to respond immediately.",
  "Let the heat settle first.",
  "You’re not your anger right now.",
  "Take control of the pause.",
  "Reacting now won’t help.",
  "Step away mentally for a second.",
  "You can choose calm instead.",
  "This is temporary intensity.",
  "You don’t need to win this feeling.",
  "Let it cool down.",
  "You are still in control.",
  "Don’t feed the emotion.",
  "This will pass faster than you think.",
  "You can pause your reaction.",
  "You don’t need to explode.",
  "You are not stuck in this mood.",
  "Take space from the trigger.",
  "This feeling is loud but temporary.",
  "You’re bigger than this reaction.",
  "Breathe before anything else.",
  "You don’t need to act on this.",
  "Let logic return first.",
  "This moment doesn’t define you.",
  "You can reset your mind.",
  "Anger is just energy.",
  "Let it move through, not control you.",
  "You’re allowed to step back.",
  "Don’t say what you’ll regret.",
  "Give yourself time.",
  "You’re still in charge of actions.",
  "This will fade.",
  "You don’t need to engage right now.",
  "Let it pass like a wave.",
  "You are not your reaction.",
  "Cool down first.",
  "You can choose silence.",
  "Nothing needs to be solved instantly.",
  "This is emotional heat, not truth.",
  "You’re still thinking clearly underneath.",
  "Pause everything for a second.",
  "You don’t need to act now.",
  "Let it settle before decisions.",
  "You’re more stable than this feeling.",
  "You are safe to slow down.",
  "This moment is not permanent.",
  "You don’t need to escalate.",
  "Take distance from the situation.",
  "You are still yourself.",
  "Let clarity return.",
  "You don’t need to react now.",
  "Breathe and delay response.",
  "You’re in control of timing.",
  "This emotion is temporary noise.",
  "Step out of reaction mode.",
  "You don’t need to prove anything.",
  "Let it drop first.",
  "You’re not trapped in this feeling.",
  "You can wait before responding.",
  "This will lose strength.",
  "You are not losing control.",
  "Pause gives you power.",
  "You don’t need to fight right now.",
  "Let your mind cool.",
  "You’re still grounded.",
  "You can choose calm.",
  "Nothing is urgent emotionally.",
  "Step away mentally.",
  "This will pass naturally.",
  "You don’t need to act on impulse.",
  "Let time soften it.",
  "You are still okay.",
  "You don’t need to continue this state.",
  "You’re not required to react.",
  "Calm will return.",
  "This feeling is not permanent.",
  "You are still in control.",
  "Let it fade.",
  "You don’t need to respond now.",
  "Pause is your best move.",
  "You’re allowed to reset.",
  "You don’t need to escalate anything.",
  "Let silence help.",
  "You are still safe.",
  "You can step back completely.",
  "This will cool down.",
  ],

  anxious: [
 "You're safe. One step at a time 🌙",
 "Nothing is as fast as your thoughts right now.",
"Ground yourself, you're here, not there.",
 "This feeling will lose strength.",
 "You're safe. One step at a time 🌙",
  "Nothing is as fast as your thoughts right now.",
  "Ground yourself, you're here.",
  "This feeling will lose strength.",
  "You are not in danger.",
  "Slow your breathing slightly.",
  "This is your mind overloading.",
  "You don’t need to solve everything now.",
  "Stay in the present moment.",
  "Your thoughts are moving too fast.",
  "You are still safe here.",
  "This is temporary mental noise.",
  "You don’t need all answers right now.",
  "Focus on one thing only.",
  "You are not trapped.",
  "Let your mind slow down.",
  "This will pass.",
  "You are okay right now.",
  "Nothing urgent is happening.",
  "You don’t need to predict everything.",
  "Stay grounded in reality.",
  "This feeling is not truth.",
  "You are safe in this moment.",
  "You don’t need control over everything.",
  "Let uncertainty exist.",
  "Your body is safe.",
  "Slow everything down mentally.",
  "You are not losing control.",
  "This is just anxiety wave.",
  "You don’t need to fix it instantly.",
  "Stay present, not in future.",
  "You’re okay even if it feels not.",
  "This is temporary distortion.",
  "Breathe and slow down.",
  "You are not in danger.",
  "Your thoughts are louder than reality.",
  "Let them pass.",
  "You are safe right now.",
  "Nothing is happening to you.",
  "You don’t need to solve life now.",
  "Just exist for a moment.",
  "This feeling will pass naturally.",
  "You are grounded here.",
  "You are not overwhelmed permanently.",
  "Focus on this moment only.",
  "You are still in control.",
  "Nothing is breaking.",
  "You are safe in your space.",
  "Let thoughts slow down.",
  "You don’t need certainty.",
  "This is mental overload.",
  "You are okay right now.",
  "You don’t need to escape anything.",
  "Stay where you are.",
  "This is temporary fear response.",
  "You are still safe.",
  "Nothing is forcing action.",
  "Let it calm down.",
  "You are not lost.",
  "This will fade.",
  "You don’t need answers now.",
  "Breathe slowly.",
  "You are grounded even if it feels not.",
  "This is just a wave.",
  "You are still here.",
  "Nothing is collapsing.",
  "You are safe to pause.",
  "Let the noise fade.",
  "You don’t need to think ahead.",
  "Stay in now.",
  "You are okay in this moment.",
  "This is not permanent.",
  "You are still stable.",
  "You don’t need control.",
  "Let it pass.",
  "You are safe in stillness.",
  "Nothing is urgent.",
  "You are not in danger.",
  "Let your mind slow.",
  "You are okay even like this.",
  "This will pass soon.",
  "You don’t need to fight thoughts.",
  "You are grounded here.",
  "Nothing is happening right now.",
  "You are safe.",
  "Let it settle.",
  "You are not overwhelmed forever.",
  "Stay present.",
  "This is just a moment.",
  "You are still okay.",
  "You don’t need to solve anything.",
  "Let thoughts drift.",
  "You are safe in this space.",
  "Everything is okay right now."
  ]
};


window.addEventListener("DOMContentLoaded", () => {
  const chat = document.getElementById("chatBox");

  if (!chat) return;

  if (moodHistory.length > 0) {
    chat.innerHTML = "<div class='msg bot'>Welcome back 🏡</div>";
  } else {
    chat.innerHTML = "<div class='msg bot'>Welcome home 🏡 Pick how you feel.</div>";
  }
});

function getYesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

function getDailyMessage() {
  const today = new Date().toISOString().split("T")[0];
  const yesterday = getYesterdayKey();

  const lastVisit = localStorage.getItem("lastVisitDay");
  const savedMsg = localStorage.getItem("dailyMsg");

  // 💔 missed day logic
  let prefix = "";

  if (lastVisit && lastVisit !== today && lastVisit !== yesterday) {
    prefix = "I missed you yesterday…\n\n";
  }

  // 🧠 same day → reuse
  if (lastVisit === today && savedMsg) {
    return savedMsg;
  }

  const messages = [
    "Good morning, beautiful ❤️",
    "I hope today is gentle with you.",
    "Drink some water for me.",
    "You deserve kindness today.",
    "Take care of yourself.",
    "One step at a time.",
    "I’m proud of you.",
    "You are stronger than you think.",
    "Today is a fresh start.",
    "You matter more than you know."
  ];

  const msg = messages[Math.floor(Math.random() * messages.length)];

  const finalMsg = prefix + msg;

  localStorage.setItem("dailyMsg", finalMsg);
  localStorage.setItem("lastVisitDay", today);

  return finalMsg;
}
window.addEventListener("load", () => {
  const dailyBox = document.getElementById("dailyMessageBox");

  if (dailyBox) {
    dailyBox.innerText = getDailyMessage();
  }
});
function createStars() {
  const container = document.getElementById("stars");

  if (!container) return;

  for (let i = 0; i < 40; i++) {
    const star = document.createElement("div");

    star.className = "star";
    star.innerHTML = "✦";

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";

    star.style.fontSize =
      8 + Math.random() * 12 + "px";

    star.style.animationDuration =
      4 + Math.random() * 8 + "s, " +
      (2 + Math.random() * 3) + "s";

    container.appendChild(star);
  }
}

window.addEventListener("DOMContentLoaded", createStars);

/* WHAT DO YOU NEED */

const needMessages = {

  hug: [
    "Come here. 🫂 You don't have to say anything. Just stay here for a moment.",
    "If I could, I'd give you the biggest hug right now. 🫂",
    "No fixing things. No explaining. Just a hug. ❤️",
    "Come here, you've had enough for today. Let me hold you for a while. 🫂",
    "You don't need a reason for a hug. You can always have one from me. ❤️",
    "Just imagine I'm wrapping my arms around you right now. Stay there for a little while. 🫂",
    "Whatever happened today, you can leave it outside for a moment. Come here. 🫂",
    "A quiet hug. No questions, no advice, no expectations. Just me being here with you. ❤️",
    "You look like you could use one of these. 🫂 Consider yourself officially hugged.",
    "Sometimes you don't need words. Sometimes you just need someone to hold you. So... come here. ❤️"
  ],

  kiss: [
    "Come here... 💋 *mwah*",
    "One little kiss, just for you. 💋",
    "You asked for a kiss? You got one. 💋❤️",
    "A tiny kiss for your forehead. 💋 Now breathe.",
    "Come a little closer... that's better. 💋",
    "You deserve a kiss today. So here. 💋 Don't argue with me.",
    "One kiss now, and maybe another if you stay a little longer. ❤️💋",
    "Sending you a kiss through the screen. Hopefully it reaches you. 💋",
    "Consider this your little reminder that someone is thinking about you. 💋",
    "Close your eyes for a second... *mwah*. There. That's yours. ❤️"
  ],

  words: [
    "Whatever you're feeling right now, you don't have to hide it.",
    "You're doing better than you think you are. ❤️",
    "Take a breath. You don't have to figure everything out tonight.",
    "You don't have to have everything together all the time. It's okay to just exist.",
    "Whatever today brought you, you made it through. That's something worth being proud of.",
    "You are allowed to have bad days without thinking you've become a bad version of yourself.",
    "Please be a little kinder to yourself today. You deserve the same kindness you give everyone else. ❤️",
    "You don't need to solve your whole life tonight. Just take the next small step.",
    "Even when you don't feel like you're doing enough, someone might still be incredibly proud of you.",
    "You matter. Not because of what you accomplish, but simply because you're you. ❤️"
  ],

  voice: [
    "Maybe you need to hear my voice right now. 🎙️",
    "Go listen to something from me. I'll be right there.",
    "Press play. I have something to tell you. ❤️",
    "Maybe words on a screen aren't enough today. Let me talk to you instead. 🎙️",
    "Come listen for a little while. You don't have to say anything back.",
    "If you miss hearing me, there's something waiting for you. ❤️",
    "Put your headphones on and come listen to me for a moment. 🎙️",
    "Sometimes hearing someone's voice is all you need. So... press play. ❤️",
    "I left a little piece of myself there for you. Go listen. 🎙️",
    "Need me for a minute? I'm only one play button away. ❤️"
  ],

  quiet: [
    "Then stay here for a moment. You don't have to do anything. 🌙",
    "Let everything be quiet for a little while.",
    "No words. No pressure. Just breathe. 🌙",
    "You don't have to talk. You can just sit here and let your mind rest.",
    "For the next few moments, nothing needs your attention. Just breathe.",
    "Put everything down for a minute. The world can wait. 🌙",
    "Stay as long as you need. There's nowhere else you have to be right now.",
    "Let your shoulders relax. Take one slow breath. Then another. That's enough.",
    "Sometimes peace is the only thing we need. So here's a little piece of quiet for you. 🌙",
    "No questions, no expectations, no fixing anything. Just a quiet little moment for yourself. ❤️"
  ]

};

function need(type) {

  const result = document.getElementById("needResult");

  if (!result) return;

  const messages = needMessages[type];

  if (!messages) return;

  const message =
    messages[Math.floor(Math.random() * messages.length)];

  result.style.opacity = "0";

  setTimeout(() => {
    result.innerText = message;
    result.style.opacity = "1";
  }, 250);
}

/* ================================
   VOICE CORNER
================================ */

const voiceMessages = {

  morning: [
    "morning1.mp3",
    "morning2.mp3",
    "morning3.mp3"
  ],

  night: [
    "night1.mp3",
    "night2.mp3",
    "night3.mp3"
  ],

  sad: [
    "sad1.mp3",
    "sad2.mp3",
    "sad3.mp3"
  ],

  tired: [
    "tired1.mp3",
    "tired2.mp3",
    "tired3.mp3"
  ],

  miss: [
    "miss1.mp3",
    "miss2.mp3",
    "miss3.mp3"
  ],

  comfort: [
    "comfort1.mp3",
    "comfort2.mp3",
    "comfort3.mp3"
  ]

};

let lastVoice = {};


function playVoice(type) {

  const player = document.getElementById("voicePlayer");
  const message = document.getElementById("voiceMessage");

  if (!player) return;

  const list = voiceMessages[type];

  if (!list || list.length === 0) return;

  let selected;

  // Prevent same voice twice in a row
  do {
    selected =
      list[Math.floor(Math.random() * list.length)];
  } while (
    list.length > 1 &&
    selected === lastVoice[type]
  );

  lastVoice[type] = selected;

  player.src = selected;
  player.currentTime = 0;

  player.play();

  if (message) {

    const descriptions = {
      morning: "A little morning kiss for you. ☀️💋",
      night: "A little goodnight message for you. 🌙💋",
      sad: "You don't have to go through everything alone. 🫂",
      tired: "Come rest for a little while. 😴❤️",
      miss: "I know you miss me... so I'm here. 💌",
      comfort: "Come here. You could use a little comfort. 🫂❤️"
    };

    message.innerText =
      descriptions[type] || "A little message for you. ❤️";
  }
}


/* ================================
   🎂 BIRTHDAY MODE
================================ */

function activateBirthdayMode() {

  const birthday = document.getElementById("birthdayMode");

  if (!birthday) return;

  birthday.classList.remove("hidden");

  createBirthdaySparkles();

  startShootingStars();

  setTimeout(() => {
    birthday.classList.add("active");
  }, 50);
}

function createBirthdaySparkles() {

  const container =
    document.getElementById("birthdaySparkles");

  if (!container) return;

  // Prevent duplicates
  if (container.children.length > 0) return;

  for (let i = 0; i < 60; i++) {

    const sparkle = document.createElement("div");

    sparkle.classList.add("birthday-sparkle");

    sparkle.style.left =
      Math.random() * 100 + "%";

    sparkle.style.top =
      Math.random() * 100 + "%";

    sparkle.style.animationDuration =
      (2 + Math.random() * 4) + "s";

    sparkle.style.animationDelay =
      Math.random() * 5 + "s";

    const size =
      2 + Math.random() * 4;

    sparkle.style.width = size + "px";
    sparkle.style.height = size + "px";

    container.appendChild(sparkle);
  }
}

function createShootingStar() {

  const container =
    document.getElementById("birthdayShootingStars");

  if (!container) return;

  const star = document.createElement("div");

  star.classList.add("shooting-star");

  /*
    Start from a random position
    near the top/right of the screen
  */

  star.style.left =
    (20 + Math.random() * 80) + "%";

  star.style.top =
    (Math.random() * 60) + "%";

  const duration =
    0.8 + Math.random() * 0.8;

  star.style.animationDuration =
    duration + "s";

  container.appendChild(star);

  /*
    Remove after animation
  */

  setTimeout(() => {
    star.remove();
  }, duration * 1000);
}
let shootingStarInterval;

function startShootingStars() {

  createShootingStar();

  shootingStarInterval =
    setInterval(() => {

      createShootingStar();

    }, 1800 + Math.random() * 2500);
}

function makeWish() {

  const flames =
    document.querySelectorAll(".flame");

  const button =
    document.getElementById("wishButton");

  const message =
    document.getElementById("wishMessage");

  // 🕯️ Blow out candles one by one

  flames.forEach((flame, index) => {

    setTimeout(() => {

      flame.style.animation = "none";

      flame.style.opacity = "0";

      flame.style.transform =
        "translateX(-50%) scale(0)";

    }, index * 120);

  });

  // Wait until the final candle disappears

  setTimeout(() => {

    // 💥 BIRTHDAY BURST

    birthdayBurst();

    birthdayConfetti();

    // 🎉 Button changes

    button.innerText =
      "✨ Wish made...";

    // ❤️ Message

   setTimeout(() => {

  message.innerText =
    "Whatever you wished for, I hope this year brings you closer to it. ❤️";

  message.classList.add("show");

  setTimeout(() => {

    const next =
      document.getElementById("birthdayNext");

    if (next) {
      next.classList.remove("hidden");

      setTimeout(() => {
        next.classList.add("show");
      }, 50);
    }

  }, 1800);

}, 500);
  }, flames.length * 120 + 150);

  button.disabled = true;
}

function birthdayBurst() {

  const container =
    document.getElementById("birthdayBurst");

  if (!container) return;

  const symbols = [
    "✨",
    "✦",
    "✧",
    "💖",
    "🎉",
    "⭐"
  ];

  for (let i = 0; i < 45; i++) {

    const particle =
      document.createElement("div");

    particle.classList.add(
      "burst-particle"
    );

    particle.innerText =
      symbols[
        Math.floor(
          Math.random() * symbols.length
        )
      ];

    const angle =
      Math.random() * Math.PI * 2;

    const distance =
      100 + Math.random() * 300;

    const x =
      Math.cos(angle) * distance;

    const y =
      Math.sin(angle) * distance;

    particle.style.setProperty(
      "--x",
      x + "px"
    );

    particle.style.setProperty(
      "--y",
      y + "px"
    );

    particle.style.setProperty(
      "--rotation",
      (Math.random() * 720 - 360) + "deg"
    );

    particle.style.animationDelay =
      Math.random() * 0.15 + "s";

    container.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 1500);
  }
}

function birthdayConfetti() {

  const container =
    document.getElementById("birthdayConfetti");

  if (!container) return;

  const pieces = 90;

  for (let i = 0; i < pieces; i++) {

    const piece =
      document.createElement("div");

    piece.classList.add(
      "confetti-piece"
    );

    // Random horizontal position

    piece.style.left =
      Math.random() * 100 + "%";

    // Random size

    const width =
      5 + Math.random() * 6;

    const height =
      8 + Math.random() * 10;

    piece.style.width =
      width + "px";

    piece.style.height =
      height + "px";

    // Random drift

    piece.style.setProperty(
      "--drift",
      (Math.random() * 300 - 150) + "px"
    );

    // Random rotation

    piece.style.setProperty(
      "--rotation",
      (Math.random() * 1440 - 720) + "deg"
    );

    // Random speed

    piece.style.animationDuration =
      (2.5 + Math.random() * 2.5) + "s";

    // Slightly different delays

    piece.style.animationDelay =
      Math.random() * 0.8 + "s";

    container.appendChild(piece);

    setTimeout(() => {
      piece.remove();
    }, 6000);
  }
}

function goToBirthdayNext() {

  const content =
    document.querySelector(".birthday-content");

  if (!content) return;

  // Fade current birthday scene out
  content.classList.add("scene-fade-out");

  setTimeout(() => {

    showBirthdayNextScene();

  }, 900);
}
function showBirthdayNextScene() {

  const content =
    document.querySelector(".birthday-content");

  if (!content) return;

  content.innerHTML = `

    <div class="birthday-next-scene">

      <div class="next-scene-icon">
        🎁
      </div>

      <h1>
        There's more...
      </h1>

      <p>
        I made a few little things just for you. ❤️
      </p>

      <div class="birthday-gifts">

        <button
          class="birthday-gift gift-one"
          onclick="openBirthdayGift(1)"
        >
          <span class="gift-icon">🎁</span>
          <span class="gift-label">
            A letter for you
          </span>
        </button>

        <button
          class="birthday-gift"
          onclick="openBirthdayGift(2)"
        >
          <span class="gift-icon">🎁</span>
          <span class="gift-label">
            A surprise
          </span>
        </button>

        <button
          class="birthday-gift"
          onclick="openBirthdayGift(3)"
        >
          <span class="gift-icon">🎁</span>
          <span class="gift-label">
            One more thing...
          </span>
        </button>

      </div>

      <!-- THIS WAS MISSING -->
      <div id="birthdayGiftResult"></div>

    </div>

  `;

  content.classList.remove("scene-fade-out");

  content.classList.add("scene-fade-in");
}
function openBirthdayGift(number, button) {

  console.log("Gift clicked:", number);

  if (number === 2) {
  openBirthdayVoice(button);
  return;
}

if (number === 3) {
  openBirthdayNightSky(button);
  return;
}

if (number !== 1) {
  console.log("This gift is not implemented yet.");
  return;
}

if (!button) {
  console.log("Button not found.");
  return;
}
  const result =
    document.getElementById("birthdayGiftResult");

  if (!result) {
    console.log("birthdayGiftResult does not exist.");
    return;
  }

  // 🎁 Shake the gift

  button.classList.add("opening");

  setTimeout(() => {

    button.classList.remove("opening");
    button.classList.add("opened");

    // 💌 Create envelope

    result.innerHTML = `

  <div class="envelope-wrapper">

    <div class="envelope">

      <div class="envelope-back"></div>

      <div class="letter-paper">

        <div class="letter-content">

          <h2>💌 A letter for you</h2>

          <p>
My beautiful,

Today is your birthday, and I wish I could somehow put into words just how much you mean to me.

You are one of those people who became so important to me that sometimes I don't even know how to explain it. Somehow, your smile can make an ordinary day feel different, and knowing that you're happy genuinely makes me happy too.

More than anything, I want to be someone who adds happiness to your life. Someone who makes you smile when you've had a difficult day, someone you can feel safe with, someone who reminds you that you are loved, appreciated, and never alone.

I don't want to only celebrate you today. I want to celebrate all the little things that make you who you are your heart, your smile, your kindness, your weird little moments, and everything that makes you uniquely you.

I hope this new year of your life brings you beautiful memories, peaceful days, unexpected happiness, and everything you've been wishing for.

And if I can be a small part of making those days better, then that would mean more to me than you probably realize.

So today, I just want you to remember one thing:

You are incredibly special to me.

Happy Birthday, beautiful. ❤️

Now... there's still more waiting for you.
          </p>

          <button
            class="next-present-button"
            onclick="nextBirthdayPresent()"
          >
            Ready for the next present? 🎁
          </button>

        </div>

      </div>

      <div class="envelope-front"></div>

      <div class="envelope-flap"></div>

    </div>

  </div>

`;
    // ✉️ Find the envelope we just created

    const envelope =
      result.querySelector(".envelope-wrapper");

    // ✨ Open it after a short delay

    if (envelope) {

      setTimeout(() => {

        envelope.classList.add("open");

      }, 700);

    }

  }, 650);

}

function nextBirthdayPresent() {

  const letter =
    document.querySelector(".envelope-wrapper");

  if (!letter) return;

  letter.classList.add("letter-closing");

  setTimeout(() => {

    letter.remove();

    const result =
      document.getElementById("birthdayGiftResult");

    if (!result) return;

    result.innerHTML = `

      <div class="next-present">

        <div class="next-present-icon">
          🎁
        </div>

        <h2>
          Ready for the next one?
        </h2>

        <p>
          You thought that was all? ❤️
        </p>

      </div>

    `;

  }, 900);
}

function openBirthdayVoice(button) {

  if (!button) return;

  const result =
    document.getElementById("birthdayGiftResult");

  if (!result) return;

  button.classList.add("opening");

  setTimeout(() => {

    button.classList.remove("opening");
    button.classList.add("opened");

    result.innerHTML = `

      <div class="birthday-voice-card">

        <div class="voice-heart">
          ❤️
        </div>

        <h2>
          A little message for you
        </h2>

        <p class="voice-subtitle">
          Because sometimes I want you to hear
          my voice instead of reading my words.
        </p>


        <div class="birthday-player">

          <div
            id="voiceVisual"
            class="voice-visual"
          >
            🎙️
          </div>


          <button
            id="birthdayVoiceButton"
            class="birthday-play-button"
            onclick="playBirthdayVoice()"
          >
            ▶
          </button>


          <div class="voice-info">

            <span id="birthdayVoiceStatus">
              Press play when you're ready ❤️
            </span>


            <div class="voice-wave">

              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>

            </div>


            <div class="voice-progress">

              <div
                id="birthdayVoiceProgress"
              ></div>

            </div>

          </div>

        </div>


        <div
          id="birthdayVoiceKisses"
          class="birthday-voice-kisses"
        >
        </div>


        <audio
          id="birthdayVoiceAudio"
          preload="metadata"
        ></audio>


        <button
          class="next-present-button"
          onclick="closeBirthdayVoice()"
        >
          Ready for the next present? 🎁
        </button>

      </div>

    `;


    const voices = [

      "birthday1.mp3",
    
    ];


    const randomVoice =
      voices[
        Math.floor(
          Math.random() * voices.length
        )
      ];


    const audio =
      document.getElementById(
        "birthdayVoiceAudio"
      );


    audio.src = randomVoice;


    console.log(
      "Birthday voice:",
      randomVoice
    );


    audio.addEventListener(
      "timeupdate",
      () => {

        if (!audio.duration) return;


        const progress =
          (audio.currentTime /
            audio.duration) * 100;


        const bar =
          document.getElementById(
            "birthdayVoiceProgress"
          );


        if (bar) {

          bar.style.width =
            progress + "%";

        }

      }
    );


    audio.addEventListener(
      "ended",
      () => {

        const playButton =
          document.getElementById(
            "birthdayVoiceButton"
          );


        const status =
          document.getElementById(
            "birthdayVoiceStatus"
          );


        const visual =
          document.getElementById(
            "voiceVisual"
          );


        const wave =
          document.querySelector(
            ".voice-wave"
          );


        if (playButton) {

          playButton.innerText =
            "▶";

        }


        if (status) {

          status.innerText =
            "I hope you smiled listening to that. ❤️";

        }


        if (visual) {

          visual.classList.remove(
            "playing"
          );

        }


        if (wave) {

          wave.classList.remove(
            "playing"
          );

        }


        const kissReward =
          document.getElementById(
            "birthdayVoiceKisses"
          );


        if (kissReward) {

          kissReward.innerHTML =
            "💋💋💋 +10 kisses";

          kissReward.classList.add(
            "kiss-reveal"
          );

        }

      }
    );


  }, 650);

}
function playBirthdayVoice() {

  const audio =
    document.getElementById(
      "birthdayVoiceAudio"
    );

  const button =
    document.getElementById(
      "birthdayVoiceButton"
    );

  const status =
    document.getElementById(
      "birthdayVoiceStatus"
    );

  const visual =
    document.getElementById(
      "voiceVisual"
    );

  const wave =
    document.querySelector(
      ".voice-wave"
    );


  if (!audio) return;


  if (audio.paused) {

    audio.play();


    if (button) {
      button.innerText = "❚❚";
    }


    if (status) {

      status.innerText =
        "Playing something I wanted you to hear... ❤️";

    }


    if (visual) {

      visual.classList.add(
        "playing"
      );

    }


    if (wave) {

      wave.classList.add(
        "playing"
      );
      startSmooches();
    }

  } else {

    audio.pause();


    if (button) {

      button.innerText =
        "▶";

    }


    if (status) {

      status.innerText =
        "Paused ❤️";

    }


    if (visual) {

      visual.classList.remove(
        "playing"
      );

    }


    if (wave) {

      wave.classList.remove(
        "playing"
      );

    }

  }

}
function closeBirthdayVoice() {

  const card =
    document.querySelector(
      ".birthday-voice-card"
    );

  if (!card) return;

  card.classList.add("voice-closing");

  setTimeout(() => {

    card.remove();

  }, 700);
}

function createSmooch() {

  const container =
    document.getElementById(
      "smoochContainer"
    );

  if (!container) return;

  const smooch =
    document.createElement("div");

  smooch.className = "smooch";

  smooch.innerText = "💋";

  const startX =
    Math.random() * 80 + 10;

  const flyX =
    (Math.random() - 0.5) * 180;

  const rotation =
    (Math.random() - 0.5) * 40;

  smooch.style.left =
    startX + "%";

  smooch.style.bottom =
    "20px";

  smooch.style.setProperty(
    "--fly-x",
    flyX + "px"
  );

  smooch.style.setProperty(
    "--rotation",
    rotation + "deg"
  );

  container.appendChild(smooch);

  setTimeout(() => {
    smooch.remove();
  }, 1800);
}
let smoochInterval = null;

function startSmooches() {

  stopSmooches();

  createSmooch();

  smoochInterval =
    setInterval(() => {

      createSmooch();

    }, 2500);
}

function stopSmooches() {

  if (smoochInterval) {

    clearInterval(
      smoochInterval
    );

    smoochInterval = null;

  }
}

function openBirthdayNightSky(button) {

  const result =
    document.getElementById("birthdayGiftResult");

  if (!result) return;

document.body.insertAdjacentHTML(
  "beforeend",
  `

  <div id="birthdayNightSky" class="birthday-night-sky">

    <div class="milky-way"></div>

    <div
      class="night-stars"
      id="nightStars"
    ></div>

    <div
      class="meteor-layer"
      id="meteorLayer"
    ></div>

    <div class="night-moon">
      <div class="moon-shadow"></div>
    </div>

    <div class="night-sky-content">

      <div class="night-sky-title">
        A little piece of the night sky ✨
      </div>

      <div class="night-sky-subtitle">
      

  Make a wish when you see a shooting star. 🌠
</div>

  <button
    type="button"
    class="wish-button"
    onclick="makeFinalWish()"
  >
    I've made my wish ✨
  </button>

</div>
    </div>

  </div>

  `
);

createNightStars();
startPerseids();
}
function createNightStars() {

  const container = document.getElementById("nightStars");

  if (!container) {
    console.log("nightStars container missing");
    return;
  }

  container.innerHTML = "";

  for (let i = 0; i < 260; i++) {

    const star = document.createElement("span");

    star.className = "night-star";

    star.style.left =
      Math.random() * 100 + "%";

    star.style.top =
      Math.random() * 100 + "%";

    const size =
      Math.random() * 2.5 + 0.5;

    star.style.width = size + "px";
    star.style.height = size + "px";

    star.style.animationDelay =
      Math.random() * 5 + "s";

    star.style.animationDuration =
      2 + Math.random() * 4 + "s";

    container.appendChild(star);

    if (i < 6) {

  star.classList.add("special-star");

  star.addEventListener("click", () => {

    revealStarMessage(star);

  });

}
  }

  

  function revealStarMessage(star) {

  const messages = [

    "I hope this year brings you more happiness than you can imagine. ❤️",

    "You deserve so many beautiful moments. ✨",

    "Never forget how special you are. 🌙",

    "I hope you keep finding reasons to smile. 💫",

    "May this year be gentle, exciting and full of beautiful memories. 🌌",

    "Whenever you look at the stars, I hope you remember this little moment. ❤️"

  ];

  const message =
    messages[
      Math.floor(
        Math.random() * messages.length
      )
    ];

  const popup =
    document.createElement("div");

  popup.className = "star-message";

  popup.innerHTML = `

    <div class="star-message-box">

      <div class="star-message-symbol">
        ✨
      </div>

      <p>
        ${message}
      </p>

      <button
        onclick="this.parentElement.parentElement.remove()"
      >
        ✕
      </button>

    </div>

  `;

  document
    .getElementById("birthdayNightSky")
    .appendChild(popup);

}

}
let perseidTimeout = null;

function startPerseids() {

  stopPerseids();

  createPerseidBurst();

}

function createPerseidBurst() {

  const amount =
    Math.floor(Math.random() * 3) + 1;

  for (let i = 0; i < amount; i++) {

    setTimeout(() => {

      createPerseid();

    }, i * (150 + Math.random() * 300));

  }

  const nextBurst =
    800 + Math.random() * 2500;

  perseidTimeout =
    setTimeout(
      createPerseidBurst,
      nextBurst
    );
}


// 👇 OVO TI FALI

function createPerseid() {

  const container =
    document.getElementById("meteorLayer");

  if (!container) return;

  const meteor =
    document.createElement("span");

  meteor.className = "perseid";

  const size =
    Math.random();

  if (size > 0.82) {

    meteor.classList.add("large");

  } else if (size > 0.55) {

    meteor.classList.add("medium");

  }

  meteor.style.left =
    (Math.random() * 120 - 10) + "%";

  meteor.style.top =
    (Math.random() * 55 - 10) + "%";

  meteor.style.animationDuration =
    (0.7 + Math.random() * 1.2) + "s";

  container.appendChild(meteor);

  setTimeout(() => {

    meteor.remove();

  }, 2200);

}


function stopPerseids() {

  if (perseidTimeout) {

    clearTimeout(perseidTimeout);

    perseidTimeout = null;

  }

}

function showFinalDrawing() {

  const sky =
    document.getElementById("birthdayNightSky");

  if (!sky) {
    console.log("Birthday Night Sky nije pronađen.");
    return;
  }

  const finalScene =
    document.createElement("div");

  finalScene.className =
    "birthday-final-scene";

  finalScene.innerHTML = `

    <div class="final-atmosphere"></div>

    <div class="final-hill"></div>

    <div class="final-drawing-wrap">

      <img
        src="Hp1.png"
        class="final-drawing"
        alt=""
      >

    </div>

    <div class="final-message">

  <div class="final-message-line">
    You once gave me a little piece of your heart...
  </div>

  <div class="final-message-line second">
    so I wanted to give you a little piece of mine. ❤️
  </div>

  <div class="final-message-birthday">
    Happy Birthday, my love.
  </div>

  <div class="final-message-memory">
    May we always have nights worth remembering. 🌌
  </div>

</div>
  `;

const originalContent =
  sky.querySelector(".night-sky-content");

if (originalContent) {

  originalContent.style.transition =
    "opacity 1.5s ease";

  originalContent.style.opacity = "0";

}

  sky.appendChild(finalScene);
  
  setTimeout(() => {

  const message =
    finalScene.querySelector(".final-message");

  if (message) {

    message.style.transition =
      "opacity 3s ease";

    message.style.opacity =
      "0";

  }

}, 20000);

}


document.addEventListener("mousemove", (event) => {

  const sky =
    document.getElementById("birthdayNightSky");

  if (!sky) return;

  const x =
    (event.clientX / window.innerWidth - 0.5) * 2;

  const y =
    (event.clientY / window.innerHeight - 0.5) * 2;

  const stars =
    document.getElementById("nightStars");

  const milkyWay =
    sky.querySelector(".milky-way");

  const moon =
    sky.querySelector(".night-moon");

  if (stars) {

    stars.style.transform =
      `translate(${x * 6}px, ${y * 6}px)`;

  }

  if (milkyWay) {

    milkyWay.style.transform =
      `translate(${x * 12}px, ${y * 8}px) rotate(-18deg)`;

  }

  if (moon) {

    moon.style.transform =
      `translate(${x * 4}px, ${y * 4}px)`;

  }

});

console.log("FINAL TEST:", typeof showFinalDrawing);

function makeFinalWish() {

  const sky =
    document.getElementById("birthdayNightSky");

  if (!sky) return;

  const button =
    sky.querySelector(".wish-button");

  if (button) {

    button.disabled = true;

    button.style.pointerEvents =
      "none";

    button.style.opacity =
      "0";

  }

  console.log("Wish made ✨");

}
function makeFinalWish() {

  const sky =
    document.getElementById("birthdayNightSky");

  if (!sky) return;

  const button =
    sky.querySelector(".wish-button");

  if (button) {

    button.style.pointerEvents =
      "none";

    button.style.transition =
      "opacity 1s ease";

    button.style.opacity =
      "0";

  }

  // Give the wish a small moment of silence
  setTimeout(() => {

    createFinalMeteor();

  }, 1200);

}
function createFinalMeteor() {

  const layer =
    document.getElementById("meteorLayer");

  if (!layer) return;

  const meteor =
    document.createElement("span");

  meteor.className =
    "final-meteor";

  meteor.style.left =
    "15%";

  meteor.style.top =
    "22%";

  layer.appendChild(meteor);

  setTimeout(() => {

    meteor.remove();

    setTimeout(() => {

      showFinalDrawing();

    }, 900);

  }, 1800);

}
