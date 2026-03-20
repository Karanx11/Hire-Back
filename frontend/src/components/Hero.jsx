import React from "react";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-20">
      
      <h1 className="text-5xl font-bold leading-tight max-w-3xl">
        Let Companies <span className="text-primary">Hire You</span>
      </h1>

      <p className="mt-6 text-gray-600 max-w-xl">
        Build your developer profile and let companies compete to hire you.
        No more applying for jobs.
      </p>

      <div className="mt-10 flex gap-6">
        
        <button className="px-6 py-3 bg-primary text-white rounded-xl shadow-md hover:scale-105 transition">
          I'm a Developer
        </button>

        <button className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100">
          I'm a Company
        </button>

      </div>

    </section>
  );
}