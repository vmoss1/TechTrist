"use strict";

const { Pin } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Pin.bulkCreate(
        [
          {
            title: "Ultimate Gaming Console Setup",
            userId: 1,
            description:
              "I absolutely love my gaming console setup! It's equipped with the latest gaming console, high-resolution monitor, and surround sound system. It's a gamer's dream come true.",
            imageUrl: "../public/images/seed1.jpg",
            category: "Gaming Consoles",
          },

          {
            title: "Custom PC Build",
            userId: 1,
            description:
              "My custom PC build is my pride and joy. From selecting the components to building and fine-tuning it, I've poured my heart and soul into this setup. It's a powerhouse for gaming and productivity.",
            imageUrl: "../public/images/seed2.jpg",
            category: "Computer Setups",
          },
          {
            title: "Ergonomic Keyboard",
            userId: 1,
            description:
              "My ergonomic keyboard has revolutionized my typing experience. Its comfortable design and customizable features make long typing sessions a breeze.",
            imageUrl: "../public/images/seeder3.jpg",
            category: "Keyboards",
          },
          {
            title: "Wireless Mouse",
            userId: 1,
            description:
              "I can't imagine working without my wireless mouse. Its precision tracking and ergonomic design enhance my productivity and comfort throughout the day.",
            imageUrl: "../public/images/seed4.jpg",
            category: "Mouses",
          },
          {
            title: "Gaming Laptop for High-Performance Gaming",
            userId: 1,
            description:
              "I'm amazed by the performance of my gaming laptop. Its powerful graphics card and fast processor deliver an immersive gaming experience. Whether I'm playing the latest AAA titles or streaming gameplay, this laptop never disappoints.",
            imageUrl: "../public/images/seed5.jpg",
            category: "Laptops",
          },

          {
            title: "Minimalist Computer Desk Setup",
            userId: 2,
            description:
              "My minimalist computer desk setup is perfect for my workspace. With a sleek desk, ergonomic chair, and minimal decor, I can focus on my tasks without distractions. It's both functional and aesthetically pleasing.",
            imageUrl: "../public/images/seed6.jpg",
            category: "Computer Desk Setups",
          },
          {
            title: "Dual Monitor Workstation",
            userId: 2,
            description:
              "I'm loving my dual monitor workstation setup. It boosts my productivity by allowing me to multitask efficiently. Whether I'm working on multiple projects or gaming while watching streams, this setup handles it all.",
            imageUrl: "../public/images/seed7.jpg",
            category: "Computer Desk Setups",
          },
          {
            title: "Smartwatch",
            userId: 2,
            description:
              "My smartwatch is more than just a timepiece—it's my personal assistant! With features like fitness tracking, notifications, and voice commands, it keeps me connected and organized throughout the day.",
            imageUrl: "../public/images/seed8.jpg",
            category: "Wearable Tech",
          },
          {
            title: "Ultimate Home Office Setup",
            userId: 2,
            description:
              "My home office setup is truly ultimate! Featuring a powerful desktop PC, ergonomic chair, and adjustable standing desk, it's optimized for both work and play. With high-speed internet and dual monitors, I can tackle any task with ease.",
            imageUrl: "../public/images/seed9.jpg",
            category: "Home Office Setups",
          },
          {
            title: "Programming Laptop",
            userId: 2,
            description:
              "My programming laptop is my trusty companion for coding on the go. With a powerful processor, ample RAM, and SSD storage, it handles even the most demanding development tasks with ease. Whether I'm writing code, debugging, or testing software, this laptop never lets me down.",
            imageUrl: "../public/images/seed10.jpg",
            category: "Laptops",
          },
          {
            title: "High-Performance Graphics Card",
            userId: 3,
            description:
              "My high-performance graphics card is the heart of my custom PC build. With cutting-edge technology and powerful graphics processing capabilities, it delivers stunning visuals and smooth gaming performance. Whether I'm playing the latest AAA games or creating digital art, this graphics card handles it all with ease.",
            imageUrl: "../public/images/seed11.jpg",
            category: "PC Components",
          },
          {
            title: "Fast SSD Storage",
            userId: 3,
            description:
              "My fast SSD storage is essential for quick boot times and rapid data access in my custom PC build. With blazing-fast read and write speeds, it reduces loading times and improves overall system responsiveness. Whether I'm launching applications, transferring files, or loading games, this SSD ensures a seamless computing experience.",
            imageUrl: "../public/images/seed12.jpg",
            category: "PC Components",
          },
          {
            title: "Powerful Processor (CPU)",
            userId: 3,
            description:
              "My powerful processor (CPU) is the brain of my custom PC build. With multiple cores, high clock speeds, and advanced architecture, it delivers exceptional performance for gaming, content creation, and multitasking. Whether I'm editing videos, streaming gameplay, or running demanding software, this CPU handles it all without breaking a sweat.",
            imageUrl: "../public/images/seed13.jpg",
            category: "PC Components",
          },
          {
            title: "High-Speed RAM Modules",
            userId: 3,
            description:
              "My high-speed RAM modules are crucial for delivering fast and responsive performance in my custom PC build. With ample capacity and high frequencies, they ensure smooth multitasking and seamless application responsiveness. Whether I'm gaming, video editing, or running virtual machines, these RAM modules provide the speed and stability I need.",
            imageUrl: "../public/images/seed14.jpg",
            category: "PC Components",
          },
          {
            title: "Liquid Cooling Solution",
            userId: 4,
            description:
              "My liquid cooling solution is the key to keeping my custom PC build running cool and quiet under heavy loads. With a high-performance pump, efficient radiators, and quiet fans, it effectively dissipates heat from critical components like the CPU and GPU. Whether I'm overclocking for maximum performance or pushing my system to the limit, this liquid cooling solution ensures optimal temperatures and reliability.",
            imageUrl: "../public/images/seed15.jpg",
            category: "PC Components",
          },
          {
            title: "Mechanical Gaming Keyboard",
            userId: 4,
            description:
              "My mechanical gaming keyboard is a must-have for serious gamers. With blue tactile mechanical switches, customizable RGB lighting, and programmable macros, it offers a responsive and immersive gaming experience. Whether I'm executing precise combos in fighting games or executing rapid keystrokes in MMOs, this gaming keyboard delivers performance and style.",
            imageUrl: "../public/images/seed16.jpg",
            category: "Keyboards",
          },
          {
            title: "Immersive Gaming Headset",
            userId: 4,
            description:
              "My immersive gaming headset takes my gaming experience to the next level. With high-fidelity audio, noise-canceling microphone, and comfortable ear cushions, it delivers crystal-clear sound and clear communication during gaming sessions. Whether I'm hearing every footstep in FPS games or coordinating strategies in multiplayer matches, this gaming headset ensures I never miss a beat.",
            imageUrl: "../public/images/seed17.jpg",
            category: "Headsets",
          },
          {
            title: "Wireless Gaming Mouse",
            userId: 4,
            description:
              "My wireless gaming mouse offers freedom and precision in gaming. With a lag-free connection, high-performance sensor, and customizable buttons, it provides responsive and accurate tracking for competitive gaming. Whether I'm playing fast-paced shooters or navigating intricate maps in strategy games, this wireless gaming mouse delivers consistent performance without the hassle of cables.",
            imageUrl: "../public/images/seed18.jpg",
            category: "Mouses",
          },
          {
            title: "Portable Handheld Gaming Console",
            userId: 5,
            description:
              "My portable handheld gaming console is perfect for gaming on-the-go. With a compact design, vibrant display, and extensive game library, it offers hours of entertainment wherever I go. Whether I'm commuting to work, waiting in line, or traveling, this handheld gaming console keeps me entertained and engaged.",
            imageUrl: "../public/images/seed19.jpg",
            category: "Gaming Consoles",
          },
          {
            title: "Retro Gaming Console Collection",
            userId: 5,
            description:
              "My retro gaming console collection is a nostalgic treasure trove of classic games. From iconic titles of the 80s and 90s to rare gems of gaming history, it's a journey through the evolution of video games. Whether I'm reliving childhood memories or discovering retro classics for the first time, this collection offers endless nostalgia and fun.",
            imageUrl: "../public/images/seed20.jpg",
            category: "Gaming Consoles",
          },
          {
            title: "Modular Gaming Console",
            userId: 5,
            description:
              "My modular gaming console offers endless customization and versatility. With interchangeable components, upgradeable hardware, and modular accessories, it adapts to my gaming preferences and evolving needs. Whether I'm experimenting with new configurations, enhancing performance with add-ons, or customizing aesthetics with interchangeable panels, this modular gaming console provides flexibility and innovation.",
            imageUrl: "../public/images/seed21.jpg",
            category: "Gaming Consoles",
          },
          {
            title: "Augmented Reality Glasses",
            userId: 5,
            description:
              "My augmented reality glasses offer a glimpse into the future of wearable technology. With immersive AR experiences, heads-up displays, and hands-free interaction, they enhance my daily activities and productivity. Whether I'm exploring virtual worlds, accessing real-time information, or collaborating on projects, these AR glasses redefine how I interact with the world around me.",
            imageUrl: "../public/images/seed22.jpg",
            category: "Wearable Tech",
          },
          {
            title: "Fitness Tracker",
            userId: 6,
            description:
              "My fitness tracker helps me stay on top of my health and fitness goals. With features like step tracking, sleep monitoring, and workout analysis, it provides valuable insights and motivation to keep moving. Whether I'm hitting the gym, going for a run, or simply trying to maintain an active lifestyle, this fitness tracker keeps me accountable and informed.",
            imageUrl: "../public/images/seed23.jpg",
            category: "Wearable Tech",
          },
          {
            title: "Gaming BattleStation",
            userId: 6,
            description:
              "My gaming battle station is the ultimate setup for immersive gaming experiences. With a large gaming desk, high-performance gaming chair, multiple monitors, and RGB lighting, it creates an atmosphere of excitement and intensity. Whether I'm diving into virtual worlds, competing in esports, or streaming gameplay, this battlestation enhances every moment.",
            imageUrl: "../public/images/seed24.jpg",
            category: "Computer Desk Setups",
          },
          {
            title: "Compact 3D Printer",
            userId: 6,
            description:
              "My compact 3D printer brings my ideas to life with ease. With fast printing speeds and high-resolution output, it's perfect for prototyping, crafting, and DIY projects.",
            imageUrl: "../public/images/seed25.jpg",
            category: "Tech Gadgets",
          },
          {
            title: "Wireless Noise-Canceling Headphones",
            userId: 6,
            description:
              "My wireless noise-canceling headphones are perfect for immersive listening experiences. With active noise cancellation and long battery life, I can enjoy music, podcasts, and calls without distractions.",
            imageUrl: "../public/images/seed26.jpg",
            category: "Headsets",
          },
          {
            title: "Gaming Keyboard with RGB Lighting",
            userId: 6,
            description:
              "My gaming keyboard with RGB lighting adds style and functionality to my gaming setup. With customizable lighting effects and mechanical switches, it enhances both aesthetics and performance.",
            imageUrl: "../public/images/seed27.jpg",
            category: "Gaming Accessories",
          },
          {
            title: "Professional Handheld Microphone",
            userId: 7,
            description:
              "My professional handheld microphone delivers studio-quality audio for performances and recordings. With a dynamic capsule and rugged construction, it's perfect for live vocals, instrument amplification, and podcasting.",
            imageUrl: "../public/images/seed28.jpg",
            category: "Microphones",
          },
          {
            title: "Handheld Digital Camera",
            userId: 7,
            description:
              "My handheld digital camera captures memories with stunning clarity. With optical zoom, image stabilization, and manual controls, it's perfect for capturing moments during travel, events, and everyday life.",
            imageUrl: "../public/images/seed29.jpg",
            category: "Handheld Electronics",
          },
          {
            title: "Handheld Gaming Console",
            userId: 7,
            description:
              "My handheld gaming console provides entertainment on the go. With a vibrant display, ergonomic design, and a library of games, it's perfect for gaming during commutes or long trips.",
            imageUrl: "../public/images/seed30.jpg",
            category: "Handheld Electronics",
          },
          {
            title: "Code Editor",
            userId: 7,
            description:
              "My preferred code editor is highly customizable and equipped with features like syntax highlighting, auto-completion, and multi-cursor support. It's my go-to tool for writing clean and efficient code.",
            imageUrl: "../public/images/seed31.jpg",
            category: "Coding Tools",
          },
          {
            title: "Programming Laptop",
            userId: 7,
            description:
              "My programming laptop is a powerhouse designed for coding on the go. With a fast processor, ample RAM, and a high-resolution display, it handles complex development tasks with ease.",
            imageUrl: "../public/images/seed32.jpg",
            category: "Coding Tools",
          },
          {
            title: "Version Control System (VCS)",
            userId: 8,
            description:
              "I rely on my version control system for managing code changes and collaborating with team members. With features like branching, merging, and conflict resolution, it keeps my projects organized and streamlined.",
            imageUrl: "../public/images/seed33.jpg",
            category: "Coding Tools",
          },
          {
            title: "Online Coding Courses",
            userId: 8,
            description:
              "Online coding courses have been instrumental in my coding journey. With structured lessons, hands-on projects, and expert instructors, they provide a flexible and effective way to learn new skills and technologies.",
            imageUrl: "../public/images/seed34.jpg",
            category: "Learning Resources",
          },
          {
            title: "Programming Books",
            userId: 8,
            description:
              "My collection of programming books serves as a valuable resource for deepening my understanding of coding concepts and mastering new languages and frameworks.",
            imageUrl: "../public/images/seed35.jpg",
            category: "Learning Resources",
          },
          {
            title: "Code Snippet Manager",
            userId: 8,
            description:
              "My code snippet manager helps me organize and reuse code snippets across projects. With features like tagging and search, it boosts my productivity and saves me time during development.",
            imageUrl: "../public/images/seed36.jpg",
            category: "Coding Tools",
          },
          {
            title: "Programming Community Forums",
            userId: 8,
            description:
              "Programming community forums are invaluable sources of knowledge and support. Whether I'm seeking help with coding problems or sharing my expertise with others, these forums foster collaboration and growth within the coding community.",
            imageUrl: "../public/images/seed37.jpg",
            category: "Learning Resources",
          },
          {
            title: "Algorithm Visualization Tools",
            userId: 9,
            description:
              "Algorithm visualization tools help me understand complex algorithms visually. With interactive demonstrations and step-by-step explanations, they demystify algorithmic concepts and improve my problem-solving skills.",
            imageUrl: "../public/images/seed38.jpg",
            category: "Learning Resources",
          },
          {
            title: "Code Review Tools",
            userId: 9,
            description:
              "Code review tools are essential for maintaining code quality and fostering collaboration within development teams. With features like inline commenting and automated checks, they ensure code consistency and identify potential issues early in the development process.",
            imageUrl: "../public/images/seed39.jpg",
            category: "Coding Tools",
          },
          {
            title: "Integrated Development Environment (IDE)",
            userId: 9,
            description:
              "My integrated development environment (IDE) provides a comprehensive suite of tools for coding, debugging, and testing. With a user-friendly interface and extensive plugin ecosystem, it's my primary workspace for software development projects.",
            imageUrl: "../public/images/seed40.jpg",
            category: "Coding Tools",
          },
          {
            title: "RGB PC Case",
            userId: 9,
            description:
              "My RGB PC case adds flair to my computer setup with customizable lighting effects. With tempered glass panels and ample airflow, it showcases my custom PC build while keeping components cool.",
            imageUrl: "../public/images/seed41.jpg",
            category: "PC Components",
          },
          {
            title: "Productivity Workstation",
            userId: 9,
            description:
              "My productivity workstation is equipped with a spacious desk, ergonomic chair, and dual monitors. With ample screen real estate and comfortable seating, it promotes focus and efficiency in my work.",
            imageUrl: "../public/images/seed42.jpg",
            category: "Computer Setups",
          },
          {
            title: "Wireless Mechanical Keyboard",
            userId: 10,
            description:
              "My wireless mechanical keyboard offers the tactile feedback of mechanical switches without the hassle of cables. With low-latency wireless connectivity and long battery life, it provides a seamless typing experience.",
            imageUrl: "../public/images/seed43.jpg",
            category: "Keyboards",
          },
          {
            title: "Gaming Mousepad",
            userId: 10,
            description:
              "My gaming mousepad features a large surface area and smooth texture for precise mouse movements. With anti-slip rubber base and stitched edges, it stays in place during intense gaming sessions.",
            imageUrl: "../public/images/seed44.jpg",
            category: "Mouses",
          },
          {
            title: "Ultra-Wide Monitor",
            userId: 10,
            description:
              "My ultra-wide monitor provides immersive panoramic views for gaming and productivity. With high-resolution display and fast refresh rate, it offers exceptional visual clarity and responsiveness.",
            imageUrl: "../public/images/seed45.jpg",
            category: "Computer Setups",
          },
        ],
        { validate: true }
      );
    } catch (e) {
      console.error(e);
      throw new Error("Check Pin validators");
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Pins";
    return queryInterface.bulkDelete(options, null, {});
  },
};
