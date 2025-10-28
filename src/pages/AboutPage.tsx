import React from 'react';
import Card from '../components/ui/Card';
import { Code, Cloud, Database, Cpu } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">About Weather Now</h1>
      <Card>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            <strong>Weather Now</strong> is a modern, responsive weather web application built to provide quick and accurate weather information for outdoor enthusiasts and travelers.
            Our goal is to offer a clean, simple, and visually appealing interface to help you plan your activities with confidence.
          </p>
          
          <h2 className="text-xl font-semibold pt-4 border-t border-gray-200 dark:border-gray-700">Technology Stack</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong className="font-medium">React JS:</strong> For building a fast and interactive user interface.</li>
            <li><strong className="font-medium">Tailwind CSS:</strong> For a utility-first approach to styling and responsive design.</li>
            <li><strong className="font-medium">Recharts:</strong> For creating beautiful and responsive charts.</li>
            <li><strong className="font-medium">TypeScript:</strong> For robust, type-safe code.</li>
            <li><strong className="font-medium">React Router:</strong> For client-side routing.</li>
          </ul>

          <h2 className="text-xl font-semibold pt-4 border-t border-gray-200 dark:border-gray-700">Data Sources</h2>
           <ul className="space-y-2 list-disc list-inside">
             <li><strong className="font-medium">Open-Meteo API:</strong> Provides high-quality global weather forecast and geocoding data.</li>
          </ul>
          
          <p className="pt-4 border-t border-gray-200 dark:border-gray-700">
            This application was designed with a focus on usability, performance, and aesthetics. Thank you for using Weather Now!
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AboutPage;