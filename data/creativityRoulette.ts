export type CreativityMode = "useful" | "weird" | "wild";

export type CreativityFamily = {
  id: string;
  label: string;
  shortDescription: string;
  longerExplanation: string;
  icon: string;
  accent: string;
  methods: CreativityMethod[];
};

export type CreativityMethod = {
  id: string;
  familyId: string;
  label: string;
  theoryUnderneath: string;
  whyThisHelps: string;
  whenToUse: string;
  watchOut: string;
  sourceConcepts: string[];
  moves: CreativityMove[];
};

export type CreativityMove = {
  id: string;
  label: string;
  modeAffinity: CreativityMode[];
  tryItNow: string;
  promptTemplate: string;
  nextMove: string;
  learnMore: string;
};

const allModes: CreativityMode[] = ["useful", "weird", "wild"];

function move(
  id: string,
  label: string,
  modeAffinity: CreativityMode[],
  tryItNow: string,
  promptTemplate: string,
  nextMove: string,
  learnMore: string
): CreativityMove {
  return { id, label, modeAffinity, tryItNow, promptTemplate, nextMove, learnMore };
}

function method(
  familyId: string,
  id: string,
  label: string,
  theoryUnderneath: string,
  whyThisHelps: string,
  whenToUse: string,
  watchOut: string,
  sourceConcepts: string[],
  moves: CreativityMove[]
): CreativityMethod {
  return {
    id,
    familyId,
    label,
    theoryUnderneath,
    whyThisHelps,
    whenToUse,
    watchOut,
    sourceConcepts,
    moves,
  };
}

export const creativityFamilies: CreativityFamily[] = [
  {
    id: "expand-idea-space",
    label: "Expand Idea Space",
    shortDescription:
      "AI widens possible directions, styles, constraints, alternatives, and conceptual regions without replacing human judgment.",
    longerExplanation:
      "This family treats creativity as navigation through a possibility space. The point is not to ask for more outputs, but to reveal the shape of the space, find under-explored regions, and choose which directions deserve human attention.",
    icon: "spark",
    accent: "#7dd3fc",
    methods: [
      method(
        "expand-idea-space",
        "conceptual-blending",
        "Conceptual Blending",
        "Conceptual blending mixes two knowledge spaces so a third space can emerge. The creative value is in the new relation, not in a decorative mashup.",
        "Blends force distance from your habitual solution. AI can generate many candidate crossings, while you decide which blend has meaning, tension, and use.",
        "Use when your idea feels trapped in one genre, discipline, metaphor, medium, or solution family.",
        "A blend that only borrows surface style will feel gimmicky. Look for a structural transfer that changes what the idea can do.",
        ["Boden combinational creativity", "bisociation", "cross-domain transfer", "human as meaning-maker"],
        [
          move(
            "blend-two-distant-domains",
            "Blend two distant domains",
            ["useful", "weird"],
            "Name your current domain, then pick one distant domain with different rules. Generate ten blends and mark what comes from each side.",
            "Here is my idea: {{topic}}. Blend it with a distant domain that uses very different rules. Give me 10 blends: 3 safe, 4 weird but workable, and 3 almost impossible. For each, identify what came from each domain and what new property appears only in the blend.",
            "Choose one blend whose new property changes the project, then write a one-sentence premise around that property.",
            "AI is useful here because it can quickly propose crossings you would not naturally reach. The creative act is your interpretation: deciding which crossing opens a meaningful new space."
          ),
          move(
            "borrow-a-structure-not-a-surface",
            "Borrow a structure, not a surface",
            ["useful"],
            "Find an unrelated artifact with a strong structure: a recipe, trial, ritual, game, map, menu, or lab protocol. Transfer its structure to your idea.",
            "Here is my idea: {{topic}}. Find 8 unrelated structures I could borrow, such as a courtroom trial, field guide, recipe, museum label, board game, ritual, operating manual, or scientific protocol. For each, show how the structure would reshape the idea without copying its surface style.",
            "Prototype the strongest structure as an outline, wireframe, storyboard, or table of contents.",
            "The guide distinguishes real synthesis from aesthetic decoration. Borrowing structure changes the logic of the work, which usually produces deeper originality than borrowing a look."
          ),
          move(
            "make-the-impossible-blend-partly-real",
            "Make the impossible blend partly real",
            ["wild"],
            "Ask for impossible blends, then rescue one workable mechanism from the strangest one.",
            "Here is my idea: {{topic}}. Create 12 impossible blends with another domain. For each, extract one practical mechanism, rule, interaction, or constraint that could actually be tested in a small prototype.",
            "Turn the rescued mechanism into a 30-minute experiment.",
            "Wild combinations are not valuable because they are strange. They become useful when you harvest a transferable rule and test it in the real project."
          ),
        ]
      ),
      method(
        "expand-idea-space",
        "constraint-bomb",
        "Constraint Bomb",
        "Constraints reshape the topology of a creative space. They close default routes so hidden routes become visible.",
        "Extreme constraints make the model and the human abandon obvious answers. This adds productive friction while preserving intentional direction.",
        "Use when the first solution is plausible but boring, or when the project is over-dependent on budget, polish, screens, or scale.",
        "If the constraint only makes the work worse, change it. The goal is pressure that reveals alternatives, not punishment.",
        ["constraints as topology", "productive friction", "inside-the-box creativity", "search-space expansion"],
        [
          move(
            "stack-three-impossible-constraints",
            "Stack three impossible constraints",
            allModes,
            "Add three extreme constraints: zero budget, no screen, and only 24 hours. Generate versions that preserve the core intention.",
            "Here is my idea: {{topic}}. Generate 10 versions that obey these constraints: zero budget, no screen, and only 24 hours. For each version, explain which assumption it breaks and what new possibility it reveals.",
            "Pick one version that creates useful tension and make the smallest possible sketch of it.",
            "AI can produce many constrained candidates quickly. Your judgment matters because you decide which constraint exposes a better route through the idea space."
          ),
          move(
            "remove-your-favorite-tool",
            "Remove your favorite tool",
            ["weird", "wild"],
            "Take away the medium or tactic you usually rely on, then ask what remains of the idea.",
            "Here is my idea: {{topic}}. Remove the tool, medium, or tactic I am probably relying on most. Generate 8 versions that cannot use it. For each, name the replacement logic and what becomes more interesting because of the loss.",
            "Rewrite your brief so the missing tool becomes a deliberate design rule.",
            "Overreliance can shrink creativity by making the tool's defaults look like your own intent. Removal makes the system visible."
          ),
          move(
            "treat-the-limit-as-the-style",
            "Treat the limit as the style",
            ["useful", "weird"],
            "Choose one annoying limitation and turn it into the visual, narrative, or interaction style of the piece.",
            "Here is my idea: {{topic}}. Identify 6 real limitations in the project. For each, show how the limitation could become a style, rule, narrative device, or audience experience instead of a compromise.",
            "Choose the limitation that creates the clearest identity and write three rules around it.",
            "The guide treats friction as material that pushes back. A limitation can become authorship when you make it explicit and shape it."
          ),
        ]
      ),
      method(
        "expand-idea-space",
        "random-seed-generator",
        "Random Seed Generator",
        "Randomness can interrupt habitual patterns, but it only becomes creative when bounded by intent and interpreted by a human.",
        "Random seeds introduce material outside your current mental loop. The boundary keeps the surprise usable rather than chaotic.",
        "Use when the project is too internally consistent and you need an off-axis starting point.",
        "Do not accept nonsense as novelty. Ask what the random element reveals, then curate ruthlessly.",
        ["bounded randomness", "incubation stimulus", "surprise with control", "human selection"],
        [
          move(
            "combine-nouns-verbs-environments",
            "Combine nouns, verbs, and environments",
            ["weird"],
            "Generate random nouns, verbs, and environments. Combine them into concept seeds without judging them immediately.",
            "Here is my idea: {{topic}}. Give me 12 random nouns, 12 random verbs, and 12 random environments. Force 12 concept seeds by combining one from each list. Keep them odd if needed, then explain the useful creative question each seed raises.",
            "Circle one seed that produces a better question than your current one.",
            "The guide frames randomization as a way to break rigidity. Its value appears when you convert odd associations into questions you can steer."
          ),
          move(
            "harvest-one-nonsense-combination",
            "Harvest one nonsense combination",
            ["wild"],
            "Ask for intentionally nonsensical combinations, then extract the one serious mechanism hidden inside them.",
            "Here is my idea: {{topic}}. Generate 15 nonsense combinations related to this idea. For each, extract a serious mechanism, audience behavior, metaphor, or constraint that could be useful if stripped of the nonsense.",
            "Use the extracted mechanism as a rule for one new version.",
            "Nonsense scenarios are incubation fuel. The human role is not to believe them, but to notice a latent pattern worth developing."
          ),
          move(
            "use-random-images-as-question-marks",
            "Use random images as question marks",
            ["useful", "weird"],
            "Pick three unrelated images or objects near you. Use each as a prompt for a new question about your idea.",
            "Here is my idea: {{topic}}. Imagine three unrelated images: a map, a broken toy, and a weather report. For each image, generate 5 questions it forces me to ask about my idea. Then identify the question most likely to change the project.",
            "Answer the strongest question in writing before generating any more options.",
            "This turns random stimulus into reflection rather than output. The guide treats reflection as the moment when surprise becomes creative."
          ),
        ]
      ),
      method(
        "expand-idea-space",
        "style-adjacency",
        "Style Adjacency",
        "Style adjacency borrows distance from neighboring or opposing practices so your habitual patterns stop dominating.",
        "AI can simulate adjacent voices, genres, and working habits. Comparing them reveals what your own default style repeats.",
        "Use when everything you generate sounds like a cleaner version of what you already do.",
        "Do not confuse imitation with authorship. Use adjacent styles as diagnostic material, then rewrite through your own criteria.",
        ["style distance", "community corpus", "habit disruption", "human voice"],
        [
          move(
            "ask-for-your-opposite-style",
            "Ask for your opposite style",
            ["weird"],
            "Generate versions in your usual style and then in a style that strongly disagrees with your defaults.",
            "Here is my idea: {{topic}}. First infer my likely default style from the idea. Generate 6 versions in that style, then 6 in a maximally different style. For each opposite-style version, explain which habit it breaks.",
            "Borrow one broken habit, not the whole style.",
            "The guide uses other people's styles as a way to widen idea space. The benefit is contrast: you see your defaults clearly enough to revise them."
          ),
          move(
            "borrow-an-outsiders-rhythm",
            "Borrow an outsider's rhythm",
            ["useful", "weird"],
            "Translate your idea using the pacing of an unrelated form: recipe, field note, manifesto, tour, repair log, or game tutorial.",
            "Here is my idea: {{topic}}. Re-express it through 8 unrelated rhythms: recipe, field note, manifesto, walking tour, repair log, museum label, game tutorial, and lab notebook. Explain what each rhythm makes easier to notice.",
            "Keep the rhythm that clarifies the audience's path through the idea.",
            "This is style adjacency at the level of sequence and attention. It changes how the idea unfolds rather than merely how it sounds."
          ),
          move(
            "map-ten-nearby-genres",
            "Map ten nearby genres",
            ["useful"],
            "List adjacent genres or formats, then choose one that stretches the project without snapping it.",
            "Here is my idea: {{topic}}. Map 10 nearby genres, formats, or disciplines that could hold this idea. For each, name what it would emphasize, what it would suppress, and what new audience expectation it would create.",
            "Rewrite the idea as if it belonged to the most promising adjacent genre.",
            "Creative search is shaped by genre rules. Moving one genre over often reveals new variables while keeping enough familiarity to stay usable."
          ),
        ]
      ),
      method(
        "expand-idea-space",
        "search-space-map",
        "Search Space Map",
        "Computational creativity frames creation as movement through a structured space with variables, constraints, paths, and evaluation criteria.",
        "Mapping the space prevents shallow variety. It shows which options are truly different and which are only cosmetic variations.",
        "Use before or after a brainstorm when you need to know whether you explored the territory or circled one corner.",
        "A map is not the work. Do not keep mapping forever; use it to choose the next deliberate move.",
        ["Wiggins search spaces", "Boden exploratory creativity", "latent space", "evaluation criteria"],
        [
          move(
            "name-the-regions-you-keep-revisiting",
            "Name the regions you keep revisiting",
            ["useful"],
            "Cluster your current ideas into regions and identify the region you have over-explored.",
            "Here is my idea: {{topic}}. Map the possibility space. Identify the main dimensions of variation, the regions I have over-explored, the regions I am avoiding, and 5 under-explored regions that could lead to more original work.",
            "Choose one under-explored region and write a prompt designed only for that region.",
            "The model's output may feel infinite, but it is shaped by prompts, defaults, training data, and your assumptions. Mapping makes those shapes visible."
          ),
          move(
            "find-an-under-explored-region",
            "Find an under-explored region",
            ["useful", "weird"],
            "Ask what kind of answer the AI would not naturally produce, then design a route toward it.",
            "Here is my idea: {{topic}}. What types of answers would an AI model produce too easily here? What would it avoid? Propose 8 under-explored regions and one prompt move to reach each region.",
            "Run one prompt that targets the least obvious region.",
            "Originality often depends on exploring a region the system and the user both tend to skip. The route must be designed."
          ),
          move(
            "transform-one-rule-of-the-space",
            "Transform one rule of the space",
            ["wild"],
            "Instead of generating within the current rules, change one rule that defines the project.",
            "Here is my idea: {{topic}}. Identify 10 rules that define its current creative space. For each rule, show what happens if we transform it instead of merely exploring within it. Mark the 3 transformations most likely to create a new kind of project.",
            "Pick one transformed rule and create a before/after brief.",
            "Boden's transformational creativity changes the rules of the space. This move is bigger than variation: it changes what counts as a possible solution."
          ),
        ]
      ),
    ],
  },
  {
    id: "improve-framing",
    label: "Improve Framing",
    shortDescription:
      "AI helps reveal assumptions, change the question, and redefine what the creative problem actually is.",
    longerExplanation:
      "This family slows down the rush to outputs. It treats framing as purpose work: making hidden assumptions visible, rotating stakeholder lenses, and turning a vague stuckness into a sharper brief.",
    icon: "frame",
    accent: "#facc15",
    methods: [
      method(
        "improve-framing",
        "hidden-assumption-audit",
        "Hidden Assumption Audit",
        "A frame carries explicit assumptions, implied assumptions, and quiet beliefs about what is allowed. Surfacing them changes the problem before solving it.",
        "AI can externalize the mental model you are already using, which gives you something to test rather than unconsciously obey.",
        "Use when the problem statement feels obvious, inherited, or suspiciously narrow.",
        "Assumption lists can become sterile. Always convert the audit into one revised question or testable brief.",
        ["mental models", "assumption testing", "preparation phase", "human intent"],
        [
          move(
            "write-the-default-frame",
            "Write the default frame",
            ["useful"],
            "Write your current problem in one plain sentence. Ask AI to separate explicit assumptions, implied assumptions, and what must be true.",
            "Here is my idea: {{topic}}. Convert it into one default problem statement. Then list explicit assumptions, implied assumptions, and what would have to be true for this framing to be correct.",
            "Rewrite the problem by changing the most fragile assumption.",
            "Framing work improves creativity before generation begins. You are not asking for answers yet; you are inspecting the container that will shape every answer."
          ),
          move(
            "find-the-not-allowed-list",
            "Find the not-allowed list",
            ["useful", "weird"],
            "Ask what the current frame treats as impossible, inappropriate, too simple, too slow, or too strange.",
            "Here is my idea: {{topic}}. Identify what this frame treats as not allowed: forbidden audiences, formats, constraints, tones, materials, metrics, or timelines. For each, explain what new possibility opens if it becomes allowed.",
            "Make one formerly forbidden option temporarily legal for a small experiment.",
            "Creative blocks often hide in invisible anti-goals. Naming the forbidden list lets you decide which rule is real and which is inherited."
          ),
          move(
            "ask-what-the-frame-protects",
            "Ask what the frame protects",
            ["weird", "wild"],
            "Interrogate the frame as if it were protecting a fear, habit, stakeholder, or metric.",
            "Here is my idea: {{topic}}. Treat my current framing as a protective strategy. What fear, habit, stakeholder pressure, or metric might it be protecting? Generate 6 alternative frames that protect something more valuable.",
            "Choose the frame that protects intention rather than comfort.",
            "The guide warns that AI can lock you into your own frame. This move asks why the frame exists before accepting it."
          ),
        ]
      ),
      method(
        "improve-framing",
        "stakeholder-swap",
        "Stakeholder Swap",
        "Changing the stakeholder lens changes the goal, constraints, language, and definition of success.",
        "AI can quickly simulate multiple lenses so you see which parts of the problem remain stable and which are frame-dependent.",
        "Use when the idea has an unclear audience, a contested goal, or a hidden power dynamic.",
        "Persona role-play can flatten people into stereotypes. Ask for evidence, tensions, and uncertainties, not caricatures.",
        ["stakeholder lenses", "perspective taking", "collective creativity", "audience interpretation"],
        [
          move(
            "run-five-lenses",
            "Run five lenses",
            ["useful"],
            "Reframe the same challenge from the end user, support person, legal reviewer, competitor, and journalist.",
            "Here is my idea: {{topic}}. Reframe it from five perspectives: end user, customer support, legal or ethics reviewer, competitor, and journalist. For each, change the goal, constraints, fear, and success signal.",
            "Keep the perspective that reveals the highest-stakes misunderstanding.",
            "A problem is not neutral. Stakeholder swapping shows how the same artifact becomes different work in different social contexts."
          ),
          move(
            "invite-the-unintended-audience",
            "Invite the unintended audience",
            ["weird"],
            "Ask how someone outside the intended audience might interpret, misuse, ignore, or unexpectedly value the project.",
            "Here is my idea: {{topic}}. Simulate an unintended audience encountering it. What do they misunderstand, find useful, reject, remix, or worry about? Generate 5 reframes based on that unintended reading.",
            "Decide what to adjust and what misreading you are willing to preserve.",
            "The guide treats interpretation as part of creative responsibility. Unintended audiences help expose blind spots before the work travels."
          ),
          move(
            "use-the-smallest-stakeholder",
            "Use the smallest stakeholder",
            ["wild"],
            "Frame the problem around the person with the least institutional power or the quietest need.",
            "Here is my idea: {{topic}}. Identify the smallest or least powerful stakeholder affected by it. Reframe the creative challenge entirely around their experience, constraints, and agency. Then show what changes in the solution space.",
            "Write a brief that begins with this stakeholder's constraint rather than the project's ambition.",
            "Reframing can change whose agency counts. This is not a moral garnish; it changes what the creative problem is."
          ),
        ]
      ),
      method(
        "improve-framing",
        "problem-reversal",
        "Problem Reversal",
        "Reversal makes the current goal visible by designing the opposite: how to make the problem worse, stranger, or impossible.",
        "When you invert the bad version, you often uncover precise levers for improvement that ordinary solution-seeking misses.",
        "Use when the problem is too familiar and your brain keeps reaching for standard fixes.",
        "Reversal can produce cynical ideas. Keep it diagnostic: the negative design reveals levers; it is not the destination.",
        ["complete problem reversal", "contrarian thinking", "constructive friction", "reframing"],
        [
          move(
            "design-the-worse-version",
            "Design the worse version",
            ["useful", "weird"],
            "Ask how to make the problem dramatically worse, then invert each tactic into a direction.",
            "Here is my idea: {{topic}}. Design how to make this problem dramatically worse. Give me 12 worsening tactics. Then invert each one into a possible creative direction and explain the lever it reveals.",
            "Choose the inverted tactic with the clearest next test.",
            "The guide uses reversal to challenge deep assumptions. Designing failure can reveal the structure of success."
          ),
          move(
            "argue-for-the-opposite-brief",
            "Argue for the opposite brief",
            ["weird"],
            "Write a brief that pursues the opposite of your stated goal and mine it for a useful contradiction.",
            "Here is my idea: {{topic}}. Write the opposite creative brief. Make a serious case for why it could be valuable. Then extract 5 contradictions or tensions that my real brief should address.",
            "Add one useful contradiction to your actual brief.",
            "Oppositional frames create judgment pressure. They keep the model from acting as a yes-machine and make your criteria sharper."
          ),
          move(
            "make-the-taboo-solution-useful",
            "Make the taboo solution useful",
            ["wild"],
            "Generate solutions you would normally reject, then extract the non-taboo kernel from each.",
            "Here is my idea: {{topic}}. Generate 10 taboo, absurd, or unacceptable solution directions. For each, clearly label why it is unacceptable, then extract a safe, ethical, implementable kernel that could improve the real project.",
            "Use one kernel while preserving the boundary that made the original unacceptable.",
            "This keeps wildness inside responsibility. The creative gain comes from extracting a mechanism without importing the harm."
          ),
        ]
      ),
      method(
        "improve-framing",
        "metrics-reframing",
        "Metrics Reframing",
        "What you measure changes what you create. A metric is a hidden creative brief.",
        "AI can propose alternate success signals so you can see how each metric reshapes the solution space.",
        "Use when the project is being judged by a default metric like speed, clicks, polish, novelty, or completion.",
        "Do not optimize for what is easy to count. Some values need qualitative evidence, critique, or interpretation.",
        ["success criteria", "evaluation functions", "values in optimization", "explicit criteria"],
        [
          move(
            "swap-the-success-metric",
            "Swap the success metric",
            ["useful"],
            "Change the metric from output quality to learning, trust, delight, accessibility, or responsible use.",
            "Here is my idea: {{topic}}. Propose 8 alternative success metrics beyond obvious quality or speed. For each metric, explain how the creative problem changes and what new solution becomes possible.",
            "Pick one metric and rewrite the brief around it.",
            "The guide ties evaluation to creativity. A better metric does not only judge the work; it creates different work."
          ),
          move(
            "optimize-for-a-human-signal",
            "Optimize for a human signal",
            ["weird"],
            "Replace a quantitative metric with a human signal like relief, curiosity, confidence, agency, or memorability.",
            "Here is my idea: {{topic}}. Replace the default success metric with five human signals: relief, curiosity, confidence, agency, and memorability. For each, generate one reframed question and one testable creative move.",
            "Test the signal with one person, not a dashboard.",
            "Not all meaningful creative criteria are easy to measure. Naming a human signal keeps optimization connected to experience."
          ),
          move(
            "name-what-must-not-be-optimized",
            "Name what must not be optimized",
            ["wild"],
            "List qualities that should resist optimization: ambiguity, slowness, difficulty, weirdness, authorship, or care.",
            "Here is my idea: {{topic}}. Identify 8 qualities that should not be optimized away. For each, explain what damage would happen if we optimized it and what boundary should protect it.",
            "Add one protected quality to the evaluation rubric.",
            "The guide warns that optimization can remove the soul of the work. Boundaries protect values that matter but are easy to flatten."
          ),
        ]
      ),
      method(
        "improve-framing",
        "ai-role-swap",
        "AI Role Swap",
        "Reframing includes deciding what role the AI is allowed to play: assistant, critic, dissenter, evaluator, performer, infrastructure, or documentation partner.",
        "Changing the AI role changes your agency. The same model can make you a requester, editor, conductor, critic, or system designer.",
        "Use when you are asking AI to make something before deciding what relationship you actually need.",
        "Do not let the most convenient role become the default. Some roles make you passive; choose the role that strengthens your authorship.",
        ["creative agency", "Jennings autonomy", "interface roles", "human as curator"],
        [
          move(
            "six-role-reframe",
            "Run six AI roles",
            ["useful"],
            "Ask AI to reframe the project as assistant, critic, dissenter, historian, systems designer, and audience.",
            "Here is my idea: {{topic}}. Do not generate the final artifact. Reframe the creative problem through six AI roles: assistant, critic, dissenter, historian, systems designer, and audience. For each, explain what becomes possible and what becomes risky.",
            "Choose the role that clarifies your intention rather than the one that produces fastest.",
            "The guide argues that AI creativity is a relationship among person, system, interface, criteria, and responsibility. Role choice shapes that relationship."
          ),
          move(
            "make-ai-a-dissenter",
            "Make AI a dissenter",
            ["weird"],
            "Instead of asking for help, ask the AI to say no to your premise and explain what that refusal teaches.",
            "Here is my idea: {{topic}}. Act as a dissenting collaborator. Say no to the premise in three serious ways: practical, artistic, and ethical. Then propose one revised frame that keeps my intention but answers the dissent.",
            "Adopt the dissent that improves the brief without erasing your purpose.",
            "Dissent creates productive friction. It keeps co-creation from becoming a polite stream of agreeable outputs."
          ),
          move(
            "turn-the-ai-into-infrastructure",
            "Turn the AI into infrastructure",
            ["wild"],
            "Reframe the AI as a workflow, checklist, archive, critic, or comparison system rather than an output generator.",
            "Here is my idea: {{topic}}. Reframe AI from generator to creative infrastructure. Propose 6 ways it could support the process through prompts, comparison, critique, documentation, templates, or version tracking without making the artifact for me.",
            "Build one small infrastructure piece before generating another output.",
            "The strongest use of AI often scales the loop, not the final artifact. Infrastructure keeps the human active across the whole process."
          ),
        ]
      ),
    ],
  },
  {
    id: "structure-creativity",
    label: "Structure Creativity",
    shortDescription:
      "AI helps turn creativity into a staged process with rules, constraints, methods, reflection loops, and verification.",
    longerExplanation:
      "This family treats creativity as practice, not mood. It uses stages, tools, roles, and systems to prevent one-shot generation and keep preparation, incubation, illumination, verification, and documentation in play.",
    icon: "grid",
    accent: "#c084fc",
    methods: [
      method(
        "structure-creativity",
        "four-stage-creative-loop",
        "Four-Stage Creative Loop",
        "Wallas's preparation, incubation, illumination, and verification model helps keep AI inside a human creative process instead of replacing the process.",
        "The loop prevents the weakest pattern: ask for an output and stop. Each stage gives AI a different job and gives you a different decision.",
        "Use when you are rushing from vague prompt to polished output.",
        "Do not fake incubation by asking for instant insight. Sometimes the best AI move is to produce stimulus, then pause.",
        ["preparation", "incubation", "illumination", "verification", "reflection loop"],
        [
          move(
            "assign-ai-one-job-per-stage",
            "Assign AI one job per stage",
            ["useful"],
            "Run the project through four stages: clarify, stimulate, vary, verify. Do not let AI do the same job in every stage.",
            "Here is my idea: {{topic}}. Run a four-stage creative loop. Preparation: sharpen the problem and constraints. Incubation: give me provocations, not solutions. Illumination: expand one promising spark into variants. Verification: critique with explicit criteria and propose tests.",
            "Complete only the preparation stage first, then decide whether the frame is good enough.",
            "Structure makes the AI a scaffold. It turns generation into one stage inside a larger loop of intention, surprise, evaluation, and revision."
          ),
          move(
            "pause-after-provocation",
            "Pause after provocation",
            ["weird"],
            "Ask for metaphors, opposites, analogies, and constraints, then stop before generating solutions.",
            "Here is my idea: {{topic}}. Give me 20 provocations that do not solve it: 5 metaphors, 5 opposite statements, 5 weird constraints, and 5 analogies from unrelated domains. End with three reflection questions and no solutions.",
            "Take a 10-minute walk or write by hand before choosing one provocation.",
            "Incubation needs stimulus and time. The guide warns that frictionless tools can skip the bad, slow, fertile part of thinking."
          ),
          move(
            "verify-before-polish",
            "Verify before polish",
            ["useful", "wild"],
            "Before asking for a cleaner version, ask what would make the concept fail, mislead, or become generic.",
            "Here is my idea: {{topic}}. Before polishing it, verify it. Critique the concept for clarity, novelty, usefulness, feasibility, ethical risk, and audience fit. End with 3 experiments that could test it this week.",
            "Run one tiny test, then revise one criterion before revising the artifact.",
            "Polish can hide weak thinking. Verification turns taste into evidence and keeps craft connected to explicit criteria."
          ),
        ]
      ),
      method(
        "structure-creativity",
        "scamper-pass",
        "SCAMPER Pass",
        "SCAMPER uses seven structured lenses: Substitute, Combine, Adapt, Modify, Put to other use, Eliminate, and Rearrange.",
        "It creates divergence without losing the anchor. You explore systematically around an existing thing instead of drifting into random novelty.",
        "Use when you have a current draft, product, lesson, scene, idea, or service that needs more directions.",
        "SCAMPER can produce too many shallow tweaks. Mark which ideas are merely cosmetic and which break a real assumption.",
        ["structured divergence", "rules and tools", "assumption breaking", "anchored variation"],
        [
          move(
            "run-seven-lenses",
            "Run seven lenses",
            ["useful"],
            "Apply each SCAMPER lens and ask which assumption each idea breaks.",
            "Here is my idea: {{topic}}. Run SCAMPER. For Substitute, Combine, Adapt, Modify, Put to other use, Eliminate, and Rearrange, generate 4 ideas. Mark one as most plausible and one as most original for each lens, and explain the assumption each breaks.",
            "Pick one plausible idea and one original idea, then hybridize them.",
            "The structure forces perspective changes. AI supplies options; you select which lens produced real movement."
          ),
          move(
            "eliminate-the-comfort-piece",
            "Eliminate the comfort piece",
            ["weird"],
            "Use the Eliminate lens to remove the most comfortable feature, section, claim, or design move.",
            "Here is my idea: {{topic}}. Use only the Eliminate lens. Identify 10 things I might remove: features, claims, steps, visuals, assumptions, or flourishes. For each removal, explain what becomes clearer, stranger, or riskier.",
            "Remove one element from the next prototype and see what improves.",
            "Elimination is structured friction. It can reveal the core intention by taking away the parts that make the work feel safe."
          ),
          move(
            "rearrange-the-sequence",
            "Rearrange the sequence",
            ["wild"],
            "Use the Rearrange lens to scramble the order of the experience, argument, interface, or workflow.",
            "Here is my idea: {{topic}}. Use the Rearrange lens to create 8 alternate sequences. Begin with the ending, reveal the constraint first, put critique before explanation, or make the user choose before they understand. Explain what each order changes.",
            "Test the sequence that creates the most useful curiosity.",
            "Structure is meaning. Rearranging sequence changes attention, causality, and what the audience believes the work is about."
          ),
        ]
      ),
      method(
        "structure-creativity",
        "morphological-matrix",
        "Morphological Matrix",
        "Morphological analysis breaks a complex problem into dimensions and explores combinations across those dimensions.",
        "It prevents brainstorming from becoming vibes. You build a design space, then sample from it deliberately.",
        "Use when your project has multiple interacting variables like audience, tone, format, medium, constraint, and evaluation criteria.",
        "A matrix can create combinations that are technically different but not meaningful. Ask why each combination matters.",
        ["morphological analysis", "design-space construction", "systematic combinations", "testable options"],
        [
          move(
            "build-the-dimensions",
            "Build the dimensions",
            ["useful"],
            "Ask AI to identify six to eight dimensions of variation and populate each with options.",
            "Here is my idea: {{topic}}. Build a morphological matrix with 6 to 8 dimensions. For each dimension, list 8 options, including at least 2 wild options. Then generate 12 high-potential combinations and explain why each is interesting.",
            "Choose three combinations that are meaningfully different and sketch each one.",
            "The matrix makes the search space explicit. It lets you compare combinations instead of hoping a single prompt lands well."
          ),
          move(
            "force-a-contradictory-combo",
            "Force a contradictory combo",
            ["weird", "wild"],
            "Pick options from the matrix that seem incompatible and ask how they could coexist.",
            "Here is my idea: {{topic}}. Create a morphological matrix, then deliberately combine options that seem incompatible. Give me 8 contradictory combinations and explain what new rule would make each one coherent.",
            "Prototype the contradiction whose new rule feels most generative.",
            "Contradictions reveal hidden assumptions in the system. Making one coherent can transform the creative space."
          ),
          move(
            "find-the-most-testable-combo",
            "Find the most testable combo",
            ["useful"],
            "After generating combinations, ask which can be tested fastest without losing the learning goal.",
            "Here is my idea: {{topic}}. Generate 12 morphological combinations. Score each for novelty, intent fit, feasibility, and speed of learning. Identify the 3 most testable combinations and propose a quick prototype for each.",
            "Build the smallest test for the highest-learning combination.",
            "The guide connects structure to verification. A matrix becomes creative practice when it feeds experiments, not just options."
          ),
        ]
      ),
      method(
        "structure-creativity",
        "six-thinking-hats",
        "Six Thinking Hats",
        "Six Thinking Hats separates facts, emotions, risks, benefits, creativity, and process control so critique does not collapse into argument.",
        "AI can hold multiple hats in sequence, forcing perspective changes and making team judgment more explicit.",
        "Use when an idea is being evaluated too quickly, too politely, or from only one angle.",
        "Do not let the AI's hats become authority. Treat each hat as structured input for human decision-making.",
        ["parallel thinking", "role prompts", "structured evaluation", "perspective switching"],
        [
          move(
            "run-hats-in-order",
            "Run hats in order",
            ["useful"],
            "Evaluate the idea through White, Red, Black, Yellow, Green, and Blue hats.",
            "Here is my idea: {{topic}}. Run Six Thinking Hats in order: White, Red, Black, Yellow, Green, Blue. For each hat, ask 5 questions, give 6 concise observations, and end with what we need to know next. In Blue Hat, summarize decisions and open questions.",
            "Choose one open question and turn it into a test.",
            "The hats structure disagreement. They prevent one loud criterion from pretending to be the whole evaluation."
          ),
          move(
            "make-the-black-hat-earn-it",
            "Make the Black Hat earn it",
            ["weird"],
            "Ask for risks, but require evidence, conditions, and mitigations so critique stays constructive.",
            "Here is my idea: {{topic}}. Use only the Black Hat. Identify 10 risks, but for each include the evidence that would confirm it, the condition where it matters, and one mitigation that does not flatten the idea.",
            "Mitigate one risk while preserving one risky strength.",
            "Critique is creative when it sharpens the work. A lazy risk list kills ideas; a structured risk pass improves them."
          ),
          move(
            "let-green-hat-break-the-meeting",
            "Let Green Hat break the meeting",
            ["wild"],
            "After a rational evaluation, force a Green Hat pass that breaks the current agreement.",
            "Here is my idea: {{topic}}. Assume the team has converged too early. Use the Green Hat to generate 12 disruptive alternatives that keep the core intention but break the current plan. Then use Blue Hat to decide which disruption deserves a test.",
            "Test one disruption before finalizing the plan.",
            "Premature convergence is a common AI creativity failure. This move reopens the space without abandoning process."
          ),
        ]
      ),
      method(
        "structure-creativity",
        "five-layer-creative-system",
        "Five-Layer Creative System",
        "Strong AI creative practice includes intent, material, system, evaluation, and documentation layers.",
        "The five layers make the workflow legible. They show where the human decides, where the system acts, and where criteria and evidence live.",
        "Use when the project feels like a magic-box prompt rather than an authored process.",
        "Do not over-document every micro-step. Capture decisions that affect meaning, authorship, criteria, and risk.",
        ["intent layer", "material layer", "system layer", "evaluation layer", "documentation layer"],
        [
          move(
            "map-the-five-layers",
            "Map the five layers",
            ["useful"],
            "Describe your project as five layers: intent, material, system, evaluation, and documentation.",
            "Here is my idea: {{topic}}. Turn it into a five-layer AI creative system. Define the intent layer, material layer, system layer, evaluation layer, and documentation layer. Identify which layer is weakest and how to strengthen it.",
            "Strengthen the weakest layer before producing more outputs.",
            "The guide argues that AI creativity is a relationship among person, system, material, critique, and responsibility. The layers keep that relationship visible."
          ),
          move(
            "separate-human-and-ai-decisions",
            "Separate human and AI decisions",
            ["useful", "weird"],
            "List which decisions are human, which are AI-assisted, and which must never be delegated.",
            "Here is my idea: {{topic}}. In the five-layer system, list human decisions, AI-assisted decisions, and decisions that must not be delegated. Explain why each boundary matters for authorship and quality.",
            "Move one important decision back to the human side of the workflow.",
            "Agency is designed. Naming decision boundaries prevents the tool from quietly becoming the author of the criteria."
          ),
          move(
            "stress-test-the-system-layer",
            "Stress-test the system layer",
            ["wild"],
            "Ask how changing the model, interface, prompt format, dataset, or workflow would change the project.",
            "Here is my idea: {{topic}}. Stress-test the system layer. How would the work change if the AI were a chat, canvas, agent, rule system, classifier, archive, or critic? For each system form, name the human role it creates.",
            "Choose the system form that gives you the strongest agency.",
            "The guide's research layer emphasizes interface design. Different systems make you behave differently, and that changes the creative result."
          ),
        ]
      ),
    ],
  },
  {
    id: "synthesis-sensemaking",
    label: "Synthesis & Sensemaking",
    shortDescription:
      "AI helps organize, connect, cluster, translate, and interpret material so the user can make meaning.",
    longerExplanation:
      "This family treats synthesis as meaning-making, not summary. It helps students turn raw material into themes, tensions, stories, translations, and decisions while preserving human point of view.",
    icon: "weave",
    accent: "#5eead4",
    methods: [
      method(
        "synthesis-sensemaking",
        "theme-clustering",
        "Theme Clustering",
        "Clustering groups material into meaningful regions, but the cluster names and boundaries are interpretive choices.",
        "AI can compress large material into candidate themes while you decide what each theme means and what does not belong.",
        "Use when you have notes, quotes, ideas, references, or feedback that feel abundant but shapeless.",
        "A cluster is not an insight. Push beyond labels into tensions, evidence, and implications.",
        ["6C synthesis loop", "clustering", "traceability", "sensemaking"],
        [
          move(
            "cluster-with-boundaries",
            "Cluster with boundaries",
            ["useful"],
            "Ask for themes with definitions, inclusions, exclusions, and supporting evidence.",
            "Here is my idea: {{topic}}. Cluster my raw material into 6 to 10 themes. For each theme, name it, define it, list what fits and what does not fit, and give examples of evidence I should look for.",
            "Rename one theme in your own words and remove one item that does not truly belong.",
            "The guide warns against AI mush. Boundaries and evidence keep clustering from becoming a vague summary."
          ),
          move(
            "name-themes-like-an-editor",
            "Name themes like an editor",
            ["weird"],
            "Ask for theme names that are vivid, precise, and tied to a point of view.",
            "Here is my idea: {{topic}}. Generate 12 possible theme names like a sharp magazine editor would. For each, explain the point of view it implies and what it might distort.",
            "Choose the name that clarifies a tension, not the one that sounds prettiest.",
            "Naming is interpretation. A strong label can reveal the argument your material is trying to make."
          ),
          move(
            "find-the-orphan-note",
            "Find the orphan note",
            ["wild"],
            "Look for the piece of material that refuses to fit the clusters, then ask what it knows.",
            "Here is my idea: {{topic}}. After clustering the material, identify the orphan note, odd example, or misfit that does not belong anywhere. Explain three ways it could challenge or improve the whole synthesis.",
            "Make the orphan note the center of one alternate synthesis.",
            "Misfits are often where sensemaking becomes creative. They resist the average and force a sharper interpretation."
          ),
        ]
      ),
      method(
        "synthesis-sensemaking",
        "insight-ladder",
        "Insight Ladder",
        "An insight ladder moves from observation to interpretation to implication to creative opportunity.",
        "AI can help separate what you saw from what you think it means, reducing the temptation to jump straight to solutions.",
        "Use when you have raw findings but no clear 'so what.'",
        "Do not let the model invent evidence. Keep observations traceable and mark uncertainty.",
        ["observation to implication", "decision memo", "reflection", "traceable synthesis"],
        [
          move(
            "climb-observation-to-opportunity",
            "Climb from observation to opportunity",
            ["useful"],
            "Take three observations and ladder each into interpretation, implication, and design opportunity.",
            "Here is my idea: {{topic}}. Build an insight ladder. For 6 likely observations, write: observation, interpretation, implication, creative opportunity, and what evidence would strengthen or falsify it.",
            "Pick one opportunity and write a testable question.",
            "Synthesis is not summarization. It is deciding what the material means for action."
          ),
          move(
            "separate-signal-from-story",
            "Separate signal from story",
            ["weird"],
            "Ask which parts are evidence, which parts are interpretation, and which parts are a story you may be imposing.",
            "Here is my idea: {{topic}}. Separate the signal from the story. List possible evidence, my likely interpretation, alternative interpretations, and what I might be overclaiming.",
            "Revise the insight so it states uncertainty honestly.",
            "The guide treats human meaning-making as central. This move protects that meaning from becoming unsupported certainty."
          ),
          move(
            "turn-surprise-into-so-what",
            "Turn surprise into so what",
            ["wild"],
            "Ask what surprised you, then force that surprise into an implication.",
            "Here is my idea: {{topic}}. Generate a 'what surprised me' list. For each surprise, explain why it matters, what assumption it breaks, and what creative move it suggests.",
            "Choose one surprise and make it the premise of a small prototype.",
            "Surprise is raw material. It becomes creative when it changes what you do next."
          ),
        ]
      ),
      method(
        "synthesis-sensemaking",
        "contradiction-map",
        "Contradiction Map",
        "Contradictions reveal where different truths, needs, or values collide. Mapping them makes decisions sharper.",
        "AI can surface tensions across notes, ideas, or stakeholder needs, then propose ways both sides could be true under different conditions.",
        "Use when your material contains conflict, mixed feedback, or competing goals.",
        "Do not rush to resolve every contradiction. Some tensions are the point of the work.",
        ["contrast step", "tradeoffs", "hidden assumptions", "productive tension"],
        [
          move(
            "map-claims-in-tension",
            "Map claims in tension",
            ["useful"],
            "List claims that pull against each other and ask what condition would make each one true.",
            "Here is my idea: {{topic}}. Build a contradiction map. List claims, goals, or audience needs that are in tension. For each tension, explain how both sides could be true under different conditions and what creative tradeoff it implies.",
            "Turn the strongest tension into a design principle.",
            "Sensemaking becomes useful when it preserves tension long enough to make a better decision."
          ),
          move(
            "make-a-two-by-two-of-conflict",
            "Make a two-by-two of conflict",
            ["weird"],
            "Choose two important tensions and build a 2x2 matrix that reveals four possible creative positions.",
            "Here is my idea: {{topic}}. Identify two major tensions and build a 2x2 matrix from them. Name the four quadrants, describe the kind of project each would produce, and mark the quadrant with the most fertile contradiction.",
            "Prototype a concept from the quadrant you would normally avoid.",
            "A matrix can turn conflict into a map. It helps you see positions, not just pros and cons."
          ),
          move(
            "protect-the-good-contradiction",
            "Protect the good contradiction",
            ["wild"],
            "Find a contradiction that should remain alive because it gives the work energy.",
            "Here is my idea: {{topic}}. Identify 5 contradictions in the project. Which one should not be resolved because it gives the work energy, ambiguity, or critical force? Suggest ways to protect it without making the work confusing.",
            "Write the contradiction as a deliberate creative rule.",
            "Not every ambiguity is a flaw. The guide treats meaning as something humans shape; sometimes that means preserving a useful tension."
          ),
        ]
      ),
      method(
        "synthesis-sensemaking",
        "narrative-spine",
        "Narrative Spine",
        "A narrative spine turns scattered material into a sequence: status quo, disruption, struggle, breakthrough, and new normal.",
        "AI can propose arcs, but you decide which arc carries the argument, emotional movement, or learning path.",
        "Use when you need to present research, a concept, a lesson, or a process clearly.",
        "A clean story can oversimplify. Keep one complication visible so the synthesis stays honest.",
        ["narrative arc", "argument to scenario to representation", "decision narrative", "coherence"],
        [
          move(
            "build-the-five-beat-spine",
            "Build the five-beat spine",
            ["useful"],
            "Write the idea as status quo, disruption, struggle, breakthrough, and new normal.",
            "Here is my idea: {{topic}}. Create a narrative spine with five beats: status quo, disruption, struggle, breakthrough, and new normal. For each beat, name the evidence, emotion, and decision it should carry.",
            "Turn the spine into a one-page outline or storyboard.",
            "A spine gives material direction. It helps the audience understand why the pieces belong together."
          ),
          move(
            "start-with-the-disruption",
            "Start with the disruption",
            ["weird"],
            "Begin the story at the moment the old frame breaks, not with background.",
            "Here is my idea: {{topic}}. Rewrite the narrative spine so it starts with the disruption. Give me 5 openings that make the audience feel the problem before explaining it.",
            "Test the opening on one reader and ask what they think the project is about.",
            "Sequence changes attention. Starting with disruption can make the frame shift felt rather than merely explained."
          ),
          move(
            "make-the-audience-cross-a-threshold",
            "Make the audience cross a threshold",
            ["wild"],
            "Design the spine as an experience where the audience must change position or make a choice.",
            "Here is my idea: {{topic}}. Turn the narrative spine into an experiential threshold. Where does the audience begin, what choice or realization must they cross, and what new responsibility do they hold afterward?",
            "Add one interaction, question, or reveal that creates the threshold.",
            "Narrative is not only explanation. It can create a shift in agency, which is central to strong AI creativity pedagogy."
          ),
        ]
      ),
      method(
        "synthesis-sensemaking",
        "cross-modal-translation",
        "Cross-Modal Translation",
        "Cross-modal translation moves meaning across text, image, sound, data, gesture, space, or world.",
        "AI can produce translations across modalities, but synthesis comes from deciding what survived, disappeared, changed, or was invented.",
        "Use when your material feels stuck in one medium or when you need to discover its sensory or structural qualities.",
        "Translation can hallucinate meaning. Track what the system invented and decide whether to keep it.",
        ["media conversion", "intermodality", "semantic preservation", "human curation"],
        [
          move(
            "translate-into-three-modalities",
            "Translate into three modalities",
            ["useful", "weird"],
            "Translate the idea into image, sound, movement, space, data, or story, then compare what changes.",
            "Here is my idea: {{topic}}. Translate it into three different modalities. For each translation, identify semantic qualities, emotional qualities, structural qualities, and sensory qualities that are preserved, lost, changed, or invented.",
            "Keep one invented quality and reject one seductive distortion.",
            "The guide's research layer treats synthesis as integration across media. Translation teaches what the idea depends on."
          ),
          move(
            "make-a-hybrid-form",
            "Make a hybrid form",
            ["weird"],
            "After translating, combine the strongest discoveries into one hybrid format.",
            "Here is my idea: {{topic}}. Translate it into three modalities, then propose 5 hybrid forms that combine the strongest discoveries. For each, name what the hybrid lets the audience understand that the original medium did not.",
            "Sketch the hybrid's first 30 seconds, first screen, or first page.",
            "A hybrid form is not novelty for novelty's sake. It should make a relation visible that one medium alone hides."
          ),
          move(
            "track-what-disappears",
            "Track what disappears",
            ["wild"],
            "Focus on what gets lost during translation and make that loss a creative clue.",
            "Here is my idea: {{topic}}. Translate it into a very different medium, then list what disappears: context, tone, evidence, intimacy, scale, ambiguity, or agency. For each loss, explain what it reveals about the original idea.",
            "Choose one loss to protect in the next version.",
            "Loss is useful diagnostic material. It tells you what qualities are essential rather than decorative."
          ),
        ]
      ),
    ],
  },
  {
    id: "prototype-iterate",
    label: "Prototype & Iterate",
    shortDescription:
      "AI accelerates the verification loop by helping users create versions, test assumptions, analyze feedback, and revise.",
    longerExplanation:
      "This family treats AI speed as useful only when it creates learning. The goal is to move from output iteration to learning loops: artifact, prompt, criteria, system, and documentation.",
    icon: "loop",
    accent: "#fb7185",
    methods: [
      method(
        "prototype-iterate",
        "prototype-sprint",
        "Prototype Sprint",
        "A prototype tests a learning goal, not your ego. AI can multiply versions cheaply so you can compare before committing.",
        "Fast prototypes turn vague taste into evidence. The important choice is what each version is meant to teach.",
        "Use when an idea sounds promising but remains untested, abstract, or overbuilt.",
        "Do not generate dozens of versions without a learning goal. Volume without criteria becomes noise.",
        ["prototype multiplication", "verification loop", "low fidelity", "learning goal"],
        [
          move(
            "prototype-the-learning-goal",
            "Prototype the learning goal",
            ["useful"],
            "Write the one thing this prototype must teach before deciding its format.",
            "Here is my idea: {{topic}}. Define the learning goal for a low-fidelity prototype. Then propose 8 prototype formats that could test it in under 2 hours, with what each would reveal and what it would not reveal.",
            "Build the prototype that teaches the most with the least polish.",
            "The guide warns against treating speed as creativity. Speed matters when it shortens the path to evidence."
          ),
          move(
            "make-a-set-not-an-answer",
            "Make a set, not an answer",
            ["useful", "weird"],
            "Generate a small set of contrasting prototypes across meaningful dimensions.",
            "Here is my idea: {{topic}}. Generate a set of 12 prototype variants across meaningful dimensions: tone, structure, audience, medium, interaction, and risk level. Include one intentionally wrong extreme to test the boundary.",
            "Compare the set, then combine two variants that teach different things.",
            "AI's strength is producing comparisons. Human judgment improves when there is a set to evaluate rather than one polished suggestion."
          ),
          move(
            "prototype-the-wrong-extreme",
            "Prototype the wrong extreme",
            ["wild"],
            "Create one version that is intentionally too much, too small, too slow, too physical, or too strange.",
            "Here is my idea: {{topic}}. Design 8 wrong-extreme prototypes: too small, too large, too slow, too fast, too physical, too minimal, too social, and too strange. For each, explain what boundary it would test.",
            "Test one wrong extreme as a provocation, not a final direction.",
            "Wrong extremes create useful boundary knowledge. They can reveal the conditions under which an idea still works."
          ),
        ]
      ),
      method(
        "prototype-iterate",
        "assumption-test",
        "Assumption Test",
        "Experimentation turns creative bets into testable questions with hypotheses, methods, signals, and decisions.",
        "AI can help articulate assumptions and draft lightweight protocols, but humans interpret what the evidence means.",
        "Use when everyone is debating opinions and no one has named what must be true.",
        "Do not retrofit success after the fact. Define the signal before the test.",
        ["hypothesis", "measurement", "test/control", "causal learning"],
        [
          move(
            "name-what-must-be-true",
            "Name what must be true",
            ["useful"],
            "List the assumptions that must hold for the idea to work and choose the riskiest one.",
            "Here is my idea: {{topic}}. List 12 assumptions that must be true for it to work. Rank them by risk and uncertainty. For the top 3, define a small test, success signal, failure signal, and decision rule.",
            "Run the riskiest test before improving the artifact.",
            "Testing assumptions keeps iteration from becoming polish. You learn whether the idea deserves more craft."
          ),
          move(
            "pre-register-the-signal",
            "Pre-register the signal",
            ["useful"],
            "Before testing, decide what evidence would count as success, failure, or ambiguity.",
            "Here is my idea: {{topic}}. Design a lightweight test. Before suggesting improvements, define what would count as success, failure, and ambiguous evidence. Include qualitative and quantitative signals.",
            "Write the success signal on the prototype before showing it to anyone.",
            "The guide links experimentation to measurement. Pre-registering signals protects you from telling a convenient story after the result."
          ),
          move(
            "test-the-uncomfortable-assumption",
            "Test the uncomfortable assumption",
            ["weird", "wild"],
            "Find the assumption you most want to avoid testing and design the smallest safe test for it.",
            "Here is my idea: {{topic}}. Identify the assumption I am probably avoiding because it might kill the idea. Design a tiny, ethical test for it, including who to ask, what to show, what to measure, and how to respond if it fails.",
            "Run the test or simulate it honestly with a skeptic persona.",
            "Creative integrity includes letting evidence push back. An uncomfortable test can save weeks of beautiful work on a weak premise."
          ),
        ]
      ),
      method(
        "prototype-iterate",
        "feedback-compression",
        "Feedback Compression",
        "Feedback compression turns messy critique into themes, contradictions, missing segments, and ranked revision plans.",
        "AI can synthesize feedback quickly, but you must preserve traceability and avoid averaging away sharp minority signals.",
        "Use after critique sessions, user tests, classroom reviews, or stakeholder notes.",
        "Do not let compression erase the unusual comment that changes everything. Track outliers separately.",
        ["feedback synthesis", "segmentation", "revision plan", "traceability"],
        [
          move(
            "cluster-critique-into-actions",
            "Cluster critique into actions",
            ["useful"],
            "Group feedback into themes, contradictions, and concrete revision actions.",
            "Here is my idea: {{topic}}. Compress feedback on this project into: major themes, contradictions, missing evidence, audience segments, outlier comments, and a ranked revision plan. Keep each action tied to the signal that supports it.",
            "Choose one revision that addresses a pattern and one that preserves an outlier insight.",
            "The guide's synthesis loop applies to feedback too. Compression should make critique actionable without making it bland."
          ),
          move(
            "find-what-you-did-not-test",
            "Find what you did not test",
            ["weird"],
            "Ask which audience, condition, edge case, or question your feedback failed to cover.",
            "Here is my idea: {{topic}}. Based on likely feedback, identify what I did not test: missing users, contexts, edge cases, assumptions, accessibility issues, or ethical concerns. Propose 5 follow-up tests.",
            "Run the follow-up test that could most change the direction.",
            "Feedback can create false confidence if the sample is narrow. Asking what is missing keeps iteration honest."
          ),
          move(
            "compress-without-obeying",
            "Compress without obeying",
            ["wild"],
            "Ask AI to summarize feedback and then separate what to obey, question, reinterpret, or reject.",
            "Here is my idea: {{topic}}. Compress the feedback, but do not assume all feedback should be obeyed. Separate it into: obey, question, reinterpret, reject, and test further. Explain the creative rationale for each category.",
            "Reject one piece of feedback for a principled reason and document why.",
            "Human judgment stays final. Feedback is material for revision, not a democratic command."
          ),
        ]
      ),
      method(
        "prototype-iterate",
        "version-ladder",
        "Version Ladder",
        "A version ladder moves from safer to bolder to weirder variants while preserving a core intention.",
        "AI can expand a promising spark into controlled variations so you can see how far the idea can travel.",
        "Use when you have one good seed but do not know its range.",
        "Do not ladder versions if the core intention is unclear. First name what must stay intact.",
        ["illumination variants", "core intention", "safer bolder weirder", "controlled expansion"],
        [
          move(
            "make-safe-bold-weird",
            "Make it safe, bold, and weird",
            allModes,
            "Generate variants in three temperature bands while preserving the essence.",
            "Here is my idea: {{topic}}. Generate 12 variants while keeping the essence intact: 4 safer, 4 bolder, and 4 weirder. For each, give a one-sentence concept, one risk, and what stays constant.",
            "Choose one version from each band and compare what each teaches.",
            "This keeps surprise steerable. You explore distance without losing the core."
          ),
          move(
            "ladder-one-element-at-a-time",
            "Ladder one element at a time",
            ["useful"],
            "Change only one variable across versions so you can see what actually matters.",
            "Here is my idea: {{topic}}. Create a version ladder by changing only one variable at a time: audience, medium, tone, constraint, scale, or participation. Explain what each change reveals.",
            "Keep the variable that creates the biggest improvement with the least confusion.",
            "Controlled variation turns iteration into learning. If every variable changes at once, you cannot tell what caused the improvement."
          ),
          move(
            "push-until-it-breaks",
            "Push until it breaks",
            ["wild"],
            "Keep exaggerating one promising version until it fails, then step back one notch.",
            "Here is my idea: {{topic}}. Pick the most promising direction and push it through 8 increasingly extreme versions until it breaks. For each stage, name what improves, what fails, and the last version before failure.",
            "Prototype the last version before failure.",
            "Creative range is learned at the edge. Breaking the idea on purpose reveals its load-bearing parts."
          ),
        ]
      ),
      method(
        "prototype-iterate",
        "four-loop-documentation",
        "Four-Loop Documentation",
        "Advanced iteration changes not only the artifact, but also the prompt, criteria, system, and documentation.",
        "Documenting four loops helps you see whether you are improving the work or merely regenerating it.",
        "Use when you have many versions but little clarity about what changed.",
        "Documentation should serve learning, not bureaucracy. Capture decisions, rejected directions, and criteria shifts.",
        ["output iteration", "prompt iteration", "criteria iteration", "system iteration", "evaluation-driven rejection"],
        [
          move(
            "classify-your-last-five-iterations",
            "Classify your last five iterations",
            ["useful"],
            "Sort recent changes into artifact, prompt, criteria, or system iteration.",
            "Here is my idea: {{topic}}. Analyze my last five iterations. Do not suggest new outputs yet. Identify whether I am iterating the artifact, the prompt, the criteria, or the system. Tell me where I am stuck and what kind of iteration I have not tried.",
            "Try the missing type of iteration next.",
            "The guide's research layer says beginners often iterate outputs and prompts only. Strong practice also revises criteria and systems."
          ),
          move(
            "document-one-rejected-direction",
            "Document one rejected direction",
            ["weird"],
            "Write down why a rejected version was wrong and what it taught.",
            "Here is my idea: {{topic}}. Help me document one rejected direction. What was wrong, what was interesting, what assumption did it test, what did I learn, and what rule or criterion should change because of it?",
            "Add the lesson to your next prompt or rubric.",
            "Evaluation-driven rejection is not failure. It is how the creator and system learn the shape of the space."
          ),
          move(
            "revise-the-system-not-the-output",
            "Revise the system, not the output",
            ["wild"],
            "Instead of asking for a better artifact, change the workflow, interface, roles, or evidence path.",
            "Here is my idea: {{topic}}. Do not improve the output. Improve the creative system. Change the workflow, AI role, prompt sequence, critique method, documentation artifact, or decision gate. Propose 5 system revisions and what each would change.",
            "Implement one system revision before generating again.",
            "The strongest loop revises the system itself. That is how AI becomes creative infrastructure rather than a nicer autocomplete."
          ),
        ]
      ),
    ],
  },
  {
    id: "co-creation-collaboration",
    label: "Co-creation & Collaboration",
    shortDescription:
      "AI becomes a working partner, critic, persona panel, collaborator, or decision-support companion while the human remains curator and author.",
    longerExplanation:
      "This family focuses on the working relationship: who holds taste, agency, accountability, critique, and memory. It helps students design collaboration instead of passively receiving outputs.",
    icon: "table",
    accent: "#60a5fa",
    methods: [
      method(
        "co-creation-collaboration",
        "human-as-curator-loop",
        "Human-as-Curator Loop",
        "The creative value of AI output depends on what the human selects, combines, rejects, edits, and documents.",
        "This loop keeps the human in stewardship mode: setting intent, curating material, reflecting on surprise, and tightening the next move.",
        "Use whenever the model's output starts to feel like the answer.",
        "Curation is not passive liking. You need criteria and reasons, or you are just picking what feels familiar.",
        ["human as curator", "stewardship", "input not output", "reflection and friction"],
        [
          move(
            "label-why-you-keep-it",
            "Label why you keep it",
            ["useful"],
            "Generate options, then require a reason for every kept, combined, or discarded piece.",
            "Here is my idea: {{topic}}. Generate 12 diverse directions. Then create a curator table with columns: keep, combine, discard, why, what human edit is needed, and what criterion each decision serves.",
            "Make one hybrid from two kept pieces and write the selection rationale.",
            "The guide says the value is what you do with what comes back. Curation makes authorship visible."
          ),
          move(
            "ask-what-the-model-optimized-for",
            "Ask what the model optimized for",
            ["weird"],
            "Inspect the output as if it reveals the model's defaults, not the truth.",
            "Here is my idea: {{topic}}. Generate 8 directions, then infer what the model seems to be optimizing for: polish, commonness, safety, novelty, clarity, drama, or convenience. What did it ignore?",
            "Rewrite the prompt to reward one ignored value.",
            "AI outputs are shaped by defaults. Seeing those defaults helps you steer instead of obey."
          ),
          move(
            "make-curation-the-artifact",
            "Make curation the artifact",
            ["wild"],
            "Turn the selection process, rejected options, and criteria into part of the final work.",
            "Here is my idea: {{topic}}. Design a version where the curation process is visible to the audience. Show rejected options, decision criteria, edits, and why the final version survived. Make the process readable without becoming a wall of text.",
            "Choose one process trace to expose in the final presentation.",
            "When AI blurs authorship, the visible act of curation can become a credible creative contribution."
          ),
        ]
      ),
      method(
        "co-creation-collaboration",
        "multi-persona-panel",
        "Multi-Persona Panel",
        "A persona panel simulates cognitive diversity: editor, skeptic, audience, expert, ethicist, or average reader.",
        "AI can give you multiple lenses quickly, but you synthesize which critiques align with your intention.",
        "Use when you need feedback but only have one mind in the room.",
        "Personas can become stereotypes. Define what each persona is evaluating, not who they supposedly are.",
        ["persona feedback", "thinking hats", "cognitive diversity", "stakeholder role-play"],
        [
          move(
            "summon-five-critics",
            "Summon five critics",
            ["useful"],
            "Ask an editor, skeptic, intended audience member, domain expert, and ethicist to critique the same idea.",
            "Here is my idea: {{topic}}. Create a five-persona panel: editor, skeptic, intended audience member, domain expert, and ethicist. Each persona should give 3 useful critiques, 1 thing to preserve, and 1 question I must answer.",
            "Synthesize the panel into three revisions and one non-negotiable to preserve.",
            "The panel adds perspective without handing over authority. You remain the person who decides what matters."
          ),
          move(
            "let-the-average-reader-speak",
            "Let the average reader speak",
            ["useful", "weird"],
            "Add an ordinary audience lens that cares about clarity, effort, and emotional payoff.",
            "Here is my idea: {{topic}}. React as an ordinary audience member encountering this with limited context. What is confusing, compelling, too much work, emotionally flat, or memorable? Then suggest edits that improve clarity without flattening the idea.",
            "Fix one clarity problem while preserving one strange strength.",
            "Creative work often fails at the level of reception. The average-reader lens catches gaps experts may tolerate."
          ),
          move(
            "make-personas-disagree",
            "Make personas disagree",
            ["wild"],
            "Force two personas to critique each other's recommendations before you choose.",
            "Here is my idea: {{topic}}. Create three personas with conflicting priorities. Have each recommend a direction, then have the other two critique that recommendation. End with a synthesis that keeps the productive disagreement visible.",
            "Choose a direction only after naming the disagreement you are accepting.",
            "Good collaboration includes opposition. Persona disagreement creates friction that a single helpful voice cannot."
          ),
        ]
      ),
      method(
        "co-creation-collaboration",
        "ai-to-ai-critique",
        "AI-to-AI Critique",
        "Separating generator, critic, and synthesizer roles creates constructive conflict inside the workflow.",
        "The model can play multiple roles in sequence, but the human must prevent the loop from rationalizing its own output.",
        "Use when your current AI interaction is too agreeable or too linear.",
        "Do not let AI-to-AI debate become theater. Require concrete revisions and human review.",
        ["generator critic synthesizer", "constructive conflict", "oppositional collaborator", "decision support"],
        [
          move(
            "run-generator-critic-rewriter",
            "Run generator, critic, rewriter",
            ["useful"],
            "Separate the roles: one generates, one critiques, one revises, then you decide.",
            "Here is my idea: {{topic}}. Run a Generator -> Critic -> Rewriter loop. Generator proposes 8 directions. Critic identifies weaknesses and missing criteria. Rewriter improves the top 3 while preserving the core intent. End with what the human must decide.",
            "Make the human decision explicit before another loop.",
            "Role separation adds friction to the model's first answer. It turns a polite output into material that has survived pressure."
          ),
          move(
            "make-the-critic-attack-the-generator",
            "Make the critic attack the generator",
            ["weird"],
            "Ask the critic to identify the generator's habits, not just the idea's flaws.",
            "Here is my idea: {{topic}}. Let a generator propose 10 ideas. Then let a critic identify the generator's repeated habits, assumptions, safe moves, and blind spots. Ask the generator to produce 5 ideas that avoid those habits.",
            "Keep the idea that most successfully escapes the first pattern.",
            "The guide warns that AI can produce shallow variety. Critiquing the generator's pattern helps force real diversity."
          ),
          move(
            "add-a-bias-finder-then-alternative-maker",
            "Add a bias finder, then alternative maker",
            ["wild"],
            "Use one role to expose hidden signals and another to generate corrected alternatives.",
            "Here is my idea: {{topic}}. First act as a bias finder: identify hidden assumptions, coded signals, exclusions, and stereotypes. Then act as an alternative maker: propose 6 revised directions that reduce those issues without becoming bland.",
            "Choose one revision that improves responsibility and distinctiveness.",
            "The guide's critique examples show AI can expose patterns the creator misses, then help generate alternatives. The human still evaluates the result."
          ),
        ]
      ),
      method(
        "co-creation-collaboration",
        "collaboration-contract",
        "Collaboration Contract",
        "A collaboration contract defines what AI may help with, challenge, never decide, and help document.",
        "It makes agency practical. Instead of vague co-creation, you set boundaries, criteria, and accountability before the tool starts shaping the work.",
        "Use before significant AI-assisted projects, especially public, graded, commercial, or collaborative ones.",
        "A contract is only useful if you revisit it when the project changes. Do not write it once and forget it.",
        ["agency boundaries", "authorship", "AI may not decide", "documentation"],
        [
          move(
            "write-the-may-may-not-list",
            "Write the may / may not list",
            ["useful"],
            "Define what AI may help with, may challenge, may not decide, and what you must document.",
            "Here is my idea: {{topic}}. Draft a collaboration contract. Include: AI may help me with, AI may challenge me on, AI may not decide, I must document, I will judge success by, and I will disclose or explain AI use by.",
            "Put the contract beside your first prompt and revise it after the first prototype.",
            "The guide turns co-creation into designed responsibility. Boundaries protect both creativity and authorship."
          ),
          move(
            "give-ai-permission-to-challenge",
            "Give AI permission to challenge",
            ["weird"],
            "Add a clause that requires the AI to challenge weak assumptions before helping.",
            "Here is my idea: {{topic}}. Write a collaboration contract where AI must challenge hidden assumptions, ask clarifying questions, and identify risks before producing options. Keep the human as final author and evaluator.",
            "Use the contract as the system prompt for the next work session.",
            "Good collaborators do not only comply. A challenge clause builds productive friction into the relationship."
          ),
          move(
            "define-the-human-signature",
            "Define the human signature",
            ["wild"],
            "Name the qualities that must remain visibly yours: taste, voice, question, risk, evidence, or responsibility.",
            "Here is my idea: {{topic}}. Help me define the human signature of this project. What choices, values, constraints, edits, and risks must remain visibly mine even if AI assists? Turn this into 5 non-negotiable collaboration rules.",
            "Check the next AI output against the five rules.",
            "When tools produce polished material, the human signature can disappear unless it is protected as a design requirement."
          ),
        ]
      ),
      method(
        "co-creation-collaboration",
        "interface-role-audit",
        "Interface Role Audit",
        "Interfaces assign roles. Chat can make you a requester; canvases, graphs, agents, or critique tools can make you an editor, conductor, or system designer.",
        "Auditing the interface reveals whether the workflow increases your agency or nudges you toward passive acceptance.",
        "Use when a tool feels powerful but oddly flattening.",
        "Do not blame yourself for interface defaults, but do not surrender to them either. Redesign the workflow around your role.",
        ["Beyond chat", "interface design", "agency", "workflow roles"],
        [
          move(
            "ask-what-the-interface-makes-you-become",
            "Ask what the interface makes you become",
            ["useful", "weird"],
            "Evaluate whether your AI workflow casts you as requester, editor, curator, conductor, performer, or system designer.",
            "Here is my idea: {{topic}}. Evaluate the AI workflow as a co-creative interface. What role does it give me? What role does it give the AI? Where does it increase my agency, and where does it make me passive?",
            "Change one part of the workflow so you make more visible decisions.",
            "The guide's research layer stresses that interface design affects authorship. What the tool makes easy becomes part of the creative process."
          ),
          move(
            "redesign-beyond-chat",
            "Redesign beyond chat",
            ["wild"],
            "Imagine the same project supported by a canvas, graph, timeline, panel, archive, or agent system instead of a chat box.",
            "Here is my idea: {{topic}}. Redesign the AI interaction beyond chat. Propose 6 interface metaphors: canvas, graph, timeline, critique panel, archive, and agent system. For each, explain how my creative role changes.",
            "Mock the interface metaphor that gives you the best role.",
            "Sometimes the creative breakthrough is not a better prompt. It is a better relationship with the system."
          ),
          move(
            "add-a-comparison-surface",
            "Add a comparison surface",
            ["useful"],
            "Instead of reviewing one output at a time, create a table or wall where versions can be compared by criteria.",
            "Here is my idea: {{topic}}. Design a comparison surface for AI-generated options. Define columns for intent fit, novelty, surprise, usefulness, risk, human edit needed, and decision. Show how 5 options would be compared.",
            "Use the comparison surface before asking for another version.",
            "Comparison supports curation. It keeps options from arriving as isolated temptations."
          ),
        ]
      ),
    ],
  },
  {
    id: "critique-evaluation",
    label: "Critique & Evaluation",
    shortDescription:
      "AI helps turn interesting options into effective ones through rubrics, oppositional critique, bias detection, and explicit criteria.",
    longerExplanation:
      "This family makes judgment visible. It moves from vague taste to criteria: novelty, value, surprise, coherence, intent fit, transformation, human contribution, and ethical clarity.",
    icon: "lens",
    accent: "#f97316",
    methods: [
      method(
        "critique-evaluation",
        "oppositional-collaborator",
        "Oppositional Collaborator",
        "Great collaborators bring opposing ideas and rigorous criticism. AI can be assigned to push back rather than agree.",
        "Opposition forces you to clarify assumptions, strengthen the core, or discover a better direction.",
        "Use when the idea has only received encouragement or generic feedback.",
        "Opposition should improve the work, not perform negativity. Require better variants after objections.",
        ["oppositional collaborator", "critical friend", "assumption critique", "constructive friction"],
        [
          move(
            "steelman-the-skeptic",
            "Steelman the skeptic",
            ["useful"],
            "Ask for the strongest objections, then improvements that preserve the core intent.",
            "Here is my idea: {{topic}}. Act as my toughest collaborator. List the strongest objections to this idea, then propose 3 improved variants that address those objections while keeping the core intent.",
            "Adopt one objection as a design requirement.",
            "Critique becomes creative when it creates a sharper version rather than just lowering confidence."
          ),
          move(
            "argue-from-the-real-world",
            "Argue from the real world",
            ["weird"],
            "Ask how the concept fails when it meets time, attention, institutions, budget, misunderstanding, or fatigue.",
            "Here is my idea: {{topic}}. Argue against it as if your job depends on finding what will fail in the real world. Consider attention, budget, institutions, misunderstanding, maintenance, and ethics. Then propose 5 evolutions.",
            "Pick the evolution that solves a real-world failure without making the idea dull.",
            "The guide values verification. Real-world critique keeps interesting ideas from staying merely interesting."
          ),
          move(
            "create-a-worthy-rival",
            "Create a worthy rival",
            ["wild"],
            "Generate an alternative that achieves the same intention through an opposing strategy.",
            "Here is my idea: {{topic}}. Create a worthy rival: an opposing concept that serves the same intention through a different strategy. Compare the two on novelty, usefulness, risk, audience fit, and ethical clarity.",
            "Steal one strength from the rival or choose it outright.",
            "A rival exposes the contingency of your current solution. It reminds you that the first good answer is not the only path."
          ),
        ]
      ),
      method(
        "critique-evaluation",
        "rubric-scoring",
        "Rubric Scoring",
        "Computational creativity research pushes evaluation beyond 'good' by defining explicit criteria such as novelty, value, surprise, and domain fit.",
        "A rubric makes standards visible enough to revise. It also helps compare options fairly.",
        "Use when choosing among ideas, assessing AI outputs, or preparing a critique.",
        "Rubrics can create false precision. Scores need evidence and should invite revision, not end the conversation.",
        ["Jordanous SPECS", "Boden", "novelty value surprise", "explicit criteria"],
        [
          move(
            "build-a-six-criterion-rubric",
            "Build a six-criterion rubric",
            ["useful"],
            "Score the work on novelty, usefulness, surprise, intent fit, human contribution, and ethical clarity.",
            "Here is my idea: {{topic}}. Build a rubric with novelty, usefulness, surprise, intent fit, human contribution, and ethical/provenance clarity. Score the idea 1 to 5 on each and explain what evidence would justify each score.",
            "Improve the lowest score without damaging the highest score.",
            "The guide's research spine treats criteria as part of creativity. You cannot improve what you refuse to define."
          ),
          move(
            "ask-what-definition-of-creativity-you-are-using",
            "Ask what definition of creativity you are using",
            ["weird"],
            "Before scoring, choose whether creativity means combination, exploration, transformation, usefulness, surprise, or cultural contribution.",
            "Here is my idea: {{topic}}. Before evaluating, ask what definition of creativity fits this project. Compare combinational, exploratory, transformational, usefulness-first, surprise-first, and contribution-first definitions. Then evaluate using the best fit.",
            "State the definition at the top of your critique.",
            "Different definitions reward different work. Choosing the definition prevents vague judgment from pretending to be universal."
          ),
          move(
            "score-the-process-not-only-the-output",
            "Score the process, not only the output",
            ["wild"],
            "Evaluate intention, iteration, rejection, system insight, and documentation alongside the artifact.",
            "Here is my idea: {{topic}}. Evaluate the creative process, not only the output. Score intention clarity, iteration quality, rejected directions, criteria revision, system insight, documentation, and final artifact strength.",
            "Improve one process score before changing the artifact.",
            "AI creative work is often a situated process. The guide argues that the strongest work documents human contribution and system learning."
          ),
        ]
      ),
      method(
        "critique-evaluation",
        "failure-mode-critique",
        "Failure-Mode Critique",
        "A pre-mortem imagines failure before it happens, naming early warning signs and mitigations.",
        "AI can generate failure modes across practical, ethical, audience, and system dimensions that creators may miss.",
        "Use before presenting, shipping, teaching, or scaling an idea.",
        "Do not let failure critique make the work timid. Mitigate risks while preserving the strongest creative move.",
        ["pre-mortem", "early warning signs", "mitigation", "verification"],
        [
          move(
            "write-the-pre-mortem",
            "Write the pre-mortem",
            ["useful"],
            "Assume the project shipped and failed. Ask why, how you would know early, and what to change.",
            "Here is my idea: {{topic}}. Assume we ship this and it fails. Write a pre-mortem with the top 10 failure modes, early warning signs, mitigations, and which creative strength each mitigation must preserve.",
            "Select one mitigation and add it to the next prototype.",
            "A pre-mortem brings verification earlier. It protects the idea from predictable collapse without flattening its character."
          ),
          move(
            "find-the-small-hallucination",
            "Find the small hallucination",
            ["weird"],
            "Look for plausible but false details, claims, references, or assumptions that would be hard to catch.",
            "Here is my idea: {{topic}}. Audit it for small hallucinations or plausible falsehoods: claims, citations, examples, user needs, technical assumptions, and implied evidence. Mark what needs verification before use.",
            "Verify the highest-risk claim using a reliable source or remove it.",
            "The guide treats hallucination as creatively useful in ideation but dangerous near truth claims. Route it safely."
          ),
          move(
            "protect-the-risky-strength",
            "Protect the risky strength",
            ["wild"],
            "Identify the part that is both risky and essential, then mitigate around it rather than deleting it.",
            "Here is my idea: {{topic}}. Identify the risky strength: the element that could fail but also makes the idea distinctive. Propose 6 ways to reduce harm, confusion, or fragility while preserving that strength.",
            "Write a design rule that protects the risky strength.",
            "Not all risk is bad. Creative evaluation should distinguish productive risk from irresponsible risk."
          ),
        ]
      ),
      method(
        "critique-evaluation",
        "bias-blind-spot-audit",
        "Bias / Blind Spot Audit",
        "AI can help expose hidden signals, exclusions, stereotypes, and assumptions that the creator may not notice.",
        "A bias audit expands what you can see, which changes what you can responsibly choose.",
        "Use for educational, public-facing, cultural, social, visual, or user-centered work.",
        "Do not outsource ethics to the model. Treat the audit as prompts for human review and consultation where needed.",
        ["hidden bias", "coded signals", "inclusive critique", "responsible creativity"],
        [
          move(
            "audit-unintended-signals",
            "Audit unintended signals",
            ["useful"],
            "Ask what unintended messages different audiences might read into the concept.",
            "Here is my idea: {{topic}}. Audit it for hidden biases, coded signals, stereotypes, exclusions, and unintended audience readings. Point to specific elements that create the signal and suggest concrete revisions that do not make the idea bland.",
            "Revise one element and explain what signal changed.",
            "The guide's bias-detection examples show critique can reveal assumptions embedded in design choices, not just language."
          ),
          move(
            "ask-who-is-missing",
            "Ask who is missing",
            ["weird"],
            "Identify absent users, contexts, bodies, cultures, languages, abilities, or stakes.",
            "Here is my idea: {{topic}}. Who or what is missing from this frame? Identify absent users, contexts, abilities, cultures, constraints, and consequences. For each absence, explain whether to include it, acknowledge it, or deliberately scope it out.",
            "Add a scope note or revision based on the most important absence.",
            "Responsible creativity includes knowing the limits of the frame. Sometimes the best move is inclusion; sometimes it is honest scope."
          ),
          move(
            "reverse-the-default-body",
            "Reverse the default body",
            ["wild"],
            "Assume the default user is not typical, able-bodied, wealthy, online, fluent, or safe.",
            "Here is my idea: {{topic}}. Re-evaluate it by reversing the default user assumptions: not typical, not able-bodied, not wealthy, not online, not fluent, not safe, or not trusting. What breaks, and what creative possibilities appear?",
            "Pick one reversal and redesign the smallest interaction around it.",
            "Changing the assumed body or context changes the creative problem. This is framing and critique working together."
          ),
        ]
      ),
      method(
        "critique-evaluation",
        "diversity-check",
        "Diversity Check",
        "A diversity check asks whether options are meaningfully distinct or merely variations of one concept.",
        "AI can cluster options, identify overrepresented regions, and propose underexplored alternatives.",
        "Use after generating many ideas, headlines, prototypes, visuals, or strategies.",
        "Do not add diversity as random variety. Each new cluster should expand the space in a meaningful way.",
        ["idea diversity", "cluster analysis", "underexplored regions", "anti-homogenization"],
        [
          move(
            "cluster-and-find-repetition",
            "Cluster and find repetition",
            ["useful"],
            "Group ideas into clusters and identify which cluster is overrepresented.",
            "Here is my idea: {{topic}}. Cluster these options into concept families. Identify which families are overrepresented, which are missing, and which options are duplicates wearing different clothes. Propose 5 ideas from underexplored families.",
            "Replace one duplicate with one underexplored option.",
            "The guide warns that AI can produce shallow variety. Diversity must be evaluated, not assumed."
          ),
          move(
            "force-ten-distinct-categories",
            "Force ten distinct categories",
            ["weird"],
            "Require each option to come from a different conceptual category, not a different wording.",
            "Here is my idea: {{topic}}. Generate 20 concepts from 10 distinct categories, with 2 concepts per category. No repeated structure. For each category, explain what makes it meaningfully different.",
            "Choose two categories that could be combined into a stronger hybrid.",
            "Prompt design shapes the search space. Category constraints keep the model from circling one familiar region."
          ),
          move(
            "measure-the-creative-distance",
            "Measure the creative distance",
            ["wild"],
            "Ask how far each option is from the default and whether distance improves or harms the intention.",
            "Here is my idea: {{topic}}. For 12 possible directions, score creative distance from the default from 1 to 5. Explain whether each distance creates value, confusion, risk, or transformation.",
            "Pick a level-4 option and make it more coherent without reducing its distance.",
            "Distance alone is not originality. The useful question is whether distance opens a meaningful region of the space."
          ),
        ]
      ),
    ],
  },
  {
    id: "friction-serendipity",
    label: "Friction & Serendipity",
    shortDescription:
      "AI introduces productive resistance, failure, weirdness, dissent, and controlled surprise to prevent passive one-shot creation.",
    longerExplanation:
      "This family makes the creative process less frictionless on purpose. It uses reflection gates, wrong outputs, constraints, and failure harvesting so surprise becomes usable material.",
    icon: "zigzag",
    accent: "#22d3ee",
    methods: [
      method(
        "friction-serendipity",
        "failure-harvest",
        "Failure Harvest",
        "Failure can reveal assumptions, textures, rules, and possibilities that polished outputs hide.",
        "AI mistakes or bad drafts become creative material when the human notices, interprets, and develops them.",
        "Use when a generated result seems wrong but oddly interesting.",
        "Do not romanticize every failure. Harvest only the part that opens a useful question or rule.",
        ["failure scaffolding", "skill-building", "evaluation-driven rejection", "productive resistance"],
        [
          move(
            "interview-the-failure",
            "Interview the failure",
            ["useful", "weird"],
            "Take a failed output and ask what it accidentally revealed.",
            "Here is my idea: {{topic}}. Help me harvest a failed AI output. Ask: what was wrong, what was unexpectedly interesting, what assumption did it break, what rule could it become, and what next version would test that rule?",
            "Turn one accidental feature into an intentional constraint.",
            "The guide frames failure as part of creative learning. A bad output can become useful when it teaches the shape of the space."
          ),
          move(
            "make-the-glitch-a-rule",
            "Make the glitch a rule",
            ["wild"],
            "Find one awkward, broken, or misread element and turn it into a deliberate design rule.",
            "Here is my idea: {{topic}}. Imagine an AI output misread the project in 8 ways. For each misread, show how it could become a rule, texture, character, structure, or constraint in a stronger version.",
            "Choose one misread and write the new rule in plain language.",
            "Serendipity becomes creative only when the human develops it. The glitch is not the idea; your rule-making is."
          ),
          move(
            "practice-the-bad-draft",
            "Practice the bad draft",
            ["useful"],
            "Ask for a challenge that forces you to make an imperfect human draft before AI helps.",
            "Here is my idea: {{topic}}. Act as a creative coach. Give me a 3-step challenge: first I make an imperfect draft in 8 minutes, then you critique only structure, then you suggest two targeted rewrites. Do not produce the finished version first.",
            "Do the imperfect draft before reading the rewrite suggestions.",
            "Skipping bad drafts can weaken skill. This move uses AI to scaffold practice rather than bypass it."
          ),
        ]
      ),
      method(
        "friction-serendipity",
        "wrong-but-interesting-output",
        "Wrong-but-Interesting Output",
        "An alternative can be wrong as an answer but valuable as a contrast case that reveals your assumptions.",
        "AI can generate off-axis versions that make familiar choices visible. You then decide what to keep, reject, or test.",
        "Use when all acceptable answers feel predictable.",
        "Wrong outputs are not automatically brave. Ask what they teach and where they remain unusable.",
        ["alternative designs", "contrast case", "surprise engine", "human evaluation filter"],
        [
          move(
            "generate-wrong-on-purpose",
            "Generate wrong on purpose",
            ["weird"],
            "Ask for options that are wrong in interesting ways and explain what each teaches.",
            "Here is my idea: {{topic}}. Generate 12 alternative designs. Half should be wrong on purpose in interesting ways. For each, explain what assumption it violates and what it would teach me if I tested it.",
            "Test one wrong version as a contrast, not a candidate.",
            "The guide's Pixie-style examples show that strange alternatives can critique the original by changing one assumption."
          ),
          move(
            "mine-the-minefield",
            "Mine the minefield",
            ["wild"],
            "Create an alternative that removes the expected source of difficulty and replaces it with a hidden one.",
            "Here is my idea: {{topic}}. Create a minefield version: remove the obvious source of difficulty, drama, or value, then replace it with a quieter hidden structure. Explain what assumption this exposes.",
            "Use the exposed assumption to redesign one key moment.",
            "A counterproposal can function as critique. It shows that the thing you thought was essential may only be habitual."
          ),
          move(
            "ask-what-the-wrong-version-wants",
            "Ask what the wrong version wants",
            ["useful", "weird"],
            "Treat the wrong version as if it has an intention different from yours.",
            "Here is my idea: {{topic}}. Imagine the AI produced a wrong version. Infer what intention that wrong version seems to have. What project would it be good for, and what can I borrow without abandoning my own intention?",
            "Borrow one intention and reject the rest.",
            "Wrongness can reveal neighboring projects. That helps you distinguish your actual intent from the tool's drift."
          ),
        ]
      ),
      method(
        "friction-serendipity",
        "bounded-weirdness",
        "Bounded Weirdness",
        "Good serendipity is surprise inside a boundary: intent, audience, constraint, tone, medium, or ethical line.",
        "Boundaries keep weird options steerable. The result is risk without total randomness.",
        "Use when you want strangeness but cannot afford chaos.",
        "If the boundary is too loose, the output is noise. If it is too tight, the output is only decorative variation.",
        ["surprise with control", "band metaphor", "risk not randomness", "constraints"],
        [
          move(
            "set-the-weirdness-fence",
            "Set the weirdness fence",
            ["weird"],
            "Define what may get weird and what must stay stable.",
            "Here is my idea: {{topic}}. Generate 10 surprising options. The core intention and ethical boundary must stay stable, but the format, metaphor, sequence, or interaction may get weird. Explain why each option is surprising and what keeps it on target.",
            "Choose the weird option with the clearest fence.",
            "The guide says surprise is useful only when the user can steer it. Fences make weirdness usable."
          ),
          move(
            "make-three-risk-bands",
            "Make three risk bands",
            ["useful", "wild"],
            "Generate low-risk, medium-risk, and high-risk versions so you can choose a creative temperature deliberately.",
            "Here is my idea: {{topic}}. Generate 9 versions in three risk bands: low, medium, and high. For each, name what gets riskier, what stays protected, and what I would need to test.",
            "Pick the highest risk band you can responsibly test.",
            "Risk becomes a design variable. You are not passively receiving weirdness; you are choosing a temperature."
          ),
          move(
            "keep-the-core-change-the-world",
            "Keep the core, change the world",
            ["wild"],
            "Move the idea into a strange setting while preserving the central intention.",
            "Here is my idea: {{topic}}. Keep its core intention, but relocate it into five strange worlds: a museum after hours, a classroom with no screens, a repair shop, a courtroom, and a weather system. What changes and what stays true?",
            "Use the world that reveals the strongest hidden structure.",
            "Changing the world around an idea tests whether the intention is robust or only tied to the original context."
          ),
        ]
      ),
      method(
        "friction-serendipity",
        "adversarial-constraint",
        "Adversarial Constraint",
        "An adversarial constraint forces the idea to evolve by making its easiest route unavailable.",
        "The constraint acts like a critical collaborator: it pushes back while leaving room for a better response.",
        "Use when your project keeps choosing the path of least resistance.",
        "Adversarial constraints should be temporary and purposeful. Keep the lesson; drop the constraint if it no longer teaches.",
        ["pushback", "constraints enforcer", "adversarial collaboration", "constructive difficulty"],
        [
          move(
            "ban-the-obvious-move",
            "Ban the obvious move",
            ["useful", "weird"],
            "Identify the most obvious solution pattern and forbid it for one round.",
            "Here is my idea: {{topic}}. Identify the most obvious solution pattern. For one round, ban it completely. Generate 8 alternatives that preserve the intention without using the obvious move, and explain what each alternative teaches.",
            "Revive the obvious move only if it earns its place after comparison.",
            "The obvious route may be correct, but banning it temporarily reveals whether it is a choice or a habit."
          ),
          move(
            "add-an-antagonistic-rule",
            "Add an antagonistic rule",
            ["wild"],
            "Add a rule that directly frustrates your current favorite direction.",
            "Here is my idea: {{topic}}. Propose 8 antagonistic constraints that would force this idea to evolve. For each, explain what it attacks, what it protects, and what new direction might emerge.",
            "Apply one antagonistic rule to your favorite version.",
            "The guide asks for material that pushes back. An antagonistic rule creates that material on purpose."
          ),
          move(
            "make-the-constraint-a-collaborator",
            "Make the constraint a collaborator",
            ["weird"],
            "Personify the constraint as a collaborator with a clear agenda.",
            "Here is my idea: {{topic}}. Turn the main constraint into a collaborator with a strong point of view. What does it demand, refuse, reward, and punish? Generate 6 versions that negotiate with it.",
            "Write one sentence beginning: 'The constraint wants...'",
            "Personifying a constraint makes its creative pressure easier to understand and use."
          ),
        ]
      ),
      method(
        "friction-serendipity",
        "reflection-gate",
        "Reflection Gate",
        "A reflection gate delays output until the user has clarified assumptions, criteria, and intent.",
        "This restores the back-and-forth that one-shot generation removes and keeps the human actively steering.",
        "Use before generating solutions when the problem is foggy or emotionally rushed.",
        "Do not let the gate become procrastination. After reflection, choose a concrete next move.",
        ["reflection triggers", "questions before output", "one-shot critique", "human steering"],
        [
          move(
            "questions-before-solutions",
            "Questions before solutions",
            ["useful"],
            "Ask for clarifying questions and alternate framings before allowing solutions.",
            "Here is my idea: {{topic}}. Before proposing solutions, ask me 10 clarifying questions that reveal hidden assumptions. Then summarize the real problem in 2 alternative framings. Do not generate solutions yet.",
            "Answer three questions, then choose one framing to test.",
            "Reflection is where surprise becomes thinking. This move prevents the model from solving the wrong problem quickly."
          ),
          move(
            "name-the-optimization-you-have-not-named",
            "Name the optimization you have not named",
            ["weird"],
            "Ask what you are optimizing for without admitting it: approval, speed, novelty, safety, elegance, or control.",
            "Here is my idea: {{topic}}. What am I optimizing for that I have not named? Consider approval, speed, novelty, safety, elegance, control, ease, and impressiveness. For each, explain how it shapes the project.",
            "Decide which hidden optimization to keep and which to resist.",
            "Hidden criteria steer creative work. Naming them puts judgment back in your hands."
          ),
          move(
            "make-intention-harder-but-better",
            "Make intention harder but better",
            ["wild"],
            "Ask for questions that make the project more demanding in a useful way.",
            "Here is my idea: {{topic}}. Create productive friction. Give me 5 ways this project is too safe, 5 ways it could fail interestingly, 5 constraints that would force a new direction, and 5 questions that make my intention harder but better.",
            "Answer the question that makes you least comfortable.",
            "The guide treats friction as an intentional design feature of creative learning. A harder intention can produce a better project."
          ),
        ]
      ),
    ],
  },
  {
    id: "optimization-simulation",
    label: "Optimization & Simulation",
    shortDescription:
      "AI helps explore tradeoffs, simulate scenarios, and navigate constraints while humans define what matters.",
    longerExplanation:
      "This family treats optimization as values work. It helps students define objectives, simulate interpretations, preserve diversity, and avoid optimizing the soul out of the project.",
    icon: "dial",
    accent: "#a3e635",
    methods: [
      method(
        "optimization-simulation",
        "simulation-matrix",
        "Simulation Matrix",
        "Simulation tests a concept across varied users, contexts, constraints, and failure cases before committing.",
        "AI can generate many scenarios, but the validity of the simulation depends on assumptions and criteria.",
        "Use when a concept must work across conditions or audiences.",
        "Simulation is not reality. Treat it as a decision aid that tells you what to test next.",
        ["scenario matrix", "evaluation layer", "assumptions", "stress testing"],
        [
          move(
            "build-thirty-scenarios",
            "Build thirty scenarios",
            ["useful"],
            "Create a matrix that varies user type, environment, constraint, and failure case.",
            "Here is my idea: {{topic}}. Create a simulation matrix of 30 scenarios. Vary user type, environment, constraints, failure cases, and emotional states. For each scenario, define what success, confusion, and failure would look like.",
            "Choose three scenarios that would most change the design if they failed.",
            "The guide frames simulation as a bridge between cool idea and reality. The matrix reveals what your concept assumes."
          ),
          move(
            "simulate-three-audiences",
            "Simulate three audiences",
            ["useful", "weird"],
            "Simulate a friendly audience, skeptical audience, and unintended audience.",
            "Here is my idea: {{topic}}. Simulate three audiences: friendly, skeptical, and unintended. Predict interpretations, confusions, emotional responses, ethical concerns, and possible misreadings. Then name what to adjust and what to preserve.",
            "Adjust one thing for clarity and preserve one intentional ambiguity.",
            "Audience simulation is creative when it changes your decisions without making the work generic."
          ),
          move(
            "simulate-the-weird-edge-case",
            "Simulate the weird edge case",
            ["wild"],
            "Ask for edge cases that are unlikely but revealing.",
            "Here is my idea: {{topic}}. Generate 12 weird edge-case scenarios that would expose hidden assumptions. Include unlikely audiences, hostile contexts, broken tools, inverted incentives, and unexpected uses. Explain what each case teaches.",
            "Test or storyboard the edge case that reveals the biggest assumption.",
            "Edge cases can expose the rules of the system. They are not the average use, but they can reveal design truth."
          ),
        ]
      ),
      method(
        "optimization-simulation",
        "pareto-tradeoff-map",
        "Pareto Tradeoff Map",
        "Creative work rarely has one best answer. Pareto thinking maps options that are strong in different tradeoffs.",
        "AI can compare options across criteria so humans choose what matters for this project, not in the abstract.",
        "Use when options trade off cost, delight, risk, accessibility, clarity, novelty, sustainability, or feasibility.",
        "Do not let the map choose for you. The map clarifies tradeoffs; the human decides values.",
        ["Pareto frontier", "tradeoffs", "human judgment", "multi-criteria evaluation"],
        [
          move(
            "map-the-frontier",
            "Map the frontier",
            ["useful"],
            "Compare options and identify which are strong in different ways rather than naming a single winner.",
            "Here is my idea: {{topic}}. Generate 10 options and map their tradeoffs across novelty, usefulness, feasibility, accessibility, delight, risk, and integrity. Identify the Pareto frontier: options that are best for different value choices.",
            "Choose the option whose tradeoff matches your actual purpose.",
            "The guide argues that humans define what matters. Pareto thinking makes that choice explicit."
          ),
          move(
            "name-what-each-option-sacrifices",
            "Name what each option sacrifices",
            ["weird"],
            "For every strong option, ask what it sacrifices and whether that sacrifice is acceptable.",
            "Here is my idea: {{topic}}. For 8 possible directions, name what each optimizes for and what it sacrifices: clarity, depth, originality, accessibility, pace, cost, trust, or human agency.",
            "Pick one sacrifice you refuse to make and revise the option around it.",
            "Every optimization encodes a sacrifice. Naming the sacrifice keeps values visible."
          ),
          move(
            "choose-a-beautiful-compromise",
            "Choose a beautiful compromise",
            ["wild"],
            "Find an option that is not best on any single metric but creates the most meaningful balance.",
            "Here is my idea: {{topic}}. Identify 5 beautiful compromises: options that are not best on any single metric but balance values in a distinctive way. Explain why each compromise could be more creative than a maximized option.",
            "Prototype the compromise whose balance feels most authored.",
            "Optimization can chase extremes. A well-chosen compromise can express taste, context, and responsibility."
          ),
        ]
      ),
      method(
        "optimization-simulation",
        "objective-function-swap",
        "Objective Function Swap",
        "An objective function is a values machine. Changing it changes the kind of work the system produces.",
        "AI can show how the same project transforms under efficiency-first, experience-first, risk-first, or responsibility-first goals.",
        "Use when the project has inherited a metric that may not match the intention.",
        "The easiest metric may dominate unless you protect harder-to-measure values.",
        ["objective functions", "values machine", "criteria design", "optimization risk"],
        [
          move(
            "try-three-objectives",
            "Try three objective functions",
            ["useful"],
            "Optimize the idea three ways: efficiency-first, experience-first, and artistic-risk-first.",
            "Here is my idea: {{topic}}. Define three optimization strategies: efficiency-first, experience-first, and artistic-risk-first. For each, explain what it would improve, what it would sacrifice, and what kind of work it would produce.",
            "Choose the objective that matches your values, then add one balancing constraint.",
            "Optimization is creative only when the criteria are meaningful. The objective shapes the artifact."
          ),
          move(
            "optimize-for-accessibility-without-flattening",
            "Optimize for accessibility without flattening",
            ["weird"],
            "Ask how to make the work more accessible while preserving depth, ambiguity, or challenge.",
            "Here is my idea: {{topic}}. Optimize it for accessibility without flattening it. Identify what should become clearer, what should remain complex, what support the audience needs, and what tradeoff to avoid.",
            "Add one support structure instead of simplifying the core idea.",
            "Accessibility and depth are not enemies. The creative task is to design support without erasing the work's intelligence."
          ),
          move(
            "optimize-for-productive-ambiguity",
            "Optimize for productive ambiguity",
            ["wild"],
            "Make ambiguity a target, but require that it stays interpretable and responsible.",
            "Here is my idea: {{topic}}. Optimize for productive ambiguity. Show how to increase interpretive richness without causing misinformation, confusion, or ethical drift. Define the boundary between useful ambiguity and bad opacity.",
            "Write the ambiguity boundary as a criterion.",
            "Some creative values resist clean measurement. Naming ambiguity as a criterion lets you protect it intentionally."
          ),
        ]
      ),
      method(
        "optimization-simulation",
        "scenario-stress-test",
        "Scenario Stress Test",
        "Stress tests place the idea under extreme or changing conditions to see what breaks and what adapts.",
        "AI can quickly vary constraints and contexts so you can identify brittle assumptions early.",
        "Use before scaling, publishing, teaching, or investing heavily in a direction.",
        "Stress testing can become fear-based. Balance failure scenarios with adaptation scenarios.",
        ["constraint variation", "failure cases", "resilience", "adaptation"],
        [
          move(
            "test-extreme-conditions",
            "Test extreme conditions",
            ["useful"],
            "Run the concept through severe limits: less time, no budget, skeptical audience, missing data, or platform failure.",
            "Here is my idea: {{topic}}. Stress-test it under extreme conditions: half the time, zero budget, skeptical audience, missing data, platform failure, accessibility constraint, and public criticism. What breaks, what adapts, and what should change?",
            "Fix the brittleness that would most embarrass the project in public.",
            "Stress tests reveal which parts are load-bearing. They make the creative system more resilient."
          ),
          move(
            "simulate-the-opposite-season",
            "Simulate the opposite season",
            ["weird"],
            "Move the idea into an opposite context: different time, mood, market, classroom, culture, or medium.",
            "Here is my idea: {{topic}}. Simulate it in the opposite season or context: different mood, time pressure, audience readiness, cultural setting, medium, or institutional support. What would need to change for it to survive?",
            "Adopt one adaptation that improves the original context too.",
            "Context changes reveal hidden dependencies. A robust idea can travel without losing itself."
          ),
          move(
            "break-the-delivery-system",
            "Break the delivery system",
            ["wild"],
            "Assume the main delivery system fails and redesign around the failure.",
            "Here is my idea: {{topic}}. Assume the main delivery system fails: no platform, no projector, no internet, no budget, no expert facilitator, or no synchronous audience. Generate 8 fallback versions that preserve the intention.",
            "Build the fallback that would still feel intentional.",
            "A fallback can become a better form. Sometimes the constraint exposes a more direct relationship with the audience."
          ),
        ]
      ),
      method(
        "optimization-simulation",
        "values-machine-audit",
        "Values Machine Audit",
        "Optimization systems encode values through objectives, constraints, data, defaults, and evaluation criteria.",
        "Auditing those values prevents the tool from optimizing the wrong thing beautifully.",
        "Use whenever AI is ranking, scoring, selecting, optimizing, or recommending.",
        "Do not treat the audit as moral decoration. Use it to change criteria, data, or decision rights.",
        ["values in systems", "evaluation function", "responsibility", "criteria audit"],
        [
          move(
            "audit-the-values-being-encoded",
            "Audit the values being encoded",
            ["useful"],
            "Ask what values the current criteria encode and what values they ignore.",
            "Here is my idea: {{topic}}. Audit the values encoded by this creative workflow. What does it reward, ignore, penalize, make easy, make hard, and make invisible? Suggest revisions to the criteria and decision process.",
            "Change one criterion and one decision right.",
            "The guide calls optimization a values machine. Values must be designed, not discovered after the system acts."
          ),
          move(
            "identify-the-measurable-trap",
            "Identify the measurable trap",
            ["weird"],
            "Find where measurable criteria might overpower meaningful but harder-to-measure qualities.",
            "Here is my idea: {{topic}}. Identify measurable traps: places where speed, clicks, cost, completion, polish, or simplicity could overpower meaning, trust, learning, ambiguity, or care. Propose protective criteria.",
            "Add one hard-to-measure value to the rubric with evidence examples.",
            "What is easy to measure often wins by default. Creative judgment protects what matters."
          ),
          move(
            "make-the-system-explain-its-taste",
            "Make the system explain its taste",
            ["wild"],
            "Ask the AI to reveal what taste it would apply if it were selecting among options.",
            "Here is my idea: {{topic}}. Imagine an AI system is selecting among options. Make it explain its taste: what patterns it prefers, what it finds risky, what it might undervalue, and where a human should override it.",
            "Define one override rule for human judgment.",
            "AI selection can feel neutral. Asking for its taste makes the hidden aesthetic and value assumptions discussable."
          ),
        ]
      ),
    ],
  },
  {
    id: "scale-capacity",
    label: "Scale Capacity",
    shortDescription:
      "AI helps scale variants, comparisons, workflows, critiques, documentation, and creative infrastructure without scaling genericness.",
    longerExplanation:
      "This family moves beyond producing more. It helps students scale the whole creative loop: generation, evaluation, documentation, collaboration, reusable templates, and quality gates.",
    icon: "stack",
    accent: "#f59e0b",
    methods: [
      method(
        "scale-capacity",
        "variant-factory",
        "Variant Factory",
        "AI can multiply variants, but creative scale requires meaningful dimensions and human selection.",
        "A variant factory expands bandwidth while preserving criteria, diversity, and curation.",
        "Use when you need many options for comparison, segments, tones, media, or prototypes.",
        "More variants can hide shallow repetition. Force dimensions and inspect duplicates.",
        ["capacity scaling", "variant generation", "meaningful dimensions", "human selection"],
        [
          move(
            "generate-by-dimensions",
            "Generate by dimensions",
            ["useful"],
            "Create variants across named dimensions rather than asking for a pile.",
            "Here is my idea: {{topic}}. Generate 30 variants across named dimensions: audience, tone, medium, constraint, risk, and value proposition. Group them by dimension and mark which are truly distinct.",
            "Select one variant per dimension for a comparison round.",
            "Scale is useful when it covers the space. Dimensions prevent the factory from producing the same part repeatedly."
          ),
          move(
            "make-one-hundred-to-five",
            "Make one hundred to five",
            ["useful", "weird"],
            "Generate many rough directions, then gate them down to five with explicit criteria.",
            "Here is my idea: {{topic}}. Design a 100-to-5 workflow: what to generate, how to force diversity, what rubric gates the options, and how humans rewrite the final five.",
            "Run a small 20-to-3 version of the workflow.",
            "The guide frames scale as abundance plus stewardship. The gate is what turns volume into advantage."
          ),
          move(
            "scale-one-strange-seed",
            "Scale one strange seed",
            ["wild"],
            "Take one unusual seed and multiply it across formats, audiences, and constraints.",
            "Here is my idea: {{topic}}. Take one strange seed from this project and scale it into 18 variants across format, audience, constraint, and medium. Keep the seed's weirdness intact, but make each variant usable.",
            "Choose the variant where the seed becomes clearer, not safer.",
            "Scaling can flatten distinctiveness. This move protects the odd quality while testing its range."
          ),
        ]
      ),
      method(
        "scale-capacity",
        "quality-gate",
        "Quality Gate",
        "A quality gate stops scale from amplifying weak, generic, biased, or misaligned outputs.",
        "AI can apply a rubric consistently, but humans set thresholds and inspect edge cases.",
        "Use before moving from many options to serious development.",
        "A gate can become conservative. Include a path for risky options with high learning value.",
        ["quality rubric", "novelty usefulness fit", "review loop", "thresholds"],
        [
          move(
            "build-the-gate",
            "Build the gate",
            ["useful"],
            "Create a gate with criteria, thresholds, and rejection reasons.",
            "Here is my idea: {{topic}}. Build a quality gate for scaled creative options. Criteria: intent fit, novelty, usefulness, distinctiveness, integrity, feasibility, and human edit needed. Define pass, revise, reject, and risky-test thresholds.",
            "Run five options through the gate manually.",
            "Quality gates preserve judgment at scale. They prevent abundance from becoming clutter."
          ),
          move(
            "add-a-risky-test-lane",
            "Add a risky-test lane",
            ["weird"],
            "Create a separate lane for options that fail feasibility but score high on novelty or learning.",
            "Here is my idea: {{topic}}. Design a quality gate with a risky-test lane. Which options should not pass yet but deserve a small experiment because they are novel, surprising, or strategically revealing?",
            "Move one rejected option into a tiny risky test.",
            "Creative gates should not punish all risk. A risky-test lane protects exploration while keeping standards clear."
          ),
          move(
            "gate-for-human-agency",
            "Gate for human agency",
            ["wild"],
            "Reject outputs where the human contribution is invisible or the AI default dominates.",
            "Here is my idea: {{topic}}. Add human agency to the quality gate. How will we tell whether the work shows human intention, selection, revision, criteria, and responsibility? Define evidence for each.",
            "Revise one option so the human decision becomes visible.",
            "The guide treats human contribution as a criterion, not a footnote. Scale should not erase authorship."
          ),
        ]
      ),
      method(
        "scale-capacity",
        "diversity-quota",
        "Diversity Quota",
        "A diversity quota requires non-redundant options before quality selection begins.",
        "It protects against fake breadth, where many outputs are variations of one concept.",
        "Use when generating at volume with models that may converge on common patterns.",
        "Diversity quotas should be conceptual, not tokenistic. Define the dimensions that matter.",
        ["anti-homogenization", "idea diversity", "underexplored clusters", "breadth before convergence"],
        [
          move(
            "require-non-redundant-categories",
            "Require non-redundant categories",
            ["useful"],
            "Set a quota for distinct categories, then check whether each category actually differs.",
            "Here is my idea: {{topic}}. Generate 24 options from 12 non-redundant categories. Before listing options, define the categories and explain how each explores a different region of the possibility space.",
            "Discard any category that is just a renamed duplicate.",
            "The guide warns that AI's impact is limited if outputs are variations of one concept. Quotas force breadth before taste."
          ),
          move(
            "quota-for-roles-not-ideas",
            "Quota for roles, not ideas",
            ["weird"],
            "Ensure the scaled set includes outputs for different creative roles: critic, prototype, story, evidence, constraint, and documentation.",
            "Here is my idea: {{topic}}. Create a diversity quota across creative roles: idea, critique, prototype, evidence, constraint, audience lens, documentation, and risk check. Generate one useful output for each role.",
            "Use the weakest role to guide the next work session.",
            "Scale capacity is not just more concepts. It is more support for the entire creative loop."
          ),
          move(
            "protect-the-rare-cluster",
            "Protect the rare cluster",
            ["wild"],
            "Find a small cluster of unusual options and keep it alive through one iteration.",
            "Here is my idea: {{topic}}. Generate a diverse set, cluster it, and identify the rarest cluster that still fits the intention. Develop that cluster into 5 stronger options instead of letting popularity decide.",
            "Prototype the rare cluster before discarding it.",
            "Rare clusters can hold originality. Scale often hides them under the average unless you protect them."
          ),
        ]
      ),
      method(
        "scale-capacity",
        "workflow-template",
        "Workflow Template",
        "A workflow template makes a good creative loop repeatable without making every output the same.",
        "AI can help document reusable stages, prompts, gates, and decision artifacts so capacity scales responsibly.",
        "Use after you discover a process that works and want to reuse it for future projects or teams.",
        "Templating can freeze yesterday's assumptions. Include revision points and context checks.",
        ["repeatable workflow", "prompt templates", "documentation", "process artifacts"],
        [
          move(
            "template-the-loop",
            "Template the loop",
            ["useful"],
            "Turn a successful creative process into stages, prompts, decisions, and artifacts.",
            "Here is my idea: {{topic}}. Help me turn this into a reusable workflow template. Include intake, framing, generation, critique, prototype, test, revision, documentation, and decision artifacts. Mark what should be customized each time.",
            "Use the template on a smaller project and note where it breaks.",
            "The mature use of AI builds infrastructure. A template scales practice, not just output."
          ),
          move(
            "add-checkpoints-to-the-template",
            "Add checkpoints to the template",
            ["weird"],
            "Insert reflection, diversity, quality, and integrity checkpoints into the workflow.",
            "Here is my idea: {{topic}}. Add checkpoints to the workflow: reflection gate, diversity check, quality gate, bias audit, authorship note, and next experiment. Define the question each checkpoint must answer.",
            "Add one checkpoint before your next generation step.",
            "Checkpoints stop a template from becoming an assembly line. They keep judgment active."
          ),
          move(
            "make-a-template-that-resists-itself",
            "Make a template that resists itself",
            ["wild"],
            "Build a workflow that occasionally challenges its own defaults and asks when not to use it.",
            "Here is my idea: {{topic}}. Design a workflow template that resists itself. Include moments where it asks what assumption the template is imposing, when to break the template, and what alternative process might fit better.",
            "Define one condition that automatically breaks the template.",
            "Good infrastructure includes escape hatches. Otherwise scale turns into generic repetition."
          ),
        ]
      ),
      method(
        "scale-capacity",
        "creative-operating-system",
        "Creative Operating System",
        "A creative operating system coordinates roles, prompts, data, critique, quality gates, documentation, and human decisions.",
        "It scales the whole loop: more variants, better comparisons, clearer criteria, shared memory, and responsible authorship.",
        "Use when a one-off workflow needs to become a course, studio process, team routine, or repeatable practice.",
        "An operating system can overtake the work. Keep the human purpose visible and prune rituals that no longer help.",
        ["creative infrastructure", "scaled loop", "agents and templates", "documentation partner"],
        [
          move(
            "map-the-os",
            "Map the OS",
            ["useful"],
            "Map the creative operating system: inputs, roles, loops, gates, outputs, and documentation.",
            "Here is my idea: {{topic}}. Map a creative operating system for this work. Define inputs, AI roles, human roles, generation loops, critique loops, quality gates, documentation artifacts, and final decision rights.",
            "Build only the smallest useful piece of the OS first.",
            "Scale capacity is strongest when it supports the whole process. The OS makes that process legible."
          ),
          move(
            "separate-delegated-tasks-from-core-judgment",
            "Separate delegated tasks from core judgment",
            ["useful"],
            "List what AI can scale and what must remain human judgment.",
            "Here is my idea: {{topic}}. Separate delegated tasks from core judgment. What can AI draft, scan, compare, critique, or document? What must remain human: meaning, ethics, final taste, criteria, and accountability?",
            "Automate one delegated task and protect one human decision.",
            "The guide distinguishes capacity from responsibility. Scaling the wrong task can make the work faster and worse."
          ),
          move(
            "turn-one-project-into-a-studio-system",
            "Turn one project into a studio system",
            ["wild"],
            "Convert the project into reusable roles, rituals, prompts, and archives for a whole studio or class.",
            "Here is my idea: {{topic}}. Turn this single project into a studio system. Design reusable roles, rituals, prompts, critique formats, archives, version logs, and authorship practices that could support many future projects.",
            "Pilot one ritual with one future project.",
            "The guide's research layer treats infrastructure as a creative contribution. A studio system can be as important as the artifact it produces."
          ),
        ]
      ),
    ],
  },
  {
    id: "integrity-risks",
    label: "Integrity & Risks",
    shortDescription:
      "AI creativity requires authorship, provenance, disclosure, responsibility, verification, and protection against overreliance or homogenization.",
    longerExplanation:
      "This family treats integrity as creative craft. It helps students document contribution, verify claims, draw boundaries, disclose responsibly, and protect skill, voice, and accountability.",
    icon: "seal",
    accent: "#fda4af",
    methods: [
      method(
        "integrity-risks",
        "authorship-story",
        "Authorship Story",
        "AI blurs categories like author, editor, performer, and tool. A strong authorship story explains human intention, selection, revision, and accountability.",
        "Documenting authorship protects creative integrity and helps audiences understand what the human contributed.",
        "Use for public, graded, commercial, collaborative, or portfolio work.",
        "Do not inflate your contribution or hide meaningful system involvement. Credibility comes from specificity.",
        ["authorship", "human contribution", "considerable human input", "process statement"],
        [
          move(
            "separate-human-and-system-contributions",
            "Separate human and system contributions",
            ["useful"],
            "Write a short statement separating your intent, materials, prompts, selections, edits, and final decisions from system outputs.",
            "Here is my idea: {{topic}}. Help me write an authorship story. Separate my contributions from the system's contributions. Identify intent, materials, prompts, selections, rejected directions, edits, criteria, and final responsibility.",
            "Revise the statement until it names concrete decisions, not vague involvement.",
            "The guide treats authorship as practice. The story is stronger when it shows evidence of human judgment over time."
          ),
          move(
            "name-what-is-responsibly-mine",
            "Name what is responsibly mine",
            ["weird"],
            "Ask what you can responsibly claim and what should remain uncertain or attributed to the tool.",
            "Here is my idea: {{topic}}. What can I responsibly claim as mine, what belongs to the AI-assisted process, what is uncertain, and what should I avoid claiming? Make the distinctions plain and audience-appropriate.",
            "Remove one overclaim from your project description.",
            "Integrity includes claim discipline. Strong creative work can acknowledge assistance without becoming less authored."
          ),
          move(
            "make-the-process-visible-without-killing-the-work",
            "Make the process visible without killing the work",
            ["wild"],
            "Design a subtle way to reveal process, decisions, or provenance as part of the presentation.",
            "Here is my idea: {{topic}}. Propose 6 ways to make the AI-assisted process visible without turning the work into a technical appendix. Include light-touch labels, process fragments, version comparisons, and authorship notes.",
            "Add the smallest visible process trace that increases trust.",
            "Process visibility can be aesthetic and pedagogical. It helps the work survive questions about authorship."
          ),
        ]
      ),
      method(
        "integrity-risks",
        "provenance-check",
        "Provenance Check",
        "Provenance tracks source materials, prompts, tools, versions, references, and transformations.",
        "It makes creative claims verifiable and helps detect rights, similarity, hallucination, and attribution risks.",
        "Use before publishing, submitting, selling, or presenting AI-assisted work.",
        "Do not store sensitive private data in provenance notes. Track process without exposing people unnecessarily.",
        ["provenance", "rights posture", "version history", "verification"],
        [
          move(
            "log-the-source-chain",
            "Log the source chain",
            ["useful"],
            "List the materials, tools, prompts, model versions, outputs, and edits that shaped the work.",
            "Here is my idea: {{topic}}. Create a provenance checklist for this AI-assisted project. Include source materials, tools, model names if known, prompt strategy, major outputs, human edits, rejected directions, and verification needs.",
            "Fill in the checklist for the version you are most likely to present.",
            "Provenance is not glamorous, but the guide treats it like resolution or format: necessary for responsible creative work."
          ),
          move(
            "check-for-suspicious-closeness",
            "Check for suspicious closeness",
            ["weird"],
            "Ask what the work might be too close to: a known style, artist, dataset pattern, citation, or existing artifact.",
            "Here is my idea: {{topic}}. Audit for suspicious closeness. What existing styles, artists, works, genres, phrases, claims, or patterns might this resemble too strongly? What checks or revisions would reduce the risk?",
            "Revise one element that relies too heavily on recognizable imitation.",
            "The guide warns that novelty can be an illusion. Similarity checks protect originality and trust."
          ),
          move(
            "verify-before-reality-claims",
            "Verify before reality claims",
            ["useful", "wild"],
            "Separate imaginative material from factual claims and mark what needs verification.",
            "Here is my idea: {{topic}}. Separate imaginative material from factual claims. For every claim about reality, history, science, law, people, data, or outcomes, mark what must be verified and what source type would be appropriate.",
            "Verify or remove the riskiest claim before sharing.",
            "The guide's hallucination section says plausible errors are the dangerous ones. Verification belongs anywhere the work touches reality."
          ),
        ]
      ),
      method(
        "integrity-risks",
        "disclosure-draft",
        "Disclosure Draft",
        "Disclosure explains AI assistance in a way that fits the context, audience, and stakes.",
        "Good disclosure focuses on process, contribution, responsibility, and limits rather than treating AI as a novelty badge.",
        "Use when audiences, institutions, teachers, clients, or collaborators need to understand AI involvement.",
        "Disclosure is contextual. Too little can mislead; too much can distract from the work.",
        ["disclosure posture", "audience trust", "process explanation", "algorithm aversion"],
        [
          move(
            "draft-a-contextual-disclosure",
            "Draft a contextual disclosure",
            ["useful"],
            "Write a short AI-use note tailored to classroom, portfolio, client, or publication context.",
            "Here is my idea: {{topic}}. Draft three AI-use disclosures: one for a classroom submission, one for a public portfolio, and one for a client or collaborator. Each should explain tool role, human contribution, verification, and limits.",
            "Choose the disclosure that matches the actual audience and stakes.",
            "The guide notes that audiences may judge AI-assisted work differently. Disclosure should build trust through clarity, not apology."
          ),
          move(
            "focus-on-human-direction",
            "Focus on human direction",
            ["weird"],
            "Rewrite disclosure around what the human directed, curated, revised, and verified.",
            "Here is my idea: {{topic}}. Rewrite an AI disclosure so it focuses on human direction: intention, constraints, selection, edits, criteria, verification, and responsibility. Avoid making the tool sound like the author.",
            "Add one sentence about what you rejected or changed.",
            "A useful disclosure makes authorship clearer. It names the relationship rather than fetishizing the tool."
          ),
          move(
            "make-disclosure-part-of-the-learning",
            "Make disclosure part of the learning",
            ["wild"],
            "Design a disclosure that teaches the audience how to read the AI-assisted process.",
            "Here is my idea: {{topic}}. Create a disclosure that doubles as a learning note. Explain how AI was used, what it could not decide, what risks were checked, and what the audience should evaluate in the final work.",
            "Place the disclosure where it supports interpretation rather than interrupts it.",
            "In education, disclosure can be pedagogical. It helps viewers evaluate process, not just output."
          ),
        ]
      ),
      method(
        "integrity-risks",
        "no-go-boundary-list",
        "No-Go Boundary List",
        "A no-go list defines styles, data, claims, manipulations, or uses you will not pursue before creative pressure rises.",
        "Precommitting boundaries prevents drift when the tool makes questionable variations easy.",
        "Use before ideation in sensitive, public, persuasive, or identity-related work.",
        "Boundaries should be specific. Vague ethics are easy to negotiate away mid-process.",
        ["ethical boundaries", "style mimicry", "confidential data", "precommitment"],
        [
          move(
            "write-the-boundaries-before-the-prompt",
            "Write boundaries before the prompt",
            ["useful"],
            "List what you will not imitate, invent, disclose, upload, or claim.",
            "Here is my idea: {{topic}}. Write a no-go boundary list before prompting. Include no imitation of living artists, no fabricated citations, no invented testimonials, no confidential data, no deceptive media, and any project-specific boundaries.",
            "Put the boundary list into the next prompt as constraints.",
            "The guide warns that ethical drift gets easier when generation is cheap. Precommitment keeps choices aligned with values."
          ),
          move(
            "identify-the-slippery-variation",
            "Identify the slippery variation",
            ["weird"],
            "Ask which tempting variation would cross a boundary and how to redirect it safely.",
            "Here is my idea: {{topic}}. Identify 8 tempting variations that could slide into plagiarism, manipulation, privacy risk, style appropriation, false evidence, or overclaiming. For each, propose a safe redirection.",
            "Redirect one tempting variation into a safer creative constraint.",
            "Risk often arrives as a small attractive option. Naming slippery variations makes refusal easier."
          ),
          move(
            "turn-the-boundary-into-style",
            "Turn the boundary into style",
            ["wild"],
            "Use a no-go boundary as a creative rule that gives the project identity.",
            "Here is my idea: {{topic}}. Choose one ethical boundary and turn it into a creative style rule. For example: no imitation, no false evidence, no private data, no synthetic testimonials, or no hidden AI labor. Generate 6 project directions shaped by that boundary.",
            "Write the boundary as both an ethics rule and an aesthetic rule.",
            "Integrity can generate form. A boundary is not only a restriction; it can become the project's signature."
          ),
        ]
      ),
      method(
        "integrity-risks",
        "process-appendix",
        "Process Appendix",
        "A process appendix records tools, prompts, source materials, iterations, rejections, human edits, risks, and authorship.",
        "It supports assessment, trust, learning, and future reuse without displaying the whole guide or every prompt in the main experience.",
        "Use for final projects, portfolios, research, classroom submissions, or team handoffs.",
        "Do not create a giant process dump. Curate the appendix around decisions that affected meaning and responsibility.",
        ["AI process appendix", "documentation", "learning journal", "responsible presentation"],
        [
          move(
            "make-the-short-appendix",
            "Make the short appendix",
            ["useful"],
            "Draft a concise appendix with tools, prompt strategy, iterations, rejected directions, human edits, and concerns.",
            "Here is my idea: {{topic}}. Draft a short AI process appendix. Include tools used, prompt strategy, source materials, major iterations, rejected directions, human edits and decisions, ethical or provenance concerns, and final authorship statement.",
            "Trim the appendix to the decisions a reviewer truly needs.",
            "Documentation makes the human process legible. The appendix is where responsibility becomes inspectable."
          ),
          move(
            "document-the-changing-criteria",
            "Document changing criteria",
            ["weird"],
            "Record how your standards changed during the process, not just what outputs changed.",
            "Here is my idea: {{topic}}. Help me document how my criteria changed across the project. What did I originally value, what did feedback or iteration change, and what standards guided the final decision?",
            "Add one paragraph about criteria revision to the appendix.",
            "Strong AI creative work revises criteria as well as artifacts. That change is part of the learning."
          ),
          move(
            "write-the-future-reader-note",
            "Write the future reader note",
            ["wild"],
            "Write a note for someone reviewing the project months later, explaining how to understand the AI-assisted process.",
            "Here is my idea: {{topic}}. Write a future reader note for the process appendix. Explain what the project tried to do, how AI assisted, what was rejected, what remains uncertain, and what future versions should test.",
            "Save the note with the project files or presentation.",
            "The guide frames integrity as what lets creative work survive audiences, institutions, and time. A future reader note extends that care."
          ),
        ]
      ),
    ],
  },
];

export function getAllCreativityMoves() {
  return creativityFamilies.flatMap((family) =>
    family.methods.flatMap((methodItem) =>
      methodItem.moves.map((moveItem) => ({
        family,
        method: methodItem,
        move: moveItem,
      }))
    )
  );
}
