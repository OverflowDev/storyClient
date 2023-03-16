import React from 'react';

function About() {
  return (
    <div className="md:px-16 px-8 flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <p className="text-lg text-neutral-600 mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod tortor augue, eu ullamcorper ipsum mollis ac. Praesent finibus orci eu ultrices bibendum. Proin euismod, purus nec tristique ultricies, sapien risus accumsan velit, vel suscipit odio enim quis orci. 
      </p>
      <div className="flex flex-row items-center justify-center">
        <img className="w-24 h-24 rounded-full mr-4" src="https://source.unsplash.com/random/200x200" alt="profile" />
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold">John Doe</h2>
          <p className="text-neutral-600">Co-founder</p>
        </div>
      </div>
    </div>
  );
}

export default About;
