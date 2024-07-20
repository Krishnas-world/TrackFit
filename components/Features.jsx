"use client";

export default function Features() {
  return (
    <section className="bg-black text-white py-16">
      <div className="text-center">
        <h2 className="text-blue-600 text-lg">WHY CHOOSE US?</h2>
        <h1 className="text-4xl font-bold mt-2">PUSH YOUR LIMITS FORWARD</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 max-w-6xl mx-auto px-4">
        <div className="feature-card text-center group">
          <div className="bg-gray-800 p-6 rounded-full inline-block mb-4 group-hover:bg-blue-600 transition-colors duration-300">
            <TimerIcon className="w-12 h-12 text-blue-600 group-hover:text-white transition-colors duration-300" />
          </div>
          <h3 className="text-xl font-bold">Modern Equipment</h3>
          <p className="mt-2 text-gray-400">
            Experience top-notch equipment designed to meet the highest standards of fitness and wellness.
          </p>
        </div>
        <div className="feature-card text-center group">
          <div className="bg-gray-800 p-6 rounded-full inline-block mb-4 group-hover:bg-blue-600 transition-colors duration-300">
            <NutIcon className="w-12 h-12 text-blue-600 group-hover:text-white transition-colors duration-300" />
          </div>
          <h3 className="text-xl font-bold">Healthy Nutrition Plan</h3>
          <p className="mt-2 text-gray-400">
            Enjoy a nutrition plan tailored to help you achieve your health and fitness goals effectively.
          </p>
        </div>
        <div className="feature-card text-center group">
          <div className="bg-gray-800 p-6 rounded-full inline-block mb-4 group-hover:bg-blue-600 transition-colors duration-300">
            <DumbbellIcon className="w-12 h-12 text-blue-600 group-hover:text-white transition-colors duration-300" />
          </div>
          <h3 className="text-xl font-bold">Professional Training Plan</h3>
          <p className="mt-2 text-gray-400">
            Receive a personalized training plan from experienced professionals to guide you every step of the way.
          </p>
        </div>
        <div className="feature-card text-center group">
          <div className="bg-gray-800 p-6 rounded-full inline-block mb-4 group-hover:bg-blue-600 transition-colors duration-300">
            <HeartPulseIcon className="w-12 h-12 text-blue-600 group-hover:text-white transition-colors duration-300" />
          </div>
          <h3 className="text-xl font-bold">Unique to Your Needs</h3>
          <p className="mt-2 text-gray-400">
            Get a customized approach to fitness that caters specifically to your individual requirements and goals.
          </p>
        </div>
      </div>
    </section>
  );
}

function DumbbellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.4 14.4 9.6 9.6" />
      <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" />
      <path d="m21.5 21.5-1.4-1.4" />
      <path d="M3.9 3.9 2.5 2.5" />
      <path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" />
    </svg>
  );
}

function HeartPulseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
    </svg>
  );
}

function NutIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 4V2" />
      <path d="M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592A7.003 7.003 0 0 0 19 14v-4" />
      <path d="M12 4C8 4 4.5 6 4 8c-.243.97-.919 1.952-2 3 1.31-.082 1.972-.29 3-1 .54.92.982 1.356 2 2 1.452-.647 1.954-1.098 2.5-2 .595.995 1.151 1.427 2.5 2 1.31-.621 1.862-1.058 2.5-2 .629.977 1.162 1.423 2.5 2 1.209-.548 1.68-.967 2-2 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4Z" />
    </svg>
  );
}

function TimerIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="6" x2="12" y2="12" />
      <line x1="12" y1="12" x2="16" y2="12" />
    </svg>
  );
}
