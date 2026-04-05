// Enhancement 2: Make your own article-content.js (Daily Bugle articles)
const articles = [
    {
        name: "spider-man-menace",
        title: "Spider-Man: Hero or Menace?",
        content: [
            "Once again, the masked vigilante known as Spider-Man has left a trail of destruction across the streets of New York. While some misguided citizens praise him as a hero, the Daily Bugle forces you to ask: who gave him this absolute authority?",
            "Recent footage shows him swinging through midtown, completely disregarding traffic laws and public property. Structural damages to several historical buildings during his latest 'brawl' with local thugs stand as a testament to his recklessness.",
            "J. Jonah Jameson writes: 'This web-slinger operates outside the law, hides his face like a coward, and answers to no one. The city doesn't need masked crusaders; it needs law and order!'"
        ]
    },
    {
        name: "stark-industries-tech",
        title: "Stark Industries Unveils Clean Energy",
        content: [
            "In a stunning press conference today, Tony Stark announced that Stark Industries is completely shifting its focus toward sustainable, clean energy solutions, permanently shutting down its weapons manufacturing division.",
            "The announcement sent shockwaves through Wall Street, causing Stark Industries stock to momentarily dip before rallying behind the promise of the revolutionary Arc Reactor technology.",
            "Experts predict that this pivot could mark the beginning of a golden age in renewable energy, though competitors remain intensely skeptical of Stark's ambitious timeline and mysterious new power source."
        ]
    },
    {
        name: "sokovia-accords-debate",
        title: "The Sokovia Accords: Necessary Oversight?",
        content: [
            "Following the devastating events in Sokovia last month, the United Nations has drafted a resolution known as the Sokovia Accords, aiming to establish an international governing body to oversee and direct the Avengers.",
            "Public opinion is highly polarized. Proponents argue that enhanced individuals possess too much unguided power and must be held accountable for collateral damage. 'We need borders and we need oversight,' said Secretary of State Thaddeus Ross.",
            "Opponents, however, worry that bureaucratic red tape will hinder the Avengers' ability to respond to global crises rapidly. The debate continues as world leaders prepare to vote on the treaty in Vienna."
        ]
    },
    {
        name: "mutants-among-us",
        title: "Reports of Genetic Anomalies Rising",
        content: [
            "Unconfirmed reports of individuals manifesting impossible abilities have been steadily increasing across the country. From a teenager seemingly controlling fire locally to rumors of a man with metallic claws up north, the public is growing restless.",
            "Federal authorities are remaining tight-lipped, but insider sources suggest the creation of a specialized task force to monitor what some are dubbing the 'X-Gene' phenomenon.",
            "Is this the next stage of human evolution, or a dangerous new threat? The Daily Bugle will continue to follow this developing story closely."
        ]
    },
    {
        name: "avengers-rebuilding-ny",
        title: "The Trillion Dollar Cleanup: Rebuilding NY",
        content: [
            "Months after the catastrophic alien invasion, New York City is still picking up the pieces. The newly established Department of Damage Control has taken over recovery operations, displacing local salvage crews and stirring up controversy among the city's working class.",
            "Mayor's office reports indicate that reconstruction efforts are proceeding faster than anticipated, thanks in part to Stark Industries relief funds. However, chunks of extraterrestrial tech remain unaccounted for.",
            "Citizens are urged to immediately report any glowing debris to the authorities. Under no circumstances should unexploded ordinance be handled by civilians."
        ]
    },
    {
        name: "ant-man-speculation",
        title: "Corporate Espionage at Pym Technologies",
        content: [
            "Rumors are swirling around the sudden implosion of the Pym Technologies headquarters last week. While official statements cite a massive gas leak, eyewitnesses claim to have seen a man shrinking to the size of an insect during the collapse.",
            "Darren Cross, former protégé of Hank Pym, remains missing, and the board has scrambled to cover up the disastrous unveiling of their heavily guarded 'Yellowjacket' initiative.",
            "With industrial sabotage suspected, federal investigators are looking into a known cat burglar allegedly connected to the incident. More as this story develops."
        ]
    },
    {
        name: "wakanda-outreach",
        title: "Wakanda Opens Its Borders",
        content: [
            "King T'Challa of Wakanda made a historic address to the United Nations today, pledging to share his nation's vast resources and advanced technology with the rest of the world. For decades, Wakanda portrayed itself as an isolated, third-world farming nation.",
            "The truth is far more complex. Intelligence reports suggest Wakanda is sitting on the world's only deposit of Vibranium, an incredibly versatile and powerful metal.",
            "International markets are already reacting wildly to the prospect of Vibranium integration, while defense contractors are clamoring for exclusive contracts."
        ]
    },
    {
        name: "hulk-sightings",
        title: "Green Goliath Spotted in South America",
        content: [
            "Multiple unverified reports have surfaced placing the elusive Bruce Banner—also known as the Hulk—deep within the favelas of Brazil.",
            "Witnesses described a massive green creature interfering with a local bottling plant standoff. General Ross' forces were purportedly on the scene, though military spokespersons vehemently deny any official operation in the region.",
            "If true, this marks the first confirmed sighting of the Hulk in nearly five months. Local governments are demanding answers from the U.S. State Department."
        ]
    },
    {
        name: "alien-artifacts",
        title: "Black Market Chitauri Tech on the Rise",
        content: [
            "Despite the best efforts of Damage Control, dangerous exotic weaponry is flooding the black market. Modified Chitauri blasters are turning up in local bank heists, giving organized crime syndicates unprecedented firepower.",
            "The NYPD has issued a strong warning to its officers regarding the extreme lethality of these weapons, which easily melt through standard Kevlar.",
            "Authorities are struggling to trace the supply chain, but suspect a heavily organized operation extracting the technology directly from post-battle salvage zones."
        ]
    },
    {
        name: "rhodey-war-machine",
        title: "U.S. Military Unveils 'War Machine'",
        content: [
            "In an effort to rival the private privatization of world security by Iron Man, the United States Air Force has officially rebranded the Mark II armor as the heavily weaponized 'War Machine'.",
            "Piloted by Colonel James Rhodes, the suit was showcased at the Stark Expo amidst controversy, adorned with advanced munitions provided by Hammer Industries.",
            "Many view this as the government firmly asserting its stance that superhuman defenses belong under federal control, not in the hands of erratic billionaires."
        ]
    },
    {
        name: "hammer-tech-scandal",
        title: "Justin Hammer Arrested Amidst Expo Disaster",
        content: [
            "CEO Justin Hammer was taken into federal custody following the disastrous events at the Stark Expo. Hundreds of autonomous drones, supposedly designed for peacekeeping, went rogue and attacked the civilian audience.",
            "Evidence points to Hammer contracting a rogue physicist to build the drones, resulting in a devastating hijacking of the system.",
            "Hammer Industries stock has plummeted 80% overnight, signaling the likely end of the defense contractor's long rivalry with Stark Industries."
        ]
    },
    {
        name: "vision-synthetic-life",
        title: "The Vision: A Debate on Synthetic Life",
        content: [
            "The emergence of an entity known simply as 'The Vision' has sparked fierce philosophical and legal debates worldwide. Composed partly of Vibranium and powered by an unknown gem, the android aided the Avengers in Sokovia.",
            "Does a synthetic being possess human rights? Can it be held legally culpable for its actions? The Supreme Court is currently reviewing petitions regarding artificial personhood.",
            "While The Vision has proven peaceful thus far, critics argue that placing trust in unregulated Artificial Intelligence is a path humanity cannot afford to experiment with."
        ]
    },
    {
        name: "steve-rogers-fugitive",
        title: "Captain America: National Hero turned Fugitive",
        content: [
            "In a shocking turn of events, Steve Rogers, the legendary Captain America, has officially been branded a fugitive from justice after refusing to sign the Sokovia Accords.",
            "Rogers and several loyalist Avengers allegedly engaged in heavy combat with government-sanctioned forces in Germany before disappearing from the grid entirely.",
            "The government asserts that no one is above the law, no matter their historical service. A global manhunt is currently underway."
        ]
    },
    {
        name: "thor-new-asgard",
        title: "Asgardian Refugees Settle in Norway",
        content: [
            "Following the destruction of their mythological homeworld, the surviving citizens of Asgard have officially established a settlement in Tonsberg, Norway.",
            "Rebranded as 'New Asgard', the fishing village is quickly adapting to its new extraterrestrial residents. King Valkyrie has reportedly begun diplomatic outreach, establishing trade lines and offering Asgardian crafts.",
            "Tourism to the area has skyrocketed, though local officials are struggling to manage the logistical nightmare of integrating a society composed entirely of literal gods."
        ]
    },
    {
        name: "pym-particles-leak",
        title: "Pym Particles: The Ultimate Threat?",
        content: [
            "A confidential dossier leaked to the Bugle outlines the extreme dangers of 'Pym Particles', a subatomic formula capable of reducing or increasing the distance between atoms.",
            "Experts warn that if this formula were to be replicated or sold on the open market, it could destabilize the entire planet. An invisible army or microscopic assassins could bypass any known security measure.",
            "While Hank Pym remains notoriously secretive regarding his invention, rumors persist that off-market knockoffs are already being tested in illicit underground labs."
        ]
    }
];

export default articles;