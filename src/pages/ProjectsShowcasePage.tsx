import React from 'react';
import { Code2 } from 'lucide-react';

export default function ProjectsShowcasePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <Code2 className="mx-auto h-12 w-12 text-indigo-600" />
          <h1 className="mt-3 text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Project Showcase
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Explore our featured projects and recent work
          </p>
        </div>
        
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Example project cards - you can replace these with actual project data */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-indigo-100 flex items-center justify-center">
              <Code2 className="h-16 w-16 text-indigo-600" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">Project One</h3>
              <p className="mt-2 text-gray-600">
                A brief description of the first project and its key features.
              </p>
              <div className="mt-4">
                <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                  Learn More →
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-indigo-100 flex items-center justify-center">
              <Code2 className="h-16 w-16 text-indigo-600" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">Project Two</h3>
              <p className="mt-2 text-gray-600">
                A brief description of the second project and its key features.
              </p>
              <div className="mt-4">
                <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                  Learn More →
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-indigo-100 flex items-center justify-center">
              <Code2 className="h-16 w-16 text-indigo-600" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">Project Three</h3>
              <p className="mt-2 text-gray-600">
                A brief description of the third project and its key features.
              </p>
              <div className="mt-4">
                <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                  Learn More →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}