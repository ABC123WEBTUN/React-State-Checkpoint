import React, { Component } from 'react';
import { User, Clock, Eye, EyeOff } from 'lucide-react';

interface Person {
  fullName: string;
  bio: string;
  imgSrc: string;
  profession: string;
}

interface AppState {
  person: Person;
  shows: boolean;
  timeElapsed: number;
}

class App extends Component<{}, AppState> {
  private intervalId: NodeJS.Timeout | null = null;

  constructor(props: {}) {
    super(props);
    this.state = {
      person: {
        fullName: "Sarah Johnson",
        bio: "Passionate software developer with 5+ years of experience in React and Node.js. I love creating beautiful, user-friendly applications that solve real-world problems. When I'm not coding, you'll find me hiking, reading tech blogs, or experimenting with new technologies.",
        imgSrc: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
        profession: "Full Stack Developer"
      },
      shows: false,
      timeElapsed: 0
    };
  }

  componentDidMount(): void {
    // Start the interval to track time since component mounted
    this.intervalId = setInterval(() => {
      this.setState(prevState => ({
        timeElapsed: prevState.timeElapsed + 1
      }));
    }, 1000);
  }

  componentWillUnmount(): void {
    // Clean up the interval when component unmounts
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  toggleShow = (): void => {
    this.setState(prevState => ({
      shows: !prevState.shows
    }));
  };

  formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  render() {
    const { person, shows, timeElapsed } = this.state;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Profile Viewer</h1>
            <p className="text-gray-600">Class-based React Component Demo</p>
          </div>

          {/* Time Tracker */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center text-gray-700">
              <Clock className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">
                Time since mounted: {this.formatTime(timeElapsed)}
              </span>
            </div>
          </div>

          {/* Toggle Button */}
          <button
            onClick={this.toggleShow}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center mb-6"
          >
            {shows ? <EyeOff className="w-5 h-5 mr-2" /> : <Eye className="w-5 h-5 mr-2" />}
            {shows ? 'Hide Profile' : 'Show Profile'}
          </button>

          {/* Profile Card */}
          {shows && (
            <div className="animate-fadeIn">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white mb-4">
                <div className="flex items-center mb-4">
                  <img
                    src={person.imgSrc}
                    alt={person.fullName}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg mr-4"
                  />
                  <div>
                    <h2 className="text-xl font-bold">{person.fullName}</h2>
                    <p className="text-blue-100 flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {person.profession}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">About</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {person.bio}
                </p>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Built with React Class Components</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;