import React from "react";
import Sem from "./Sem";

function Year({ title, semContent ,del, rem}) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm rounded-xl p-6 my-6 border border-gray-200 hover:shadow-md transition-all duration-300">
      {/* Year Title */}
      <h2 className="text-gray-800 text-3xl font-semibold uppercase tracking-wide text-center mb-6">
        {title}
      </h2>

      {/* Semesters - Stacked */}
      <div className="space-y-4">
        <Sem title={semContent.sem1.title} subjects={semContent.sem1.subjects} del={del} rem={rem} ident="sem1"/>
        <Sem title={semContent.sem2.title} subjects={semContent.sem2.subjects} del={del} rem={rem} ident="sem2"/>
      </div>
    </div>
  );
}

export default Year;