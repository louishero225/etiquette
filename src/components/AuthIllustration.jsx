export default function AuthIllustration({ type = 'login' }) {
  const illustrations = {
    login: (
      <svg className="w-full h-auto max-w-md mx-auto" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M196.6 37.5c-70.7 0-128 57.3-128 128s57.3 128 128 128 128-57.3 128-128-57.3-128-128-128zm0 27.7c19.4 0 35.2 15.8 35.2 35.2s-15.8 35.2-35.2 35.2-35.2-15.8-35.2-35.2 15.7-35.2 35.2-35.2zm0 201.5c-29.5 0-55.8-13.2-73.5-34c.4-24.4 49.1-37.7 73.5-37.7s73.1 13.4 73.5 37.7c-17.7 20.8-44 34-73.5 34z" className="fill-indigo-600 dark:fill-indigo-400" />
      </svg>
    ),
    register: (
      <svg className="w-full h-auto max-w-md mx-auto" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M200 25c-55.2 0-100 44.8-100 100s44.8 100 100 100 100-44.8 100-100-44.8-100-100-100zm0 35c19.3 0 35 15.7 35 35s-15.7 35-35 35-35-15.7-35-35 15.7-35 35-35zm0 130c-29.2 0-55-12.8-72.8-33.1 18.3-24.8 45.8-40.9 72.8-40.9s54.5 16.1 72.8 40.9c-17.8 20.3-43.6 33.1-72.8 33.1z" className="fill-indigo-600 dark:fill-indigo-400" />
        <circle cx="300" cy="100" r="25" className="fill-green-500 dark:fill-green-400" />
        <path d="M312.5 87.5l-17.5 17.5-7.5-7.5-5 5 12.5 12.5 22.5-22.5z" fill="white" />
      </svg>
    ),
    reset: (
      <svg className="w-full h-auto max-w-md mx-auto" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M200 50c-82.8 0-150 67.2-150 150h40c0-60.7 49.3-110 110-110s110 49.3 110 110h40c0-82.8-67.2-150-150-150zm0 80v120l103.2-60L200 130z" className="fill-indigo-600 dark:fill-indigo-400" />
      </svg>
    )
  };

  return (
    <div className="hidden lg:block w-1/2 p-12">
      <div className="animate-float">
        {illustrations[type]}
      </div>
    </div>
  );
}
