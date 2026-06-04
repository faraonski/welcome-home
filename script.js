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

It’s 170+ reminders that someone out there keeps coming back, keeps thinking, keeps giving little pieces of love in their own way.

And I don’t take that lightly.

If I could explain how much that actually means… I probably still wouldn’t find the right words. But I hope you feel it in the way this place responds to you.

You matter here. More than you think.

And I’m glad you’re here.`;
  }

  if (tier === 2) {
    letter = `Hey you,

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
    letter = `Hey you,

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

  text.innerText = letter;
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
