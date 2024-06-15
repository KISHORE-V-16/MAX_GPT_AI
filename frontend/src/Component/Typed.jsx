import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

const Typer = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    if (!typedRef.current) return;

    const options = {
      strings: [
        "Smart Conversations : Engage with an AI that understands and responds to your needs with human-like accuracy.",
        "Real-Time Assistance : Get instant help and answers around the clock, no waiting needed.",
        "Personalized Interaction : Enjoy conversations tailored to your preferences and past interactions.",
        "Multi-Tasking Mastery : Handle multiple queries simultaneously with seamless efficiency.",
        "Secure Communication : Your privacy is paramount, with end-to-end encryption for all chats.",
        "Context-Aware Responses : AI remembers context from previous interactions for a smoother experience.",
        "Dynamic Learning : Continuously improves with each interaction, getting smarter every time you chat.",
        "Voice and Text Support : Choose your preferred mode of communication, be it voice or text.",
        "Integration Capabilities : Easily connects with other apps and services for a cohesive digital experience.",
       " Customizable Interface : Tailor the look and feel to match your personal style and preferences.",
        "Real-Time Translation : Break language barriers with instant, accurate translations during conversations.",
        "Task Automation : Automate routine tasks and reminders, making your life easier and more organized.",
        "Knowledge Base Access : Tap into a vast repository of information and resources anytime.",
        "Sentiment Analysis : Detects and responds to the emotional tone of your messages for empathetic interactions.",
        "Interactive Learning Modules : Enhance your skills and knowledge with engaging, AI-powered learning content.",
      ],
      typeSpeed: 40,
      backSpeed: 40,
      smartBackspace: true,
      loop: true,
    };


    const typed = new Typed(typedRef.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <span
      ref={typedRef}
      className="welcome drop-shadow-xl drop text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-gray-950 text-[30px] items-center"
    />
  );
};

export default Typer;
